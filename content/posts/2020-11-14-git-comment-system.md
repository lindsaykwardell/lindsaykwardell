---
slug: "/git-comment-system"
date: 2020-11-14
title: "Build a Comment System using Git"
author: "Lindsay Wardell"
image: "/blog/git.gif"
tags:
  - Web Development
  - Git
  - CMS
  - Javascript
excerpt: ...
---

## From Wordpress to Jamstack

I love the Jamstack. I built my first blog with Wordpress, which is an excellent tool. If you're looking into setting up your own blog, it's a great option! The main problem I had with it, however, was relying on another service to host my posts, my images, everything. What if GoDaddy (my host at the time) were to shut down? How could I migrate from their MySQL database to another easily? What would I do with all of my content?

This actually happened to me, when I needed to migrate from one provider to another. The solution - abandon everything, and start from scratch. A migration wasn't possible to my new host, so I copied everything into a text file and started over on the site. 

Then I learned about Gatsby, and that I could have a static site where my blog posts are all stored in text files. Win! I could control my posts, my site, my content, and host it anywhere. This sounded exactly like what I wanted to do. I looked at headless Wordpress, but decided I wanted full control of the site. I built out a first version of the site with Gatsby, deployed it to Netlify, and life was good.

Except...

What about comments?

## Static Comments??

I've never had a super popular blog, but having a comment system felt important to build a complete blog. The options that are out there are... okay, but most of them didn't actually match what I was going for. I settled on Disqus, but the fact that I couldn't host it, plus the tie-in to another service meant that it felt antithetical to hosting a static site.

After doing some research, I found [Staticman](https://staticman.net/). Quoting from their homepage, "Staticman handles user-generated content for you and transforms it into data files that sit in your GitHub repository, along with the rest of your content." This concept spoke to me. I did some research into using this approach, but at the time, it looked like the service had grown too fast, and comments were processing too slowly, if at all. Hopefully they've fixed it by now, but again, it's another service to rely on.

All of this research, however, led me to a decision. I'm a developer; I can build this myself!

## Serverless to the Rescue!

My goals for this project:

- Accept input from a user
- Process that into a text file
- Commit that text file into a Github repository.

I'm already hosted on Netlify, so accepting user input is straightforward. Netlify offers form submission ([read more here](https://www.netlify.com/products/forms/)). In short, by adding some basic attributes to a form, you can enable a POST request to your site that Netlify will capture and process. I'm using Vue, so I turned to [Vue Formulate](https://vueformulate.com/) to build the form, and [Vuetensils](https://vuetensils.stegosource.com/) for an alert on success/failure. Unfortunately this doesn't work nicely with Netlify, so I had to add the form in a standard way in order for Netlify to pick it up and build the POST endpoint. A simple compromise.

```
<FormulateForm
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  @submit="submitComment"
>
  <FormulateInput type="hidden" name="form-name" value="new-comment" />
  <FormulateInput type="hidden" name="postTitle" :value="blog.title" />
  <FormulateInput type="hidden" name="postPath" :value="`/blog${blog.slug}`" />
  <FormulateInput type="hidden" name="bot-field" />
  <FormulateInput
    type="text"
    name="author"
    label="Name"
    validation="required"
    class="my-3"
    input-class="w-full p-2 shadow"
    :disabled="submitted"
  />
  <FormulateInput
    type="email"
    name="email"
    label="Email"
    class="my-3"
    input-class="w-full p-2 shadow"
    :disabled="submitted"
  />
  <FormulateInput
    type="textarea"
    name="message"
    label="Comment"
    rows="5"
    validation="required"
    class="my-3"
    input-class="w-full p-2 shadow"
    :disabled="submitted"
  />
  <div class="flex justify-center w-full">
    <FormulateInput
      type="submit"
      label="Submit"
      class="text-white rounded-lg transition duration-200 mt-5 w-1/3 md:w-1/4 lg:w-1/5 text-center"
      input-class="px-4 py-2 w-full"
      :disabled="submitted"
    />
  </div>
  <VAlert class="success" v-model="accepted" transition="fade"
    >Your comment has been posted! It will appear after it is
    approved.</VAlert
  >
  <VAlert class="error" v-model="error" transition="fade"
    >An error occurred. Please try again.</VAlert
  >
</FormulateForm>
```

Great, I've got my form, and it's submitting to Netlify. But how can I access that data to submit to Github?

Luckily, Netlify has another great feature: [Serverless Functions](https://www.netlify.com/products/functions/)!