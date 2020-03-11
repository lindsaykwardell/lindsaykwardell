<template>
  <div>
    <div class="flex mx-auto text-xl text-center w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2">
      <a
        class="social-media"
        href="https://www.facebook.com/lindsaykwardell.writer/"
      >
        <v-icon name="brands/facebook-square" label="Facebook" scale="1.3" />
      </a>
      <a class="social-media" href="https://twitter.com/Yagaboosh">
        <v-icon name="brands/twitter-square" label="Twitter" scale="1.3" />
      </a>
      <a
        class="social-media"
        href="https://www.linkedin.com/in/lindsaykwardell/"
      >
        <v-icon name="brands/linkedin" label="LinkedIn" scale="1.3" />
      </a>
      <a class="social-media" href="https://github.com/lindsaykwardell">
        <v-icon name="brands/github-square" label="GitHub" scale="1.3" />
      </a>
      <a class="social-media" href="/rss.xml">
        <v-icon name="rss-square" label="RSS Feed" scale="1.3" />
      </a>
    </div>
    <hr class="my-4 mx-auto" />
    <MenuItem to="/">Home</MenuItem>
    <MenuItem to="/blog/">Blog</MenuItem>
    <MenuItem to="/uses/">What I Use</MenuItem>
    <hr class="my-4 mx-auto" />
    <div class="text-center md:text-left">
      <span class="text-white px-4 py-2">Recent Posts</span>
      <g-link
        v-for="post in $static.allPost.edges"
        :key="post.node.id"
        :to="post.node.path"
        class="recent-post block px-6 py-1"
      >
        {{ post.node.title }}
      </g-link>
    </div>
  </div>
</template>

<script>
import "vue-awesome/icons/brands/facebook-square"
import "vue-awesome/icons/brands/twitter-square"
import "vue-awesome/icons/brands/linkedin"
import "vue-awesome/icons/brands/github-square"
import "vue-awesome/icons/rss-square"

import MenuItem from "./MenuItem/MenuItem"

export default {
  components: {
    MenuItem,
  },
}
</script>

<style lang="postcss" scoped>
a.social-media {
  @apply font-light no-underline rounded flex-1;
}

divider {
  @apply mx-auto;
  background-color: #444;
  height: 1px;
  width: 80%;
}
</style>

<static-query>
query {
  allPost(limit: 5) {
    edges {
      node {
        path
        title
      }
    }
  }
}
</static-query>
