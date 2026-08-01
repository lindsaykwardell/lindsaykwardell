### Hi there, I'm Lindsay

#### I'm a programmer and writer

I've been working in software since 2015, and I currently work as an Engineering Manager at [Mangomint](https://mangomint.com). I've worked on projects for individuals and small businesses as well as large organizations, using tools like React, Kotlin, Elm, and Haskell. I enjoy working with a functional programming lens, but I appreciate the power in object-oriented languages too.

Writing has always been a passion of mine. I explore the place where technology and feelings intersect through poetry, fiction, and observations of the world around me.

- Pronouns: She/Her

## Standard.site / ATmosphere

Long-form posts stay in Markdown under `src/content/blog`. [Sequoia](https://sequoia.pub) publishes them to your Bluesky-hosted PDS as [`standard.site`](https://standard.site) records.

1. Create an [app password](https://bsky.app/settings/app-passwords)
2. `ATP_APP_PASSWORD=xxxx npm run sequoia:setup` — creates the publication record and verification
3. `npm run sequoia:publish:dry` then `npm run sequoia:publish` — sync posts to the PDS
4. Commit updated `sequoia.json`, `.sequoia-state.json`, and any `atUri` frontmatter Sequoia writes

For CI, set GitHub secrets `ATP_IDENTIFIER` and `ATP_APP_PASSWORD`. Drafts need `draft: true` (see `templates/blog.md`) so Sequoia skips them.
