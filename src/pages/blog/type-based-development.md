---
date: 2032-02-01
title: "Type-Based Development"
image: "https://images.unsplash.com/photo-1608538618785-7b9ce53f373f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
author: "Lindsay Wardell"
snippet: What if, instead of component-based development, we used type-driven development?
layout: '../../layouts/BlogPost.astro'
---
Modern Javascript frameworks typically have one major characteristic that they all share - components. Whether you're using functional or class-based comppnents in React, Single-Fine Components in Vue, standards-based Web Components in Lit, or any of the other flavors of components in the wild today, almost all frontend development is centered around building portions of user interface and composing them into a web application. This methodology has even extended into other languages and paradigms, such as Flutter/Dart using "Widgets" (components by another name) or Swift's implementation in the form of SwiftUI for building mobile apps. One might even go so far to say that "components" are a new paradigm of programming, similar to but distinct from traditional object-oriented systems.

But what if, rather than being the solution to the problems plaguing front-end development for years, component-based frameworks (and the development cycles they introduce) actually cause more problems than solutions? What if there was an easier way to write web application UI's that didn't rely on breaking down the site into "components" as defined by React or Vue?

What if... we could simply write functions around a data type?

## Type-Driven Development