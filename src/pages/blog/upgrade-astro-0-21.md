---
slug: "/blog/upgrade-astro-0-21"
date: 2031-10-25
title: "Astro 0.21 - Upgrade Experience"
image: "/elm.png"
author: "Lindsay Wardell"
snippet: Here's my experience upgrading Astro to 0.21
layout: '../../layouts/BlogPost.astro'
---

## Introduction

The day has finally arrived! [Astro has released 0.21 publicly](https://astro.build/blog/astro-021-release/), and it's a big change. Most important of all, they've migrated the development environment from Snowpack to [Vite](https://vitejs.dev/), which opens up a whole slew of new features and plugins to the Astro ecosystem. There are also a number of other changes, which are listed in the annoucement [and migration guide](https://docs.astro.build/migration/0.21.0/). If you're looking to upgrade your site, I highly encourage you to check out those resources first!

Rather than guide you through the upgrade process (their migration doc is pretty good for that), I want to document my experience. I ran into a number of interesting bumps along the way, and I think it would be beneficial to share my experience with anyone else interested in performing their upgrade.

For context on my site, I am mostly using Astro componets (with the `.astro` file extension), with a couple small Vue components. Most of the issues I ran into were related to Astro components, and the changed API. I did not have to do anything related to file imports, React, or TSX/JSX.

Also, if you're interested, [here's the PR](https://github.com/lindsaykwardell/lindsaykwardell/pull/25) I used to track my changes as I performed the upgrade.

With that out of the way, let's upggrade to Astro 0.21!

## Update Dependencies

The first thing I did was update my `package.json` to use the new dependencies. This was a straightforward change using `npm outdated` and manually updating/removing unused packages. Besides updating Astro and the Vue renderer to the latest version, I removed `@snowpack/plugin-dotenv` because Astro now supports `.env` files by default!

Also, as Astro is no longer using Snowpack for its build tool, I had to update my environment variables as well, removing `SNOWPACK` from the variable name.

However, when I ran `npm run dev`, I was presented with an error!

```bash
Error: Build failed with 12 errors:
node_modules/fetch-blob/from.js:1:59: error: Could not resolve "node:fs" (mark it as external to exclude it from the bundle)
node_modules/fetch-blob/from.js:2:25: error: Could not resolve "node:path" (mark it as external to exclude it from the bundle)
node_modules/fetch-blob/from.js:3:31: error: Could not resolve "node:worker_threads" (mark it as external to exclude it from the bundle)
node_modules/node-fetch/src/body.js:8:34: error: Could not resolve "node:stream" (mark it as external to exclude it from the bundle)
node_modules/node-fetch/src/body.js:9:31: error: Could not resolve "node:util" (mark it as external to exclude it from the bundle)
```

This error was thrown because I was importing `node-fetch` in a couple JS files. In Astro 0.21, [`fetch` is now globally available](https://docs.astro.build/guides/data-fetching/), both inside and outside of `.astro` components. Removing the import of `node-fetch` solved the problem.

However, I was presented with a different error!

```bash
panic: Export statements must be placed at the top of .astro files!
panic: Export statements must be placed at the top of .astro files!
2:14:52 PM [vite] Error when evaluating SSR module /src/layouts/BlogPost.astro:
    at /src/layouts/BaseLayout.astro
2:14:52 PM [vite] Error when evaluating SSR module /src/pages/blog/a-song-unsung.md:
    at /src/layouts/BaseLayout.astro
2:14:52 PM [vite] Error when evaluating SSR module /src/pages/index.astro:
    at /src/layouts/BaseLayout.astro
02:14 PM [astro] 500 /                                        1753ms
```

Astro now requires all exports (such as the Props interface) to be at the top of the file. This was a simple change, but not one documented in the migration guide. By either removing or moving the exported Props interface, the dev environment was able to load. However, something was missing...

The content!

## Missing Body

When `localhost:3000` came up, I was presented with a perfectly blank screen. I noticed that the head tag was filling in properly, but not the body. In Chrome devtools, nothing appeared between the `<body>` tag.

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- meta tags, script, etc -->
  </head>
  <body></body>
</html>
```

What's going on here? I'm honestly still not sure. If I updated my `index.astro` file to have some extra text before calling `<BaseLayout>`, the text would load, and the meta tags would be replicated inside the `<body>` tag. The solution was to eliminate the `BaseHead` component (which was only utilized by `BaseLayout`), which placed the actual HTML tags in the layout component.

However, I took a bit of a detour before coming to this solution, and realized that my Tailwind configuration was no longer working. This was thankfully a straightforward fix, although the documentation seemed to be spread across a couple pages.

First, I had to manually install PostCSS and autoprefixer. Then, I updated my `postcss.config.cjs` file to include postcss-nested, Tailwind, and autoprefixer (previously I had only needed to import postcss-nested). This reenabled Tailwind for my site, which I was able to validate after I fixed the missing body problem.

However, something didn't look quite right

## Missing Styles

While the site loaded (and Tailwind properly initialized), a number of custom styles were missing.

![lindsaykwardell.com. Dark mode is not working, and other styles are slightly off](/blog/missing-styles.png)

Crucially (for me), dark mode was completely nonfunctional. Some elements would switch style, but a majority (including the root background and any text) were not changing. 