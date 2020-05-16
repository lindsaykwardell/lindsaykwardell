<template>
  <Layout>
    <br />
    <button class="link hover:underline" @click="$router.go(-1)">&larr; Go Back</button >
    <div class="post-title mt-6">
      <g-image class="hero" v-if="$page.post.image" :src="$page.post.image" />
      <h1>{{ $page.post.title }}</h1>
      <div class="text-center pt-2">Published by {{ $page.post.author }} on {{ $page.post.date }}</div>
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
        >{{ tag }}</div>
        <div class="flex mt-6">
          <div class="text-left flex-1">
            <span v-if="prevPost">
              Previous:{{ " " }}
              <g-link :to="prevPost.path" class="underline">
                {{
                prevPost.title
                }}
              </g-link>
            </span>
          </div>
          <div class="text-right flex-1">
            <span v-if="nextPost">
              Next:{{ " " }}
              <g-link :to="nextPost.path" class="underline">
                {{
                nextPost.title
                }}
              </g-link>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        v-for="{ node } in $page.allComment.edges"
        :key="node.id"
        class="flex my-4 p-2 border-2 rounded"
      >
        <div class="flex-shrink px-3 border-r-2">
          <g-image :src="`https://www.gravatar.com/avatar/${node.authorId}`" class=" h-20 w-20 rounded-full" />
        </div>
        <div class="flex-grow">
          <div class="border-b-2 pl-4 pb-2 flex">
            <div class="flex-1 font-bold">{{ node.author }}</div>
            <div class="flex-1 text-right text-gray-600">{{ formatDate(node.date) }}</div>
          </div>
          <div class="pl-2">
            <div v-html="node.content" />
          </div>
        </div>
      </div>
    </div>
    <div class="border-2 rounded m-4 shadow bg-gray-100">
      <h4 class="p-4 pb-0">Add a Comment</h4>
      <div class="p-4">
        <form
          name="new-comment"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          @submit.prevent="addComment"
        >
          <input type="hidden" name="form-name" value="new-comment" />
          <input type="hidden" name="postTitle" :value="this.$page.post.title" />
          <input type="hidden" name="postPath" :value="this.$page.post.path" />
          <label>
            Name
            <input
              type="text"
              name="author"
              v-model="author"
              required
              :disabled="isCommentFormDisabled"
            />
          </label>
          <label>
            Email
            <input type="email" name="email" v-model="email" :disabled="isCommentFormDisabled" />
          </label>

          <label>
            Comment
            <textarea
              name="message"
              rows="5"
              v-model="message"
              required
              :disabled="isCommentFormDisabled"
            />
          </label>

          <div class="text-center">
            <button type="submit" class="w-1/3 md:w-1/4 lg:w-1/5" :disabled="isCommentFormDisabled">{{submitButtonText}}</button>
          </div>
          <VAlert
            class="success"
            v-model="accepted"
            transition="fade"
          >Your comment has been posted! It will appear after it is approved.</VAlert>
          <VAlert
            class="error"
            v-model="error"
            transition="fade"
          >An error occurred. Please try again.</VAlert>
        </form>
      </div>
    </div>
  </Layout>
</template>

<script>
import axios from "axios"
import moment from "moment"
import { VAlert } from "vuetensils"

export default {
  data() {
    return {
      botField: "",
      author: "",
      email: "",
      message: "",
      submitting: false,
      error: false,
      accepted: false,
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
    submitButtonText() {
      if (this.submitting) return "Submitting..."
      else if (this.accepted) return "Submitted!"
      else return "Submit"
    },
    isCommentFormDisabled() {
      return this.accepted || this.submitting
    },
  },
  methods: {
    formatDate(dateString) {
      return moment(dateString)
        .local()
        .format("MMMM DD, YYYY, h:mm a")
    },
    addComment() {
      this.submitting = true
      this.accepted = false
      this.error = false

      const formData = new FormData()
      formData.append("form-name", "new-comment")
      formData.append("author", this.author)
      formData.append("email", this.email)
      formData.append("message", this.message)
      formData.append("postTitle", this.$page.post.title)
      formData.append("postPath", this.$page.post.path)

      axios
        .post(this.$page.post.path, formData)
        .then(() => {
          this.submitting = false
          this.accepted = true
        })
        .catch(err => {
          this.submitting = false
          this.error = true
          console.error(err)
        })
    },
  },
  components: {
    VAlert,
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
  @apply py-2 px-3 bg-blue-500 text-white rounded;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    @apply bg-blue-700;
  }

  &[disabled] {
    @apply bg-blue-300;
  }
}

.success {
  @apply bg-green-200 p-2 rounded mt-4 text-center;
}

.error {
  @apply bg-red-200 p-2 rounded mt-4 text-center;
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
  allComment (order: ASC, filter: {postPath: {eq: $path}}) {
    edges {
      node {
        id
        author
        authorId
        date
        path
        content
      }
    }
  }
  allPost {
    edges {
      node {
        path
        title
        date(format: "MMMM DD, YYYY")
      }
    }
  }
}
</page-query>
