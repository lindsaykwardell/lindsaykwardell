<template>
  <div class="blog-post flex justify-center items-center flex-col">
    <div class="bg-white p-5 shadow-md my-5">
      <div class="post-title mt-6">
        <img
          class="hero"
          v-if="blog.image"
          :src="blog.image"
          :alt="blog.title"
        />
        <h1>{{ blog.title }}</h1>
        <div class="text-center pt-2 text-gray-600">
          Published by {{ blog.author }} on {{ date }}
        </div>
        <SocialLinks class="m-auto pt-3" />
      </div>
      <hr />
      <article class="py-8">
        <nuxt-content :document="blog"></nuxt-content>
      </article>
    </div>
    <div class="bg-gray-400 p-6 m-4 w-full">
      <div class="mb-4">
        <h2>Tags</h2>
        <TagPill v-for="tag in blog.tags" :key="tag">
          <nuxt-link :to="`/blog/?tag=${tag}`">{{ tag }}</nuxt-link>
        </TagPill>
      </div>
    </div>
    <section class="comments">
      <div
        v-for="comment in comments"
        :key="comment.slug"
        class="flex my-4 p-2 shadow-md rounded bg-white"
      >
        <div class="px-3 border-r w-32 flex-none hidden md:block">
          <img
            :src="`https://www.gravatar.com/avatar/${comment.authorId}`"
            class="h-20 w-20 rounded-full"
          />
        </div>
        <div class="flex-grow">
          <div class="border-b pl-4 pb-2 flex">
            <div class="flex-1 font-bold">{{ comment.author }}</div>
            <div class="flex-1 text-right text-gray-600">
              {{ formatCommentDate(comment.date) }}
            </div>
          </div>
          <div class="pl-2">
            <nuxt-content :document="comment" />
          </div>
        </div>
      </div>
      <div class="rounded my-8 shadow-md bg-white w-5/6 m-auto">
        <h4 class="p-4 pb-0">Add a Comment</h4>
        <div class="p-4 w-full">
          <form
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            name="new-comment"
            class="hidden"
          >
            <input type="hidden" name="form-name" />
            <input type="hidden" name="postTitle" />
            <input type="hidden" name="postPath" />
            <input type="hidden" name="author" />
            <input type="hidden" name="email" />
            <input type="hidden" name="message" />
          </form>
          <FormulateForm
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            @submit="submitComment"
          >
            <FormulateInput
              type="hidden"
              name="form-name"
              value="new-comment"
            />
            <FormulateInput
              type="hidden"
              name="postTitle"
              :value="blog.title"
            />
            <FormulateInput
              type="hidden"
              name="postPath"
              :value="`/blog${blog.slug}`"
            />
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
                class="text-white rounded-lg transition duration-200 mt-5 w-1/3 md:w-1/4 lg:w-1/5 text-center"
                input-class="px-4 py-2 w-full"
                :disabled="submitted"
              >
                <div class="flex justify-center">
                  <svg
                    v-if="showSpinner"
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submit
                </div>
              </FormulateInput>
            </div>
            <VAlert class="success" v-model="accepted" transition="fade"
              >Your comment has been posted! It will appear after it is
              approved.</VAlert
            >
            <VAlert class="error" v-model="error" transition="fade"
              >An error occurred. Please try again.</VAlert
            >
          </FormulateForm>
        </div>
      </div>
    </section>
    <div
      class="w-full h-16 flex justify-center items-center bg-gray-900 text-white"
    >
      <SocialLinks />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import TagPill from '@/components/TagPill'
import SocialLinks from '@/components/SocialLinks'
import axios from 'axios'
import VAlert from 'vuetensils/src/components/VAlert/VAlert.vue'

dayjs.extend(utc)

const STATUS_IDLE = Symbol()
const STATUS_WAITING = Symbol()
const STATUS_SUBMITTED = Symbol()
const STATUS_ERROR = Symbol()

export default {
  async asyncData({ $content, params }) {
    const blog = (
      await $content(`posts`)
        .where({ slug: '/' + params.slug })
        .fetch()
    )[0]

    const comments = await $content('comments')
      .where({
        postPath: `/blog/${params.slug}/`,
      })
      .fetch()

    return {
      blog,
      comments,
    }
  },
  data: () => ({
    formStatus: STATUS_IDLE,
    accepted: false,
    error: false,
  }),
  computed: {
    date() {
      return dayjs(this.blog.date).utc().format('MM/DD/YYYY')
    },
    updatedDate() {
      return dayjs(this.blog.updatedAt).format('MM/DD/YYYY')
    },
    submitted() {
      return this.formStatus !== STATUS_IDLE && this.formStatus !== STATUS_ERROR
    },
    hasError() {
      return this.formStatus === STATUS_ERROR
    },
    hasSuccess() {
      return this.formStatus === STATUS_SUBMITTED
    },
    showSpinner() {
      return this.formStatus === STATUS_WAITING
    },
  },
  methods: {
    formatCommentDate(date) {
      return dayjs(date).local().format('MMMM DD, YYYY, h:mm a')
    },
    async submitComment(data) {
      console.log(data)
      const formData = new FormData()
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
      this.formStatus = STATUS_WAITING
      try {
        await axios.post('', formData)
        this.formStatus = STATUS_SUBMITTED
        this.accepted = true
      } catch (err) {
        this.formStatus = STATUS_ERROR
        this.error = true
      }
    },
  },
  components: {
    TagPill,
    SocialLinks,
    VAlert,
  },
}
</script>

<style lang="postcss">
.blog-post {
  p {
    @apply text-lg py-3;
  }

  li {
    @apply ml-5;

    &:before {
      @apply mr-2;
      content: ' - ';
    }
  }

  .post-title {
    text-align: center;
  }
  .hero {
    max-height: 550px;
    max-width: 80vw;
    object-fit: contain;
    object-position: center;
    margin: 0 auto;
  }

  blockquote {
    @apply p-6 mx-16 bg-gray-100 shadow italic;
  }

  pre[class*='language'] {
    @apply rounded shadow-md;
  }

  pre {
    width: auto !important;
    max-width: 90vw;
  }

  article,
  section.comments {
    max-width: 1000px;
    width: 90vw;

    img {
      @apply m-auto w-2/3 shadow-md my-4;
    }

    a {
      @apply underline;
    }
  }

  .pill {
    @apply bg-gray-800 text-white shadow no-underline py-2 px-4 rounded-full m-1 font-bold select-none text-sm inline-block;
  }

  input,
  textarea {
    /* @apply p-2 my-3 border-2 rounded w-full text-lg; */
    resize: none;
  }

  button[type='submit'] {
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
}
</style>
