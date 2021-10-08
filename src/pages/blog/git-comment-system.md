---
slug: "/git-comment-system"
date: 2020-11-15
title: "Build a Static Comment System"
author: "Lindsay Wardell"
image: "/blog/git.gif"
tags:
  - Jamstack
  - Netlify
  - Github
  - Javascript
snippet: Hosting a static site is great, but what about comments? What can we do to store comments in a static site?
layout: '../../layouts/BlogPost.astro'
---

## From Wordpress to Jamstack

Back when I first started my own blog, I did what many still do today and deployed a Wordpress site. Honestly, Wordpress is great. If you're looking into setting up your own site, it's a fine option! The main problem I had with it, however, was relying on another service to host my posts, my images, everything. What if my hosting provider were to shut down? How could I migrate from their MySQL database to another easily? What would I do with all of my content?

This actually happened to me, when I needed to migrate from one provider to another. The solution - abandon everything, and start from scratch. A migration wasn't possible to my new host, so I copied everything into a text file and started over on the site. 

Then I learned about Gatsby, and that I could have a static site where my blog posts are all stored in text files. That sounds like a win! I could control my posts, my site, my content, and host it anywhere. This sounded exactly like what I wanted to do. I looked at headless Wordpress, but decided I wanted full control of the site. I built out a first version of the site with Gatsby, deployed it to Netlify, and life was good.

Except...

What about comments?

## Static Comments??

I've never had a super popular blog, but having a comment system felt important to build a complete blog. The options that are out there are... okay, but most of them didn't actually match what I was going for. I settled on Disqus, but the fact that I couldn't host it, plus the tie-in to another service meant that it felt antithetical to hosting a static site.

After doing some research, I found [Staticman](https://staticman.net/). Quoting from their homepage, "Staticman handles user-generated content for you and transforms it into data files that sit in your GitHub repository, along with the rest of your content." This concept spoke to me. I did some research into using this approach, but at the time, it looked like the service had grown too fast, and comments were processing too slowly, if at all. Hopefully they've fixed it by now, but again, it's another service to rely on.

All of this research, however, led me to a decision. I'm a developer; I can build this myself!

## Jamstack to the Rescue!

My goals for this project:

- Accept input from a user
- Process that into a text file
- Commit that text file into a Github repository.

I'm already hosted on Netlify, so accepting user input is straightforward. Netlify offers form submission ([read more here](https://www.netlify.com/products/forms/)). In short, by adding some basic attributes to a form, you can enable a POST request to your site that Netlify will capture and process. I'm using Vue, so I turned to [Vue Formulate](https://vueformulate.com/) to build the form, and [Vuetensils](https://vuetensils.stegosource.com/) for an alert on success/failure. Unfortunately this doesn't work nicely with Netlify, so I had to add the form in a standard way in order for Netlify to pick it up and build the POST endpoint. A simple compromise.

Below is the code for Netlify to pick up the form. Feel free to just use a basic form element if you want, I decided to go with Vue Formulate for the added validation and submission features.

```html
<form
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  name="new-comment"
  class="hidden"
>
  <input type="hidden" name="form-name" />
  <input type="hidden" name="postTitle" />
  <input type="hidden" name="postPath" />
  <input type="hidden" name="author" />
  <input type="hidden" name="email" />
  <input type="hidden" name="message" />
</form>
```

Great, I've got my form, and it's submitting to Netlify. But how can I access that data to submit to Github?

Luckily, Netlify has another great feature: [Serverless Functions](https://www.netlify.com/products/functions/)! In short, they allow you to create AWS Lambda functions that they will host, and you don't need to create an AWS account to do anything.

Here's a basic example:

```javascript
exports.handler = async ( event , context ) => { 
  return { 
    statusCode: 200, 
    body: "Success!" 
  }; 
}
```

In addition to writing arbitrary serverless functions, Netlify provides a number of hooks to catch events that would go to their APIs, such as Identity or Forms. [You can read more about them here](https://docs.netlify.com/functions/trigger-on-events/). In this case, we want to create a function called `submission-created.js`, which will receive an object called `payload` in the event body. This payload will contain all of our form information. We can then use that to generate a markdown file for the comment.

```javascript
const axios = require('axios')
const uuid = require('uuid').v4
const dayjs = require('dayjs')
const crypto = require('crypto')
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

exports.handler = (event, context, callback) => {
  const payload = JSON.parse(event.body).payload
  const { postTitle, postPath, author, email, message } = payload.data

  const filePath = `content/comments/${uuid()}.md`
  const content = `---
postPath: "${postPath}"
date: ${dayjs().utc().format('YYYY-MM-DD HH:mm:ss')}
author: "${author}"
authorId: "${crypto.createHash('md5').update(email).digest('hex')}"
---
${message}`
}
```

As a quick aside - you can always just use a generic serverless function for this step. I went with Netlify Forms and handling the event because Netlify by default applies spam filtering to the form input. You can also add a bot field (see the above HTML snippet where it says `data-netlify-honeypot`) to get additional checks on form submission. Rather than build in a call to something like Akismet, or import my own spam filter, I felt this was the simplest way forward. It felt a bit like a compromise on my 'I own everything' take, but if I have to move platforms I can rebuild it fairly easily.

All right, we now have our form hooked up and a serverless function to capture the data. Where do we save this? Well, anywhere we want, really! In my case, I wanted to store this data in Github. For this use case, [Github offers a RESTful API](https://docs.github.com/en/free-pro-team@latest/rest) where a developer can interact with a given repository. In this case, it allows me to commit a new file into a branch of my blog.

For this example, I will use Axios, but feel free to use `isomorphic-fetch` or your preferred fetch library. 

```javascript
  const url =
    'https://api.github.com/repos/lindsaykwardell/lindsaykwardell/contents/' +
    filePath

  axios
    .put(
      url,
      {
        message: `New comment on ${postTitle}`,
        branch: 'new-comments',
        author: {
          name: 'Lindsay Wardell',
          email: process.env.COMMIT_EMAIL,
        },
        committer: {
          name: 'Lindsay Wardell',
          email: process.env.COMMIT_EMAIL,
        },
        content: Buffer.from(content).toString('base64'),
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
        },
      }
    )
    .then((res) =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ msg: 'Your comment has been submitted!' }),
      })
    )
    .catch((err) =>
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ msg: 'An error occurred!', err }),
      })
    )
```

Now, any form submission from our site will go to Netlify, pass to this function, and get committed to our Github repository. For my case, I created a separate branch for new comments, just in case any spam filtering still needs to be done.

## Conclusion

Congratulations! You now have complete control over your comments on a static site. This should work with any static site generator. My goal was to have complete control over the contents of my site, so I can take it with me wherever I want. While I do feel a bit tied into Netlify, I feel that it's a worthy compromise, considering all of the data is mine at the end of the day.

[Here's a link](https://github.com/lindsaykwardell/lindsaykwardell) to my site's Github repository in case you want to look at the full source code.

Stay safe!