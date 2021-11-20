---
slug: "/blog/upgrade-astro-0-21"
date: 2021-11-20
title: "Astro 0.21 - Upgrade Experience"
image: "/blog/astro-21-upgrade.webp"
author: "Lindsay Wardell"
snippet: Astro 0.21 has been release! Here's my experience upgrading to the latest version
layout: '../../layouts/BlogPost.astro'
---

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

Crucially (for me), dark mode was completely nonfunctional. Some elements would switch style, but a majority (including the root background and any text) were not changing. Consulting the Chrome devtools revealed that my styles (using PostCSS) were not being properly processed before passing into the DOM. For example, this is what Astro was putting into the site (formatting added by me):

```css
.blog-item.astro-EDZCIZOF {@apply shadow-md rounded-lg relative overflow-hidden flex justify-center;animation:0.3s ease-out 0s 1 shift;.}.blog-image-wrapper.astro-EDZCIZOF{height:300px;width:100%;overflow:hidden;}@keyframes shift{0%{transform:translateY(30%);opacity:0;}100%{transform:translateY(0);opacity:1;}}
```

Clearly, Astro was not properly applying PostCSS here. Tailwind's `@apply` rule was being ignored and sent straight to the compiled CSS. The solution here was to export these global styles into the `global.css` file, instead of inline on my `BaseLayout.astro` component. That's fine, it's probably better this way anyway.

Navigating around the site, I kept noticing that other styles were also failing:

![Blog post preview card, the hero image is too short compared to what it should be](/blog/missing-styles-2.png)

<div class="bg-gray-900 p-2">
  <img src="/blog/missing-styles-3.png" alt="PrismJS styling is not being applied">
</div>

The solution, as before, was to pull out the inline CSS into external files. I wasn't a huge fan of this solution, but it worked. Styles looked as they were supposed to, and life was good.

Except the site still wouldn't build.

## Bad CSS!

Everything looks as it should, so I tried to deploy to Netlify. However, an error was still popping up:

![Build error showing that a CSS value was invalid, due to an extra dot after a semicolon.](/blog/css-syntax-error.png)

Unknown word? That doesn't make se... oh. OH. There's an extra period after a semicolon. That's weird, I didn't write anything like that. And besides, that's coming from `about.css`, which isn't a file I created. What's going on?

Doing a bit of searching, I found another style block that I had missed in my previous cleanup, but this one was scoped to a component. I'd much rather not extract it from the Astro component, considering that's the whole point of scoped CSS in a component (as a Vue fan, I'm a proponent of this approach).

I reached out on the Astro Discord channel (which I highly recommend if you are using Astro), and reported the issue.

![Discord chat discussion between Lindasy and Nate regarding PostCSS](/blog/discord-postcss-discussion.png)

We quickly discovered that the cause of the problem was that I had set the language for the style block to `postcss`, which was causing issues with the Astro compiler. Switching to `pcss` solved the problem, and I was able to find and update the remaining scoped CSS blocks to correctly use Postcss. (If you're interested, [here's the link](https://discord.com/channels/830184174198718474/911628265528119299/911638741951590440) to the Discord thread). I also moved back a number of styles to their components, leaving just the actual global styles in `global.css`.

## Success?

With that, I was able to deploy an updated version of the site, now powered by Astro 0.21. My tests were passing, visuals looked correct, and the build ran locally without errors. Let's send it up to Netlify for deployment!

```bash
7:58:22 AM: > astro build
7:58:23 AM: 03:58 PM [config] Set "buildOptions.site" to generate correct canonical URLs and sitemap
7:58:26 AM: warn - You have enabled the JIT engine which is currently in preview.
7:58:26 AM: warn - Preview features are not covered by semver, may introduce breaking changes, and can change at any time.
7:58:31 AM: [object Object]
7:58:31 AM: Error: [object Object]
7:58:31 AM: npm ERR! code ELIFECYCLE
7:58:31 AM: npm ERR! errno 1
7:58:31 AM: npm ERR! lindsaykwardell@4.0.0 generate: `astro build`
7:58:31 AM: npm ERR! Exit status 1
```

What a lovely error! Thankfully, this was my fault, not Astro or Netlify. I had forgotten to update my environment variables on Netlify, causing the build to fail (that object is probably a JS fetch error). Easy fix, and it was good to go. The build went up, deployment was successful, and... my JS wasn't loading.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Having some trouble with <a href="https://twitter.com/Netlify?ref_src=twsrc%5Etfw">@Netlify</a> and <a href="https://twitter.com/astrodotbuild?ref_src=twsrc%5Etfw">@astrodotbuild</a> 0.21. For some reason, I&#39;m unable to fetch my JS files for partial hydration because they&#39;re blocked by CORS. It looks like files are being stored on Cloudfront instead of my domain.<br><br>Anyone run into something like this before?</p>&mdash; Lindsay Wardell 🏳️‍⚧️ (@lindsaykwardell) <a href="https://twitter.com/lindsaykwardell/status/1462173643249651713?ref_src=twsrc%5Etfw">November 20, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This was slightly more complex, but had an easy solution. The build was working as expected locally, I could see the JS files were present (and clearly being cached by Netlify on Cloudfront). I didn't have any build plugins enabled that modified the JS, and (most confusing) everything worked as expected on Astro 0.20.

After doing some googling, I found the problem in a [Netlify support thread](https://answers.netlify.com/t/no-access-control-allow-origin-header/14631).

> Yup - that is saying that cloudfront doesn’t have your custom header which is true! I think you’re using asset optimization on the site, and that will clash with custom headers - we can’t set them on those resources. So, you could turn off that feature in your build and deploy settings and that would remove the problem.

I'm not certain what custom header is being set by Astro/Netlify/wherever, but between 0.20 and 0.21 a custom header was being applied, which broke the JS fetch when going across domains. I went into my settings, and disabled the JS minification and bundling offered by Netlify. At last, everything actually, truly worked.

## Conclusion

As upgrades go, this was honestly pretty straightforward. I started working on it late Friday night, and was able to finish Saturday morning. No major rewrites were required, just some updated syntax and moving some CSS around. And best of all, Astro is now powered by Vite, so I can start trying out the plugins I'm more familiar with on my site (rather than looking deeper into the Snowpack ecosystem).

If you're looking to migrate your own site, I strongly encourage checking out the [Migration Guide](https://docs.astro.build/migration/0.21.0/), and [the blog post](https://docs.astro.build/migration/0.21.0/) explaining the Astro team's reasoning for making the shift from Snowpack to Astro.

If you haven't tried Astro out yet, [I wrote about my experience](https://lindsaykwardell.com/blog/rebuilding-site-with-astro) migrating from Nuxt static site to Astro, and the performance benefits I immediately saw by migrating. I definitely recommend checking out Astro if you're interested in static site generation.

Until next time!