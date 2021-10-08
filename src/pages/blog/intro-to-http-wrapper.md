---
slug: "/intro-to-http-wrapper"
date: 2020-05-26
title: "Introduction to Deno with http_wrapper"
author: "Lindsay Wardell"
image: "/blog/deno.png"
tags:
  - Web Development
  - Deno
  - Server-side
  - Typescript
snippet: I'm a big fan of Deno, but there must be an easier way to build a router-based HTTP client.
layout: '../../layouts/BlogPost.astro'
---

I'm a big fan of [Deno](https://deno.land), the new Javascript runtime by the creator of Node. I love that it is built with Typescript in mind, reducing the amount of configuration required to get work done. I like that packages (or modules, as they are referred to) can be imported via URL, and don't require a package manager. I also love how *fast* it is to start a Deno project for development.

For the uninitiated:

> Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.
>
> - Secure by default. No file, network, or environment access, unless explicitly enabled.
> - Supports TypeScript out of the box.
> - Ships only a single executable file.
> - Has built-in utilities like a dependency inspector (deno info) and a code formatter (deno fmt).
> - Has a set of reviewed (audited) standard modules that are guaranteed to work with Deno: deno.land/std

As a web developer, my first question was, "Okay, how do I start an HTTP server?"

It turns out, the built-in methods to handle this aren't too difficult to figure out:

```javascript
import { serve } from "https://deno.land/std@0.53.0/http/server.ts";

const s = serve({ port: 8000 });

for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

Want to respond differently for different endpoints? No big deal!

```javascript

import { listenAndServe } from "https://deno.land/std@0.53.0/http/server.ts";

const s = listenAndServe({ port: 8000 }, (req: ServerRequest) => {
  if (req.url === "/example") {
    req.respond({ body: "You found the example endpoint!" })
  } else {
    req.respond({
      status: 404
    })
  }
});

```

Pretty straightforward. However, this method of writing an API could get pretty verbose: multiple if-statements, no simple solution to break out different endpoints into their own scope or module, and no clear way to scale your application as your routes grow. A large application could become unwieldy pretty fast using this format to write your API.

There are already a lot of libraries out there for managing routes (Oak and Drash come to mind). From what I can tell, though, these libraries wrap the default `ServerRequest` object in their own formats, making them incompatible with other built-in methods (like web sockets). I really love how simple it is to get started, there must be a way to just wrap the default `listenAndServe` and `ServerRequest` objects in a router-based solution.

And so I wrote `http_wrapper`, a simple wrapper around the above code. Let's implement the above example using `http_wrapper`:

```javascript
import { Server, Router } from "https://deno.land/x/http_wrapper@v0.3.0/mod.ts";

const app = new Server();

const router = new Router();

router.get("/example", (req: ServerRequest) => {
  req.respond({ body: "You found the example endpoint!" });
});

app.use(router.routes);

app.start({ port: 8000 });
```

Save the above in a file (say index.ts), and run it as follows:

```
deno run --allow-net --allow-read index.ts
```

*Note: Deno has a secure runtime, so whenever you want to reach out of its sandbox you need to explicitly allow it to.*

`http_wrapper` adds two new classes:

## Server

The `Server` class handles calling `listenAndServe()`, and correctly determining which endpoint was called. When the server is started (with `app.start()`), internally the class calls `listenAndServe()` and begins checking each request against its list of routes and endpoints. The config object that is passed into `app.start()` is `Deno.ListenOptions`, the same as for `listenAndServe()`.


## Router

`Router` is where the fun begins. This class is meant to handle all of your API needs. It takes a constructor of a string, which is the base route for that router:

```javascript
// Creating the /example route
const router = new Router("/example");
```

Endpoints can then be added to routes for different HTTP methods:

- GET
- POST
- PUT
- DELETE
- OPTIONS
- PATCH
- HEAD

```javascript
const router = new Router("/example");

// Add a GET request
router.get("/", req => {
  req.response({body: "You found me!" });
})

// Add a POST request
router.post("/", req => {
  req.response({
    status: 204,
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      msg: "Saved!"
    })
  });
});

export const router;
```



*Note: Currently, there is no support for path parameters*

## Putting it together

Once you have defined your routes, you can bring them into the `Server` by using `app.use()`. Also, if you have static files you would like to deploy with your app, you can define the static file folder and endpoint with `app.static()`.

```javascript
import { route1 } from "./Router1.ts";

const app = new Server();

app.use(route1.routes); // Router.routes is a getter, so no function calls are required
app.static("static", "/");

app.start({ port: 8000 });

```

Congratulations, you are now hosting an app with two endpoints:

- http://localhost:8000/example (various string/JSON responses)
- http://localhost:8000/ (static files)


The best part? For development, it takes about a second to start up!

```
deno run --allow-net --allow-read index.ts
```

You can check out `http_wrapper` here: [Deno.land](https://deno.land/x/http_wrapper). The project is MIT licensed, so feel free to use it and report any issues you find. 

Next time, I'll talk about how to incorporate `http_wrapper` with a Vue 3 SPA to create a chat room, while keeping the ~1 second startup for development.

Take care!

