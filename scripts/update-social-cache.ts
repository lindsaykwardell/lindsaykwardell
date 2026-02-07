import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BSKY_API = "https://public.api.bsky.app/xrpc/";
const BSKY_HANDLE = "lindsaykwardell.com";
const MASTODON_API = "https://mastodon.social/api/v1";
const MASTODON_ACCOUNT_ID = "109248168582410861";
const SITE_DOMAIN = "lindsaykwardell.com";

const CACHE_PATH = resolve(__dirname, "../src/data/social-post-cache.json");

type CacheEntry = {
  bluesky: { uri: string; url: string } | null;
  mastodon: { id: string; url: string } | null;
};

type Cache = Record<string, CacheEntry>;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractPath(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === SITE_DOMAIN || parsed.hostname === `www.${SITE_DOMAIN}`) {
      return parsed.pathname;
    }
  } catch {
    // Not a valid URL
  }
  return null;
}

async function crawlBluesky(): Promise<Map<string, { uri: string; url: string }>> {
  const results = new Map<string, { uri: string; url: string }>();
  let cursor: string | undefined;

  console.log("Crawling Bluesky feed...");

  for (let page = 0; page < 50; page++) {
    const feedUrl = `${BSKY_API}app.bsky.feed.getAuthorFeed?actor=${BSKY_HANDLE}&limit=100${cursor ? `&cursor=${cursor}` : ""}`;
    const response = await fetch(feedUrl);

    if (!response.ok) {
      console.error(`Bluesky feed request failed: ${response.status}`);
      break;
    }

    const data = await response.json();
    const feed = data.feed as Array<{ post: any }>;

    for (const item of feed) {
      const post = item.post;
      const postId = post.uri.split("/").pop();
      const postUrl = `https://bsky.app/profile/${BSKY_HANDLE}/post/${postId}`;

      // Check embedded external link
      const externalUri = post.record?.embed?.external?.uri;
      if (externalUri) {
        const path = extractPath(externalUri);
        if (path) {
          results.set(path, { uri: post.uri, url: postUrl });
        }
      }

      // Check facets (inline links)
      if (post.record?.facets) {
        for (const facet of post.record.facets) {
          for (const feature of facet.features) {
            if (feature.uri) {
              const path = extractPath(feature.uri);
              if (path) {
                results.set(path, { uri: post.uri, url: postUrl });
              }
            }
          }
        }
      }
    }

    cursor = data.cursor;
    if (!cursor || feed.length === 0) break;

    await delay(200);
  }

  console.log(`  Found ${results.size} posts linking to ${SITE_DOMAIN}`);
  return results;
}

async function crawlMastodon(): Promise<Map<string, { id: string; url: string }>> {
  const results = new Map<string, { id: string; url: string }>();
  let maxId: string | undefined;

  console.log("Crawling Mastodon feed...");

  for (let page = 0; page < 50; page++) {
    const statusesUrl = `${MASTODON_API}/accounts/${MASTODON_ACCOUNT_ID}/statuses?exclude_reblogs=true&limit=40${maxId ? `&max_id=${maxId}` : ""}`;
    const response = await fetch(statusesUrl);

    if (!response.ok) {
      console.error(`Mastodon feed request failed: ${response.status}`);
      break;
    }

    const statuses = (await response.json()) as Array<{
      id: string;
      url: string;
      content: string;
      card?: { url: string };
    }>;

    if (statuses.length === 0) break;

    for (const status of statuses) {
      // Check card URL
      if (status.card?.url) {
        const path = extractPath(status.card.url);
        if (path) {
          results.set(path, { id: status.id, url: status.url });
        }
      }

      // Check content for links
      const urlRegex = /https?:\/\/(?:www\.)?lindsaykwardell\.com(\/[^\s"<]*)/g;
      let match: RegExpExecArray | null;
      while ((match = urlRegex.exec(status.content)) !== null) {
        const path = match[1];
        if (path) {
          results.set(path, { id: status.id, url: status.url });
        }
      }
    }

    maxId = statuses[statuses.length - 1]?.id;
    if (!maxId) break;

    await delay(200);
  }

  console.log(`  Found ${results.size} statuses linking to ${SITE_DOMAIN}`);
  return results;
}

async function main() {
  // Load existing cache
  let cache: Cache = {};
  try {
    const existing = readFileSync(CACHE_PATH, "utf-8");
    cache = JSON.parse(existing);
    console.log(`Loaded existing cache with ${Object.keys(cache).length} entries`);
  } catch {
    console.log("Starting with empty cache");
  }

  // Crawl both platforms
  const [blueskyPosts, mastodonPosts] = await Promise.all([
    crawlBluesky(),
    crawlMastodon(),
  ]);

  // Collect all paths found across both platforms
  const allPaths = new Set([...blueskyPosts.keys(), ...mastodonPosts.keys()]);

  // Also keep existing cache keys
  for (const key of Object.keys(cache)) {
    allPaths.add(key);
  }

  // Merge results
  for (const path of allPaths) {
    const existing = cache[path];
    const bsky = blueskyPosts.get(path) ?? existing?.bluesky ?? null;
    const mastodon = mastodonPosts.get(path) ?? existing?.mastodon ?? null;

    cache[path] = { bluesky: bsky, mastodon: mastodon };
  }

  // Sort keys for stable output
  const sorted: Cache = {};
  for (const key of Object.keys(cache).sort()) {
    sorted[key] = cache[key];
  }

  writeFileSync(CACHE_PATH, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`\nCache updated with ${Object.keys(sorted).length} entries`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
