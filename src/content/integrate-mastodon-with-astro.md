---
pubDate: 2022-11-22
title: "Integrating Mastodon with Astro"
author: "Lindsay Wardell"
image: "/blog/mastodon-astro.webp"
tags:
  - Astro
  - Javascript
  - Mastodon
  - SSR
snippet: I didn't want to run a personal Mastodon instance, but I wanted to incorporate it into my personal domain. Let's explore what we can do to integrate with the Fediverse!
layout: '../../layouts/BlogPost.astro'
---

In case you have missed it, Twitter is going through a series of upheavals. This has led to a large number of folks leaving the platform for alternatives. I've been interested in [Mastodon](https://joinmastodon.org/) as a potential alternative to Twitter for some time, especially since it's open source, but I was never able to make the jump. Now that it feels everyone is trying out alternative platforms, the number of folks I know on Mastodon has grown significantly, and I've been able to replicate a lot of what I was doing on Twitter.

Before I dive in too far, let's talk about microblogging and federation as Mastodon describes it. For microblogging, the [Mastodon docs](https://docs.joinmastodon.org/) say:

> Similar to how blogging is the act of publishing updates to a website, microblogging is the act of publishing small updates to a stream of updates on your profile. You can publish text posts and optionally attach media such as pictures, audio, video, or polls. Mastodon lets you follow friends and discover new ones.

For me, a microblog is a way to share what's going on or what I'm interested in with people in a less formal, more conversational way. I can talk about life, current events, things my kid says, or just share things that I found that interest me. Twitter has been my microblogging platform for the past few years, while I write my more longform blog posts here on my site.

How does Mastodon define federation?

> Federation is a form of decentralization. Instead of a single central service that all people use, there are multiple services, that any number of people can use.

Twitter is very centralized; there's only one "instance", and you can't communicate from Twitter to other platforms. Federated platforms, on the other hand, allow for multiple providers to communicate together in a standardized way. The easiest comparison is email, which is another federated system. Different email providers establish rules and filter content as they want, and allow you to interact with other email providers beyond what they host. Mastodon is similar, in that each instance has its own moderators and rules, and allows for interoperation between other Mastodon instances.

*Note before we keep going: This post is not intended as a pitch for switching to Mastodon. I know it's not for everyone. But I'm really liking it.*

One of the really neat things about Mastodon is that you can host your own instance, and have it federate with the rest of Mastodon. This allows you to control your own data, and host on your own site. This sounds really cool! It'd be neat to host my own social media account under a URL that I own, it seems like an easy way to verify myself. However, I switched to using a static site (specifically using Astro) specifically because I didn't want to pay monthly for a server. It didn't make sense to start paying just to have an account on social media, so I set the idea aside.

## Integrating to the Fediverse

