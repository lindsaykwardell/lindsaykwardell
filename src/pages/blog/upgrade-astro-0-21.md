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