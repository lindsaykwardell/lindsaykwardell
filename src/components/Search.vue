<script setup lang="ts">
import Fuse from 'fuse.js'
import { ref, computed } from 'vue'
import BlogPostPreview from './BlogPostPreview.vue'

class Content {
  #media

  constructor(media) {
    this.#media = media
  }

  get toList() {
    return this.#media
  }

  get length() {
    return this.#media.length
  }

  get locations() {
    return this.#media
      .filter(
        (post, index) =>
          post.name &&
          this.#media.findIndex((e) => e.name === post.name) === index
      )
      .map((post) => post.name)
  }

  get byLocation() {
    return this.#media.reduce((shows, show) => {
      if (show.name) {
        if (!(show.name in shows)) {
          shows[show.name] = []
        }

        shows[show.name].push(show)
      }

      return shows
    }, {})
  }

  get podcasts() {
    return new Content(this.#media.filter((media) => media.type === 'podcast'))
  }

  get videos() {
    return new Content(this.#media.filter((media) => media.type === 'video'))
  }

  get meetups() {
    return new Content(this.#media.filter((media) => media.type === 'meetup'))
  }

  get blogs() {
    return new Content(this.#media.filter((media) => media.type === 'blog'))
  }

  get hosted() {
    return new Content(this.#media.filter((media) => media.host))
  }

  get guest() {
    return new Content(this.#media.filter((media) => !media.host))
  }

  search(query) {
    const results = new Fuse(this.#media, {
      keys: ['title', 'name', 'snippet', 'pubDate'],
    }).search(query)

    return new Content(results.map((results) => results.item))
  }
}

const props = defineProps({
  content: {
    type: Array,
    default: () => [],
  },
})

const allContent = new Content(props.content)
const filters = ref<string[]>([])
const query = ref<string>('')

function applyFilter(content, filters) {
  if (filters.length <= 0) {
    return content
  } else {
    return applyFilter(content[filters[0]], filters.slice(1))
  }
}

const visibleContent = computed(() => {
  if (query.value.length <= 0 && filters.value.length <= 0) {
    return allContent.toList
  }

  const filteredContent = applyFilter(allContent, filters.value)

  if (query.value.length > 0) {
    return filteredContent.search(query.value).toList
  } else {
    return filteredContent.toList
  }
})
</script>

<template>
  <div class="w-screen">
    <input
      type="text"
      aria-label="Search"
      placeholder="Functional programming, Vite, Nuxt, etc"
      class="block w-full lg:w-2/3 dark:bg-gray-800 dark:text-white p-1 shadow-md m-auto my-2"
      v-model="query"
    />
    <div class="flex justify-around gap-4 flex-wrap w-full lg:w-2/3 m-auto p-2">
      <label
        ><input
          type="checkbox"
          class="accent-red-600"
          value="podcasts"
          v-model="filters"
        />
        Podcasts
      </label>
      <label
        ><input
          type="checkbox"
          class="accent-red-600"
          value="videos"
          v-model="filters"
        />
        Videos
      </label>
      <label
        ><input
          type="checkbox"
          class="accent-red-600"
          value="meetups"
          v-model="filters"
        />
        Meetups
      </label>
      <label
        ><input
          type="checkbox"
          class="accent-red-600"
          value="blogs"
          v-model="filters"
        />
        Blog Posts
      </label>
      <label
        ><input
          type="checkbox"
          class="accent-red-600"
          value="hosted"
          v-model="filters"
        />
        Hosted
      </label>
      <label>
        <input
          type="checkbox"
          class="accent-red-600"
          value="guest"
          v-model="filters"
        />
        Guest
      </label>
    </div>
    <ul class="flex flex-col lg:flex-row flex-wrap pt-6">
      <li
        v-for="item in visibleContent"
        :key="item.url"
        class="w-full lg:w-1/2 xl:w-1/3 p-4"
      >
        <BlogPostPreview :item="item" />
      </li>
    </ul>
  </div>
</template>
