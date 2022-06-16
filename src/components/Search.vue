<script setup lang="ts">
import { ref, computed } from 'vue'
import { Content } from '../api/Content.mjs'
import BlogPostPreview from './BlogPostPreview.vue'

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
    const [first, second, third, fourth] = allContent.toList

    return [second, third, fourth]
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
  <div
    class="w-full md:w-4/5 xl:w-[1400px] m-auto bg-gray-200 dark:bg-gray-700 p-4 rounded shadow"
  >
    <h2 class="text-4xl">All Content</h2>
    <input
      type="text"
      aria-label="Search"
      placeholder="Functional programming, Vite, Nuxt, etc"
      class="block w-full lg:w-2/3 dark:bg-gray-800 dark:text-white p-1 shadow-md m-auto my-2"
      v-model="query"
    />
    <div class="flex justify-between flex-wrap w-full lg:w-2/3 m-auto">
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
    <ul class="flex flex-col lg:flex-row flex-wrap">
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
