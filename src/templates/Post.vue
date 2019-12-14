<template>
  <Layout>
    <br />
    <g-link to="/blog/" class="link">&larr; Go Back</g-link>
    <div class="post-title">
      <g-image class="hero" v-if="$page.post.image" :src="$page.post.image" />
      <h1>{{$page.post.title}}</h1>
      <div class="text-center pt-2">Published by {{$page.post.author}} on {{$page.post.date}}</div>
    </div>
    <article class="pt-6 m-4" v-html="$page.post.content"></article>
    <div class="bg-gray-200 p-6">
      <div class="mb-4">
        <h2>Tags</h2>
        <div
          v-for="tag in $page.post.tags"
          :key="tag"
          color="gray-800"
          size="md"
          class="pill"
        >{{tag}}</div>
        <div class="flex">
          <div class="text-left flex-1">
            <span v-if="prevPost">
              Previous:{{" "}}
              <g-link :to="prevPost.path" class="underline">{{prevPost.title}}</g-link>
            </span>
          </div>
          <div class="text-right flex-1">
            <span v-if="nextPost">
              Next:{{" "}}
              <g-link :to="nextPost.path" class="underline">{{nextPost.title}}</g-link>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="border-2 rounded m-4 shadow bg-gray-100">
      <h4>Add a Comment</h4>
      <div class="p-2">
        <form
          name="new-comment"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          @submit.prevent="addComment"
        >
          <input type="hidden" name="bot-field" v-model="botField" />
          <label>Name</label>
          <input type="text" name="author" v-model="author" />
          <label>Email</label>
          <input type="email" name="email" v-model="email" />

          <label>Comment</label>
          <textarea name="message" rows="5" v-model="comment" />

          <div class="text-center">
            <button type="submit" @click="addComment">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      botField: "",
      author: "",
      email: "",
      comment: "",
    }
  },
  computed: {
    postIndex() {
      return this.$page.allPost.edges.findIndex(
        ({ node }) => node.path === this.$page.post.path
      )
    },
    nextPost() {
      return this.postIndex > 0
        ? this.$page.allPost.edges[this.postIndex - 1].node
        : null
    },
    prevPost() {
      return this.$page.allPost.edges[this.postIndex + 1]
        ? this.$page.allPost.edges[this.postIndex + 1].node
        : null
    },
  },
  methods: {
    addComment() {
      axios.post(this.$page.post.path, {
        'bot-field': this.botField,
        author: this.author,
        email: this.email,
        comment: this.comment,
        postTitle: this.$page.post.title,
        postPath: this.$page.post.path
      }).then(() => alert("Comment posted!")).catch(err => console.error(err))
    },
  },
}
</script>

<style lang="postcss" scoped>
.post-title {
  text-align: center;
}
.hero {
  max-width: 900px;
  max-height: 450px;
  object-fit: none;
  object-position: center;
  margin: 0 auto;
}

.pill {
  @apply bg-gray-800 text-white shadow font-light no-underline py-2 px-4 rounded-full m-1 font-bold select-none text-sm inline-block;
}

input,
textarea {
  @apply p-2 my-3 border-2 rounded w-full text-lg;
  resize: none;
}

button[type="submit"] {
  @apply py-2 px-3 bg-blue-500 text-white rounded w-1/6;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    @apply bg-blue-700;
  }
}
</style>

<page-query>
query Post ($path: String!) {
   post: post (path: $path) {
    path
    title
    author
    tags
    content
    date(format: "MMMM DD, YYYY")
    image(width: 900)
  }
  allPost {
    edges {
      node {
        path
        title
        date
      }
    }
  }
}
</page-query>