Later, I read an article by [Maarten Balliauw](https://mastodon.online/@maartenballiauw) titled "[Mastodon on your own domain without a server](https://blog.maartenballiauw.be/post/2022/11/05/mastodon-own-donain-without-hosting-server.html)", in which he described using the [WebFinger](https://webfinger.net/) spec to inform Mastodon of your account. I highly recommend reading the whole article, but in short, Mastodon is looking for a resource at `/.well-known/webfinger` that returns JSON in a specific structure. Mastodon is passing a query parameter to specify the account, but if you're hosting your own site, you can ignore the parameter and just return a JSON structure for your account. This sounded interesting, and I wanted to give it a shot!

My site is built on Astro, and is hosted with Netlify. To meet the requirement for the endpoint, I created an endpoint at `/.well-known/webfinger.json`, which just includes the following code:

```js
export async function get() {
  return {
    body: JSON.stringify({
      subject: 'acct:lindsaykwardell@mastodon.social',
      aliases: [
        'https://mastodon.social/@lindsaykwardell',
        'https://mastodon.social/users/lindsaykwardell',
      ],
      links: [
        {
          rel: 'http://webfinger.net/rel/profile-page',
          type: 'text/html',
          href: 'https://mastodon.social/@lindsaykwardell',
        },
        {
          rel: 'self',
          type: 'application/activity+json',
          href: 'https://mastodon.social/users/lindsaykwardell',
        },
        {
          rel: 'http://ostatus.org/schema/1.0/subscribe',
          template: 'https://mastodon.social/authorize_interaction?uri={uri}',
        },
      ],
    }),
  }
}
```

Then, in my Netlify config (`netlify.toml`), I added a redirect:

```toml
[[redirects]]
  from = "/.well-known/webfinger"
  to = "/.well-known/webfinger.json"
```

With that, searching for `@lindsay@lindsaykwardell.com` properly returns my account on mastodon.social!

![Screenshot of Mastodon search with my custom domain as the query and my account on mastodon.social as the result](/blog/mastodon-integration.png)

Awesome! Now people can look me up by my own URL, and I don't have to host a Mastodon instance to do it! However, this communication is only one way; I can tell the Fediverse who I am, but I don't have a page on my site with any content. How can we fix that?

## Bringing the Fediverse Home

Because Mastodon is built to interoperate with other systems, it has a powerful, public API that can be used to fetch data about users and their posts. In addition, it offers multiple ways to subscribe to any user's posts, including an RSS feed. You can subscribe to anyone on Mastodon via RSS by appending `.rss` to their username (feel free to follow me at https://mastodon.social/@lindsaykwardell.rss).

I have a custom username that can be found on Mastodon, but what I was missing was a page to actually see my content on my site. On Mastodon, the username `@lindsaykwardell@mastodon.social` can be found at mastodon.social/@lindsaykwardell. However, lindsaykwardell.com/@lindsay didn't exist, so I decided to fix that!

Again, using Astro, I created a page (`/@lindsay.astro`) that would fetch the content of my RSS feed and then render it. I created a separate template for my site that would also fetch my Mastodon profile and banner images, description, follower counts, and other details, and then rendered it out using static HTML.

```astro
---
import MicroblogPost from "../layouts/MicroblogPost.astro";
import MicroPost from "../components/MicroPost.astro";
import Parser from 'rss-parser';

const feedUrl = "https://mastodon.social/@lindsaykwardell.rss"
const parser = new Parser({
  customFields: {
    item: [ ['media:content', 'attachments', { keepArray: true} ]]
  }
})

const feed = await parser.parseURL(feedUrl);

const content = {
  title: feed.title,
  snippet: "Public posts from @lindsay@lindsaykwardell.com",
  slug: "/@lindsay"
}
---
<MicroblogPost content={content}>
  {feed.items.map(item => (
    <MicroPost 
      avatar={feed.image.url}
      displayName={feed.title}
      content={item.content}
      createdAt={item.pubDate}
      url={item.link}
      attachments={item.attachments?.map(attachment => attachment['$'])}
    />
  ))}
</MicroblogPost>
```

In this file, I'm importing the layout (`MicroblogPost`) and a component (`MicroPost`), as well as [rss-parser](https://www.npmjs.com/package/rss-parser). I then created a parser, and added the custom field for media content (such as images). I then fetch the feed content, parse it, and pass it into the site template and components. With that, I can now see my Mastodon content within my own site!

![The landing page for my Mastodon microblog content on my own website](/blog/mastodon-profile-page.png)

I then took it a step further, and created an individual page for each post. On sites like Twitter and Mastodon, you can link directly to a post (such as https://twitter.com/lindsaykwardell/status/1583481321330200577 or https://mastodon.social/@lindsaykwardell/109248202243508025). It made sense that if I was trying to recreate the interface of a microblog on my own site, I would want to do the same.

This required using [Astro's dynamic routing](https://docs.astro.build/en/core-concepts/routing/#server-ssr-mode) and enabling [SSR mode](https://docs.astro.build/en/guides/server-side-rendering/), but the result is that any of my Mastodon posts can be viwed on my personal site! Here's the code:

```astro
---
import MicroblogPost from "../../layouts/MicroblogPost.astro";
import MicroPost from "../../components/MicroPost.astro";

const { id } = Astro.params;

const data = await fetch(`https://mastodon.social/api/v1/statuses/${id}`).then(res => res.json())

const name = data.account.display_name
const post = data.content.replace(/<[^>]*>?/gm, '');
let snippet = post.substring(0,30);

if (snippet.length === 30) {
  snippet += "..."
}

const card = data.card;

const content = {
  title: name + ": " + snippet,
  snippet: post,
  image: data.media_attachments[0]?.url,
  slug: `/@lindsay/${id}`,
}
---
<MicroblogPost content={content}>
  <MicroPost
    avatar={data.account.avatar}
    url={data.url}
    username={data.account.username}
    userPage={data.account.url}
    createdAt={data.created_at}
    displayName={data.account.display_name}
    content={data.content}
    attachments={data.media_attachments}
    card={card}
    postStats={{
      repliesCount: data.replies_count,
      reblogsCount: data.reblogs_count,
      favouritesCount: data.favourites_count,
    }}
  />
</MicroblogPost>
```

Rather than fetching from the RSS feed, I use Mastodon's public API to fetch via ID. I then pass the data for the post into the `MicroPost` component, including a bit more metadata than the RSS feed gives us. With that, we can now load individual Mastodon posts directly into the site! Go to [this post about my ViteConf talk](/@lindsay/109248202243508025) to see!

![A post about my ViteConf talk on using Elm in Vite, displayed on my website](/blog/mastodon-post.png)

One thing to note about using the API in this way, because we are just fetching data by ID we could load a post that I didn't write. I'm not too worried about it, as the correct user's name and profile image will be displayed in the post contents, but it is a consideration to keep in mind.

## Conclusion

I'm sure there is more that can be done to integrate my site with the Fediverse, but this already feels really nice. Future changes could lead to better integrations with Mastodon, such as following or favoriting things from my site rather than having to go to Mastodon, but it's not a huge issue at the moment.

While Twitter may be going through some major struggles, this feels like a good way to keep up interaction with the dev community and integrate it more with my own site in a way that Twitter never allowed. And that, at least, is worth it.

If you're interested in how this turned out, check out [lindsaykwardell.com/@lindsay](https://lindsaykwardell.com/@lindsay)!

