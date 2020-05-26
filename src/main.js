// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import "~/assets/main.css";
import 'prismjs/themes/prism.css'

import Icon from 'vue-awesome/components/Icon'
import DefaultLayout from "~/layouts/Default.vue";

export default function(Vue, { router, head, isClient }) {
  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Lato|Rokkitt&display=swap"
  });
  head.script.push({
    src: "https://f.convertkit.com/ckjs/ck.5.js"
  })

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.component("v-icon", Icon)
}
