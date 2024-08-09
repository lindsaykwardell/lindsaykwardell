---
pubDate: 2022-05-09
title: "Utilizing Native Dialog in Elm"
image: "/blog/utilizing-dialog-in-elm.webp"
author: "Lindsay Wardell"
snippet: The native dialog element is fantastic for implementing modals. Let's explore how to make it work within Elm!
type: Programming
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

As Elm developers, it might be tempting to go down this path and set the attribute. However, doing this does *not* provide the additional benefits of updating focus, blocking the background from input, etc. To get the full benefit of the dialog element, we need to call `showModal`. Note that `show` is also an option, but it does basically the same thing as `open`, and is not recommended.

We can, however, check whether the dialog is visible at the moment by looking at `open`. When we call `showModal`, `open` is set to `true`, which means that rather than have distinct calls to open and the close the dialog, we could choose to have a simple toggle function, which internally checks whether the dialog is open.

## Implementing `<dialog>` in Elm

Now that we understand what the dialog element provides us, and what is required to make it useful, let's start working with it in Elm. Elm provides a number of HTML elements in its `Html` module, but since the dialog element is newer, we first need to define it ourselves.

### Rendering the dialog

In order to define a custom element, we need to import `Html`, then we can use `Html.node` to generate a custom element. As with any HTML element in Elm, it takes two arguments (a list of attributes and a list of HTML), but it also takes a string to use as the custom element's tag. Here's a basic example:

```elm
dialog : List (Html.Attribute msg) -> List (Html msg) -> Html msg
dialog attr content =
    Html.node "dialog" attr content
```

This provides a basic interface for a dialog element. However, we're going to need to trigger it's `showModal` and `close` methods, so it's probably helpful to require an ID. Let's just add the ID as part of the function signature:

```elm
dialog : String -> List (Html.Attribute msg) -> List (Html msg) -> Html msg
dialog elementId attr content =
    Html.node "dialog" ((id elementId) :: attr) content
```

Great! Now the ID will be set by the first argument, and the rest of the HTML element signature is the same that other elements use. At this point, you can start rendering the dialog on the page, but it won't appear (unless you set the `open` attribute). We need a way to trigger the methods provided in Javascript.

### Triggering the dialog

Elm provides [ports](https://guide.elm-lang.org/interop/ports.html) as the go-to solution for interacting between Javascript and Elm. We need to utilize a port to call out to Javascript in order to trigger the dialog to appear. Let's define our port below:

```elm
port toggleDialog : String -> Cmd msg
```

When our Elm application is compiled, `toggleDialog` will be available to subscribe to from Javascript. In this case, it provides a string (the dialog's ID) that we can use to select our element and perform the required action on it. Here's an example of our Javascript code:

```js
app.ports.toggleDialog.subscribe(id => {
  const dialog = document.querySelector(`#${id}`)

  if (dialog.open) {
      dialog.close.();
  } else {
      dialog.showModal.();
  }
});
```

This is a pretty simple snippet of Javascript. We take the provided ID, find the element, and check whether it's open. If it is, then we close it, otherwise we open it. If you want, you could add an additional port for Javascript to inform Elm of the current status of the dialog, but it's not required.

Here's an [example repository](https://github.com/lindsaykwardell/elm-dialog-example) showcasing the dialog element, and here's a [live demo](https://elm-dialog-example.netlify.app/) of that repository. Check it out!

## Conclusion

The dialog element provides a lot of benefits for developers needing to utilize this UI pattern. However, it's important to note that just because it provides a large number of benefits and accessibility support built-in, it still requires planning and testing to properly implement a dialog that is usable by all the visitors to your site. Make sure that you and your team are performing regular a11y testing, so you aren't leaving any of your users out of the loop with what your site is showing them!

Also, keep in mind that it is a fairly new element, and you may have users that are not supported yet. If you still have a large number of users that don't have access to the dialog element, consider using an existing alternative or providing an alternative userflow.

That said, it's very exciting to see what the future of HTML looks like, and I'm looking forward to more elements like this that are built-in and provide a lot of value to both users and developers. Try it out, and see if it works for you today!