<template>
  <div class="blog-post flex justify-center items-center flex-col">
    <div
      class="bg-white dark:bg-gray-800 dark:text-gray-200 p-5 shadow-md my-5 transition duration-100"
    >
      <div class="post-title mt-6">
        <opti-image
          class="hero dark:bg-white"
          v-if="blog.image"
          :src="blog.image"
          :alt="blog.title"
        />
        <h1 class="title">{{ blog.title }}</h1>
        <div
          class="text-center pt-2 text-gray-600 dark:text-gray-500 transition duration-100"
        >
          Published by {{ blog.author }} on {{ date }}
        </div>
        <SocialLinks class="m-auto pt-3" />
      </div>
      <hr />
      <article class="py-8">
        <nuxt-content :document="blog"></nuxt-content>
      </article>
    </div>
    <div
      class="bg-gray-400 dark:bg-gray-800 dark:text-gray-200 p-6 m-4 w-full flex flex-col md:flex-row justify-between transition duration-100"
    >
      <div class="mb-4 w-full md:w-2/3 lg:w-1/2">
        <h2>Tags</h2>
        <TagPill v-for="tag in blog.tags" :key="tag">
          <nuxt-link :to="`/blog/?tag=${tag}`">{{ tag }}</nuxt-link>
        </TagPill>
      </div>
      <div class="w-full md:w-2/5 lg:w/1-3">
        <h2>Related Posts</h2>
        <ul>
          <li v-for="post in relatedPosts" :key="post.slug">
            <nuxt-link :to="post.link">{{ post.title }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="w-full h-16 flex justify-center items-center bg-gray-900 dark:bg-gray-800 text-white transition duration-100"
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
import Fuse from 'fuse.js'

dayjs.extend(utc)

export default {
  async asyncData({ $content, params, $devto }) {
    const blog = (
      await $content(`posts`)
        .where({ slug: '/' + params.slug })
        .fetch()
    )[0]

    const devToArticle = $devto.find((article) =>
      article.canonical_url.includes(`/blog/${params.slug}`)
    )

    const posts = await $content(`posts`).sortBy('date', 'desc').fetch()
    posts.forEach((post) => {
      post.plaintext = childrenToString(post.body.children)
    })

    const fuse = new Fuse(posts, {
      keys: ['title', 'snippet', 'tags', 'plaintext'],
    })

    const relatedPosts = fuse
      .search(`${blog.tags.reduce((str, tag) => str + ' ' + tag, '')}`)
      .map((f) => ({ ...f.item, link: `/blog${f.item.slug}` }))
      .filter((post, index) => post.slug !== `/${params.slug}` && index < 3)

    return {
      blog,
      devToArticle,
      relatedPosts,
    }
  },
  computed: {
    date() {
      return dayjs(this.blog.date).utc().format('MM/DD/YYYY')
    },
    updatedDate() {
      return dayjs(this.blog.updatedAt).format('MM/DD/YYYY')
    },
  },
  components: {
    TagPill,
    SocialLinks,
  },
}

const childrenToString = ([head, ...tail] = [], str = '') => {
  if (!head) return str

  const newStr = head.type === 'text' ? str + head.value : str

  if (head.children)
    return childrenToString(tail, childrenToString(head.children, newStr))
  else return childrenToString(tail, newStr)
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
    @apply p-6 bg-gray-100 shadow italic transition duration-100;

    .dark & {
      @apply bg-gray-900;
    }
  }

  pre[class*='language'] {
    @apply rounded shadow-md;
  }

  pre {
    width: auto !important;
    max-width: 90vw;
  }

  article {
    max-width: 1000px;
    width: 90vw;

    img {
      @apply m-auto w-2/3 shadow-md my-4;
    }
  }

  article a {
    @apply underline;
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
    @apply py-2 px-3 bg-lindsay text-white rounded;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      @apply bg-pink-700;
    }

    &[disabled] {
      @apply bg-pink-400;
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
