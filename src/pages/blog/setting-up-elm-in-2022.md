---
slug: "/blog/setting-up-elm-in-2022"
date: 2031-12-11
title: "Setting up an Elm project in 2022"
image: "/elm.png"
author: "Lindsay Wardell"
snippet: Get started writing in Elm with the best tools available.
layout: '../../layouts/BlogPost.astro'
---
If you haven't used Elm before, it can be a bit intimidating to get started. A pure functional programming language for building web applications, Elm provides a number of tools for writing Elm apps, including `elm reactor` for fast recompiling of specific modules and `elm make` for building JS assets. But this workflow can feel a bit lacking if you're coming from a Javascript ecosystem, where hot module reload (HMR), automatic bundling, and integration with CSS and other frontend technologies is common.

Luckily, there are a number of options for setting up a successful Elm application today. Let's explore what's available for building an Elm application in 2022, including ways to get a better development environment, as well as the tooling surrounding Elm that makes working with the language as delightful as possible.

## Elm (the language)

You can install the Elm language (and its bundled tooling) [from npm](https://www.npmjs.com/package/elm). Installing Elm globally gives you access to a handful of useful tools:

### `elm repl`

This is the command line repl for Elm. You can use it to execute commands in Elm and see what the result would be.

### `elm init`

This is the command to initialize Elm in a folder. Because Elm has its own ecoystem of tooling and libraries separate from Javascript, it also does not use npm for its package management, and as such does not rely on `package.json`. If you want to add Elm to a project (or start a new project), you'll need to run this command. When you do, you'll see a message like this:

```
$ elm init
Hello! Elm projects always start with an elm.json file. I can create them!

Now you may be wondering, what will be in this file? How do I add Elm files to
my project? How do I see it in the browser? How will my code grow? Do I need
more directories? What about tests? Etc.

Check out <https://elm-lang.org/0.19.1/init> for all the answers!

Knowing all that, would you like me to create an elm.json file now? [Y/n]
```

This is an example of how Elm provides helpful information at every opportunity, as well! The link it provides takes you to documentation on how to structure and scaffold an Elm application.

### `elm reactor`

Running `elm reactor` opens an interactive page for navigating your Elm code and previewing it in the browser. Note that is does not render external Javascript, or any values set in your HTML files; it is only displaying what the output is for a given Elm file. Also, it does not support auto refresh, so you will have to manually refresh your browser.

![Elm reactor, showing current files in the src folder, source directories, and dependencies](/blog/elm-reactor.png)

### `elm install`

As you may expect, this command installs an Elm dependency in your application. Sometimes you will need to install a dependency that is already a sub dependency, in which case Elm will inform you that it's going to move the dependency up in the chain so that you can import its modules directly.

### `elm make`

This command lets you build the output Javascript from your Elm code, so that you can import and initialize it in your application. If you are utilizing a tool like Webpack, Parcel, Rollup, or Vite, this is typically not something you'll need to do (more on bundlers later).


There are other commands available as well. Feel free to run `elm --help` to see all the available commands and options.


## Editor

There are a handful of plugins and extension for different editors, the majority of which can be found on an [officially updated list](https://github.com/elm/editor-plugins) within the Elm organization on Github. My editor of choice is VS Code, and the [VS Code extension for Elm](https://marketplace.visualstudio.com/items?itemName=Elmtooling.elm-ls-vscode) is an excellent tool for writing in Elm. It provides details on errors when saving, references to where a particular function or value is utilized, and access to function documentation on hover

![The Elm tooling extension in VS Code](/blog/elm-vs-code.png)


## Code Formatting

Unlike Javascript, Elm has an [official Style Guide](https://elm-lang.org/docs/style-guide) for how Elm code should be structured. In addition, some formatting is built into the language itself, such as requiring indents of four spaces. This removes a major point of contention within teams. In addition, the community has put together a wonderful tool called [`elm-format`](https://github.com/avh4/elm-format). Similar to Prettier, this utility can be used to ensure that all Elm code matches the official style guide. Unlike Prettier, there is no custom configuration, meaning once again that your team can focus on writing code instead of what kind of quotes to use.

## Linting

The Elm community has an unofficial linter (called [`elm-review`](https://github.com/jfmengels/elm-review/tree/2.6.1)), which can be used to check your code for potential bugs or mistakes, or highlight a better way to write Elm. Unlike `elm-format` (and more similar to tools like ESLint), `elm-review` does not come with any default rules to follow:

> All the rules describing problematic code are written in Elm, and elm-review does not come with any built-in rules; instead users are encouraged to write rules themselves and publish them as Elm packages, for everyone to benefit. Search the package registry to find what's out there!

## Testing

The de-facto standard for testing an Elm application is [`elm-test`](https://github.com/elm-explorations/test). However, as noted in the README:

> When people say “elm-test” they usually refer to either:
>
> - This Elm package for writing tests.
> - rtfeldman/node-test-runner – a CLI tool (called elm-test) for running tests defined using this package in the terminal.

The Elm package (available on the [Elm package repository](https://package.elm-lang.org/packages/elm-explorations/test/latest)) contains the functions required to write tests, query HTML, and perform assertions. The syntax should be familiar if you've written unit or fuzz tests in other languages, with `describe` blocks and individual `test` functions being called.

To actually run the tests, however, there are currently two options. The first, as noted above, is [`node-test-runner`](https://github.com/rtfeldman/node-test-runner), which is available from npm at `elm-test`. This utility will run the tests as defined in your Elm code, and return the results. There is a second option, [`elm-test-rs`](https://github.com/mpizenberg/elm-test-rs), which is written in Rust instead of Node. It has a handful of features that `node-test-runner` does not have, as well as some downsides (see the Github README for details), but in general both tools work very well for testing Elm code.

## Development Environment

Now's the fun part - writing our app! Using only the above tools, you would be set to build an Elm application that is properly formatted, tested, and compiled to JS. However, that doesn't help you get it onto the page; you'l still have to create an HTML file, import your Elm code along with any other dependencies you may have, and test it in your "live" environment. Found an error? Time to recompile!

Needless to say, this can get pretty tedious, not to mention that most Javascript developers today are used to more advanced tooling (such as auto refresh or hot module reload). What can we do in order to set up a better development environment for ourselves?

### elm-live

![elm-live, a flexible dev server for Elm.](https://github.com/wking-io/elm-live/raw/master/elm-live-logo.png)

First on our list is [elm-live](https://github.com/wking-io/elm-live). From their README, elm-live provides:

> - Hot reloading
> - Local SSL
> - No reload mode
> - No server mode
> - and more!

It's a pretty great tool for working with an Elm application, removing the tedious step of constantly rebuilding our application. However, there's still a couple drawbacks with using elm-live. First, it exists as a development environment for Elm, which means that changing our HTML, CSS, or Javascript assets will not trigger anything. Second, if you need any dependencies from npm, elm-live will not compile these for you. You'll still need some sort of bundler for the rest of your assets. elm-live is excellent for projects written primarily in Elm, or if you don't mind running two development environments side by side.

### Webpack/Rollup/etc

If you're a Javascript developer, you may have gotten accustomed with importing arbitrary files into your Javascript code. Want to bring in a `.vue` file? Go for it! `.svelte`? Sure, why not! Our favorite frameworks typically provide some sort of integration with bundlers so that we can import them directly, without having to compile them first to standard Javascript. Can we do that with Elm?

It turns out, we can! Elm has pretty good support across compilers/bundlers, so that you can import an Elm file directly into your core JS application - no compile step required! Keep in mind that you will still need to initialize the Elm application in order for that code to do anything, but otherwise you are able to treat it like any other compile-to-JS asset.

Here's a list of common compiler options:

- Webpack: [`elm-webpack-loader`](https://github.com/elm-community/elm-webpack-loader)
- Rollup: [`rollup-plugin-elm`](https://github.com/ulisses-alves/rollup-plugin-elm#readme)
- Vite: [`vite-plugin-elm`](https://github.com/hmsk/vite-plugin-elm)

### A note on Parcel

Unlike other build tools, Parcel provides [built-in support for Elm](https://parceljs.org/languages/elm) by default, no plugins required. However, please note that there are some issues when using Parcel 2 with Elm, which are a frequent point of discussion on the Elm Slack channel.

### `elm-tooling`

Great! Now we're able to import our Elm code directly into our existing applications, making the integration that much easier. However, there's still one last thing we can do to improve our environment. One problem we may run into is that the tooling described above needs to be installed locally in order to utilize it, which can lead to more work onboarding developers or getting started with a project.

There is a tool called [`elm-tooling`](https://elm-tooling.github.io/elm-tooling-cli/) which does all the hard work for us. Rather than having to install the Elm language, `elm-format`, and `elm-test` (or `elm-test-rs`) individually, we can run `npx elm-tooling install`, and all of the core tooling can be installed at once, significantly faster than if they were installed individually. This can even be added as a postinstall command in your `package.json`, ensuring that Elm and its related tools are available with a single install command. This is extremely useful when setting up your local environment, or during CI build steps.

## Frameworks and Templates

All this tooling is great, and an excellent way to get writing Elm code and integrating it into your application. But sometimes it's nice to start from a higher level abstraction, much like React developers often start with Create React App, or Vue developers use the Vue CLI. While there are no official templates or frameworks beyond what we've already talked about, there are a few interesting projects that are worth taking a look at.

### elm-spa

[elm-spa](https://www.elm-spa.dev/) is a great way to start working on a single-page Elm application. Browser navigation and handling multiple pages is something that is a bit more difficult in Elm than in pure Javascript, and as such requires more boilerplate code in order to make it work. elm-spa handles all of the complexities of building an SPA for you, while providing a number of great features for building a modern web application.

![Build reliable applications with Elm. With elm-spa, you can create production-ready application with one command: npx elm-spa new. No need to configure webpack, gulp, or any other NPM dev tools. This zero-configuration CLI comes with a live-reloading dev server, production-ready build commands, and even a few scaffolding commands for new and existing applications.](/blog/elm-spa-image.png)

### elm-pages

Where elm-spa is targeting single-page applications, [elm-pages](https://elm-pages.com/) is built for generating static sites. Utilizing Elm's type system, elm-pages's goal is to make handling external data for a static site easy. Conceptually, it's similar to what Gatsby or Gridsome do (provide a typesafe interface to access multiple types of data), but utilizing Elm's strengths rather than adding an additional type system such as GraphQL.

![Pull in typed Elm data to your pages. Whether your data is coming from markdown files, APIs, a CMS, or all of the above, elm-pages lets you pull in just the data you need for a page. No loading spinners, no Msg or update logic, just define your data and use it in your view.](/blog/elm-pages-image.png)

### `vite-elm-template`

This was a template I created to scratch my own itch. As a Vue developer, I love working with Vite, and really wanted a base template for Vite that I could use to build Elm applications. [`vite-elm-template`](https://github.com/lindsaykwardell/vite-elm-template) is a basic Vite template intended to get you started writing in Elm without having to spend time configuring everything yourself. Unlike elm-pages or elm-spa, it's not a framework of any sort. If you want to bring in single-page application features, or other functionalities, you will have to build those in yourself. That said, it's perfect for getting started with a basic environment.

As of this writing it includes:

- Hot Module Reload of all code in the app (including Elm)
- Tooling installation via `elm-tooling`
  - Includes Elm, `elm-format`, `elm-json`, and `elm-test-rs`
- Basic unit test examples
- Github Actions CI for running tests
- Recommends the Elm VS Code extension

If Vite is something you enjoy working with, I hope you'll check it out! There is also a link in the README to set up a workspace using Gitpod if you want to try things out in a sandbox environment first.

## Conclusion

I hope that helps you get started building an Elm application! Elm is an amazing language to learn and work with, and the tooling that exists to support it today makes working with it as delightful an experience as the language itself provides. Above all, I hope you enjoy learning and working with Elm in 2022!