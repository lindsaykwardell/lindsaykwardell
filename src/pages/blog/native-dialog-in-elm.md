---
date: 2023-05-09
title: "Native Dialog Element in Elm"
image: "https://images.unsplash.com/photo-1548880021-76c14b1f6602?auto=format&fit=crop&w=1000&q=80"
author: "Lindsay Wardell"
snippet: The native dialog element is fantastic for implementing modals. Let's explore how to make it work within Elm!
layout: '../../layouts/BlogPost.astro'
---
A common design pattern when building client-side applications is the need to display a modal or dialog on top of the main page content. It may be a login form, a "What's New" style notification, a feedback input, or any number of other possible designs. Modals are incredibly tricky to program by hand in a way that provides a friendly and accessible experience. The W3C provides [a list of reccomendations and guidelines for creating dialog interfaces](https://www.w3.org/TR/wai-aria-practices/#dialog_modal), which includes a series of recommendations and guidelines on how to implement a dialog.

From the above documentation, here's the definition of a dialog:

> A dialog is a window overlaid on either the primary window or another dialog window. Windows under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.
>
> Like non-modal dialogs, modal dialogs contain their tab sequence. That is, Tab and Shift + Tab do not move focus outside the dialog. However, unlike most non-modal dialogs, modal dialogs do not provide means for moving keyboard focus outside the dialog window without closing the dialog.

It's fairly simple to create the basic outline of a dialog interface: render a box or card in the center of the screen, provide a fade-out overlay for the background content (ideally one that can be clicked to close the box), and prevent global scrolling. However, in order to meet the requirements as outlined by the W3C, we also need to prevent tabbing in the background application, set focus on a button that can close the dialog, and restore focus to the element that triggered the dialog after it closes. Suddenly things feel a lot more complicated!

Thankfully, there is a browser native way to implement dialogs that covers (most of) the cases above, and provides straightforward ways to handle the rest: [the `<dialog>` element!](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)

## What is `<dialog>`?

From the MDN docs:

> The `<dialog>` HTML element represents a dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow.

`<dialog>` is a browser-based way to create dialog interfaces. It's a newer HTML element, which only recently got support from all major browsers (Safari 15.4 was the last one, released in March 2022). According to caniuse, it's now supported across the board (except in IE11, which is expected):

[![Screenshot of caniuse information on the dialog element.](/blog/dialog-caniuse.png)](https://caniuse.com/dialog)

In short, a dialog element is just like any other HTML element, and can be written like this (try it out!):

<iframe src="https://stackblitz.com/edit/web-platform-bdwgb7?embed=1&file=index.html" class="w-full" height="500">

```html
<html>
  <head>
    <title>Dialog example</title>
  </head>
  <body>
    <h1>Dialogs are awesome!</h1>
    <button id="open-dialog">Open dialog</button>
    <dialog>
      <h2>My dialog</h2>
      <button>Close</button>
    </dialog>
    <script src="script.js"></script>
  </body>
</html>
```

```js
document.getElementById('open-dialog').addEventListener('click', () => {
  document.querySelector('dialog').showModal();
});

document.querySelector('dialog > button').addEventListener('click', () => {
  document.querySelector('dialog').close();
});
```

</iframe>

Some cool things to note here:

- You get a basic style for the dialog box and the background (which are all targetable by CSS and can be tweaked as desired).
- Opening the dialog sets focus to the close button.
- Closing the dialog sets focus back to the open button.
- Tabbing is diabled outside of the dialog when it's open.
- You can also press the escape key to close the dialog.
- If you're using a screen reader, such as VoiceOver, it should announce that focus has shifted between the open and close buttons.

That's a lot of free benefits for using the built-in element! Of course, some of the functionality here is reliant on Javascript. In this case, we set two event listeners, one for clicking the open button and another for clicking the close button. In order to properly toggle the dialog, we need to call a method on the dialog element itself. To open the dialog, we call `showModal`, and to close it we call `close`.

### The `open` Attribute

But wait! The MDN docs list a different way to display the dialog as open: [the `open` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#attr-open)!

> Indicates that the dialog is active and can be interacted with. When the open attribute is not set, the dialog shouldn't be shown to the user. It is recommended to use the .show() or .showModal() methods to render dialogs, rather than the open attribute.

As Elm developers, it might be tempting to go down this path and 