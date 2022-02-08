---
slug: "/blog/coming-into-vue-whats-next-vue-3"
date: 2022-02-08
title: "Coming Into Vue: What's Next in Vue 3"
image: "/blog/coming-into-vue.webp"
author: "Lindsay Wardell"
snippet: Now that Vue 3 has been officially promoted to the recommended version of the framework, what's next on Vue's horizon?
layout: '../../layouts/BlogPost.astro'
---
It was a moment of celebration across the Vueniverse. At last, after more than a year of Vue 3 being available on the `next` branch of all the core repositories (and many of the related frameworks and libraries), Vue 3 has been officially released to the world as the recommended way to write Vue applications. The moment was noted on the [official Vue blog](https://blog.vuejs.org/posts/vue-3-as-the-new-default.html) as well as on Twitter.

<div class="flex justify-center">
  <blockquote class="twitter-tweet"><p lang="en" dir="ltr">🎉 It&#39;s done! Vue 3 is now the default version and the brand new <a href="https://t.co/0N2uGPCtsh">https://t.co/0N2uGPCtsh</a> is live!<br><br>More details in the blog post in case you missed it: <a href="https://t.co/ub8L4KhPsJ">https://t.co/ub8L4KhPsJ</a></p>&mdash; Vue.js (@vuejs) <a href="https://twitter.com/vuejs/status/1490592213184573441?ref_src=twsrc%5Etfw">February 7, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

Considering that the initial release of Vue 3 (named "One Piece") was [originally released on September 18, 2020](https://github.com/vuejs/core/releases?q=3.0.0&expanded=true), the fact that we're only now reaching the official recommendation has shaped the Vue ecosystem. For applications, most of the actual migration between Vue 2 to Vue 3 is straightforward, with Vue [minimizing breaking changes](https://v3.vuejs.org/guide/migration/introduction.html#breaking-changes) while adding new features such as the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api) as well as the latest new feature to land in Vue, `<script setup>`, which provides a way to build Vue apps without so much boilerplate code ([I presented a demo of using Composition API and `<script setup>`](https://www.youtube.com/watch?v=adkxGYeW97c) alongside Ben Hong at VueJS Athens, check it out!).

However, the Vue ecosystem has seen its share of churn in the meantime. Core APIs that frameworks like Vuetify rely on were altered, to the point that even the Migration Build doesn't cover the differences between Vue 2 and 3. Frameworks such as Nuxt and Quasar have been working to support Vue 3 (with Quasar releasing it's stable support back in 2021). Meanwhile, work has been going into Vite, which is now [the official recommendation for building Vue apps](https://www.npmjs.com/package/create-vue) as well (replacing the Vue CLI).

Now that we've reached an official recommendation to use Vue 3, what does the future look like for the Vue ecosystem? I asked Twitter what they were looking forward to in the future of Vue, and these are some of the answers that I got.

## Reactivity Transform

<div class="flex justify-center">
  <blockquote class="twitter-tweet"><p lang="en" dir="ltr">The Reactivity Transform Unification is the final piece in Vue 3 reactivity primitives and &lt;script setup&gt; based RFCs story. Once <a href="https://twitter.com/vuejs?ref_src=twsrc%5Etfw">@vuejs</a> finalizes this RFC, there will be a massive DX improvement both for advanced users and for newcomers to the framework<a href="https://t.co/8DzIz96ovD">https://t.co/8DzIz96ovD</a></p>&mdash; patak (@patak_dev) <a href="https://twitter.com/patak_dev/status/1491019920070438914?ref_src=twsrc%5Etfw">February 8, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

The next new feature coming to Vue 3 is being referred to as the ["Reactivity Transform Unification"](https://github.com/vuejs/rfcs/discussions/413). The main issue being resolved here is that the introduction of `Ref` can be complex, especially moving from Vue 2 to 3. For context, in Vue 3 today, you can create and access a ref value like this:

```html
<script setup>
import { ref } from 'vue';

const count = ref(0)        // Set the value with a `ref` call
console.log(count.value)    // Access the value with `.value` in JS
</script>

<template>
  <!-- Access the value with just the ref name -->
  <button @click="count++">
    {{count}}
  </button>
</template>
```

The change would be to provide a utility function, `$ref`, that would unwrap the ref into a reactive variable, and then let you work with it directly, rather than accessing the `.value` key.

```html
<script setup>
const count = $ref(0)   // Set the value with a `$ref` call
console.log(count)      // Access the value directly!
</script>

<template>
  <!-- No changes, still access the value directly -->
  <button @click="count++">
    {{count}}
  </button>
</template>
```

This feels a lot more comfortable to work with, especially for non-Vue developers! There have been a number of proposals trying to resolve the cumbersome nature of refs, and I think this is a comfortable middle ground. There are a number of other functions proposed in the RFC, go check it out and provide your feedback!

## Nuxt 3

<div class="flex justify-center">
  <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Can&#39;t wait for <a href="https://twitter.com/nuxt_js?ref_src=twsrc%5Etfw">@nuxt_js</a> 3 to be stable now!</p>&mdash; CapitaineToinon (@CapitaineToinon) <a href="https://twitter.com/CapitaineToinon/status/1490952449007710210?ref_src=twsrc%5Etfw">February 8, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

The next big call-out I saw from the ecosystem is Nuxt 3 reaching a stable build. Nuxt 3 is an exciting new major version for Vue's primary SSR framework, with new features such as its Nitro backend (that allows it to be deployed to a number of environments beyond a standard Node server) and Vite integration. On the Nuxt site, there is a chart comparing the different versions of Nuxt as they exist today, and their recommendations. I'll copy it below to keep a snapshot of the status as I write this post, but the [latest comparison can be found on the Nuxt 3 site](https://v3.nuxtjs.org/getting-started/introduction#comparison).

Feature / Version        | Nuxt 2          | Nuxt Bridge      | Nuxt 3
-------------------------|-----------------|------------------|---------
Vue                      | 2               | 2                | 3
Stability                | 😊 Stable      | 😌 Semi-stable   | 😬 Unstable
Performance              | 🏎 Fast        | ✈️ Faster        | 🚀 Fastest
Nitro Engine             | ❌             | ✅               | ✅
ESM support              | 🌙 Partial     | 👍 Better        | ✅
TypeScript               | ☑️ Opt-in      | 🚧 Partial       | ✅
Composition API          | ❌             | 🚧 Partial       | ✅
Options API              | ✅             | ✅               | ✅
Components Auto Import   | ✅             | ✅               | ✅
`<script setup>` syntax  | ❌             | 🚧 Partial       | ✅
Auto Imports             | ❌             | ✅               | ✅
Webpack                  | 4              | 4                | 5
Vite                     | ⚠️ Partial     | 🚧 Partial       | 🚧 Experimental
Nuxi CLI                 | ❌ Old         | ✅ nuxi          | ✅ nuxi
Static sites             | ✅             | ✅               | 🚧

There are a couple key features that are still being worked out before Nuxt 3 is stable, based on this chart. Since Nuxt 2 was based on Webpack, Vite integration is still experimental and under development. I've done some playing around with it, and found it to work fairly well, but I'm not working on production code with Nuxt and Vite so there's probably some edge cases still to work out. If you want to try Nuxt 3 and Vite, just add this to your Nuxt config:

```ts
// nuxt.config.ts
   
import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // Add the `vite` key to your config, and you'll opt into Vite mode
  vite: {},
});
```

The other missing feature is static site generation. While Nuxt is primarily a server-side generator, it can be used to build static sites as well. If you're wanting to use Nuxt 3 features, but really need static sites, you'll need to use the [Nuxt Bridge](https://v3.nuxtjs.org/getting-started/bridge/). From the docs:

> Bridge is a forward-compatibility layer that allows you to experience many of the new Nuxt 3 features by simply installing and enabling a Nuxt module.
> 
> Using Nuxt Bridge, you can make sure your project is (almost) ready for Nuxt 3 and have the best developer experience without needing a major rewrite or risk breaking changes.

If you're looking to try out Nuxt 3 with an existing app, I'd suggest checking out the Bridge build. Otherwise, spin up a new app with Nuxt 3, and be aware that static generation is currently under development and does not work. Also, remember that because it's under development, it's best to consider the Nuxt APIs as unstable and prone to change. While it feels solid, Nuxt 3 is not yet ready for production use.

## Vuetify

<div class="flex justify-center">
  <blockquote class="twitter-tweet"><p lang="fr" dir="ltr">Vuetify compatible with vue3</p>&mdash; Viliam Mihálik (@ViliamMih) <a href="https://twitter.com/ViliamMih/status/1491017715527860225?ref_src=twsrc%5Etfw">February 8, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

Vuetify, one of the most well-known material frameworks for building Vue apps, is still working on support for Vue 3. Part of this is due to an overhaul under the hood that will lead to improved performance and a better experience. According to the [Vuetify official roadmap](https://vuetifyjs.com/en/introduction/roadmap/), Vuetify 3 is planned for release in May 2022, with a public beta in February.

- Target Release: May 2022
- Alpha: Live
- Beta: February 2022
- Overview:
  - Rebuilt for Vue 3 using the new composition api
  - Global properties that allow you to make large overarching changes to your app
  - Improved SASS variable customization and extensibility with Built-In Modules
  - New Vue CLI presets for generating pre-built starting projects
  - First party Vite support for lightning fast development
  - Greatly improved TypeScript support
  - Better framework coverage with E2E testing using Cypress

Check out the links on the Vuetify page to access their Github page and Discord channel.

## Ecosystem Support and Stability

<div class="flex justify-center">
  <blockquote class="twitter-tweet"><p lang="en" dir="ltr">It&#39;ll be great when the ecosystem catches up inc. all the plugins and Nuxt 3</p>&mdash; Anthony Gore (@anthonygore) <a href="https://twitter.com/anthonygore/status/1490876690813571073?ref_src=twsrc%5Etfw">February 8, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

There are a number of other prominent Vue libraries that are still working on their stable Vue 3 support. Vue Apollo, Vuelidate, and Bootstrap Vue have some work done, but are in different stages of either "not available" or "public alpha". Some other projects, such as [NativeScript Vue](https://github.com/rigor789/nativescript-vue-next), are having to undergo more substantial rewrites in order to be compatible. All of this takes time, and in the meantime the projects that are reliant on these libraries will have to remain on Vue 2, or switch to alternatives that already support Vue 3.

In that sense, libraries/frameworks that already support Vue 3 have a clear advantage at the moment, and should definitely be considered if you're using a Vue 2-only option. UI frameworks like [Quasar](https://quasar.dev/) are a good alternative to Vuetify or Bootstrap if you're able to make the switch, for example.

There are also some libraries that have already been updated, such as [Vue Draggable](https://github.com/SortableJS/vue.draggable.next), as well as others that will not be getting Vue 3 support, such as [Vue Formulate](https://vueformulate.com/) (if you're using it, check out the public beta for its replacement, [FormKit](https://formkit.com/)).

<div class="flex justify-center">
  <blockquote class="twitter-tweet"><p lang="und" dir="ltr"><a href="https://twitter.com/useFormKit?ref_src=twsrc%5Etfw">@useFormKit</a> 🤗</p>&mdash; Justin Schroeder (@jpschroeder) <a href="https://twitter.com/jpschroeder/status/1490759805702754313?ref_src=twsrc%5Etfw">February 7, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

## Conclusion

As a wrap-up to this topic, what I think is most wanted out of the Vue ecosystem in the near future is some peace and quiet.

<div class="flex justify-center">
  <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Ecosystem stability. Vue3 is great, but as a new developer to the Vue space, everything seems so fragile. :/</p>&mdash; Nikki Strømsnes (@TheNix) <a href="https://twitter.com/TheNix/status/1490955186147184640?ref_src=twsrc%5Etfw">February 8, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

Upheavals in how things are done are never easy. The Vue team saw that changes were required in order for Vue applications to continue scaling and solving the problems developers were facing, and made some difficult choices. That, on top of a pandemic interrupting the normal flow of life, has led to a very delicate place for the Vue ecosystem. I feel like in general, we're heading in the right direction, and the more libraries that are able to support Vue 3 moving forward, the faster we'll get there.

Vue 3 is a fantastic JS framework to pick up and use today. If you are new to Vue, I highly encourage checking out [the new official documentation for Vue 3](https://vuejs.org/), it's a fantastic resource that will get you up to speed on the essentials and current recommended practices. If you're into podcasts, I'd also recommend checking out both [Views on Vue](https://viewsonvue.com/) and [Enjoy the Vue](https://enjoythevue.io/). And most important, make sure to enjoy the journey along the way.