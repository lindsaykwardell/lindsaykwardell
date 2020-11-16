<template>
  <div v-if="vov">
    <h1 class="text-center">{{ vov.title }}</h1>
    <p class="text-2xl text-center">{{ vov.description }}</p>

    <div class="flex flex-col justify-center items-center py-6">
      <label class="text-lg w-5/6 md:w-1/2">
        Search Episodes
        <input
          type="text"
          class="p-2 mt-3 text-lg w-full shadow rounded dark:bg-gray-700"
          v-model="search"
          aria-label="Search Episodes"
        />
      </label>
    </div>

    <ContentList :content="activeEpisodes">
      <template #title="{ title, defaultClasses }">
        <h4 :class="defaultClasses">{{ title }}</h4>
      </template>
    </ContentList>
    <client-only>
      <InfiniteLoading
        v-if="activeEpisodes.length > visible"
        @infinite="infiniteHandler"
      />
    </client-only>
    <div
      class="w-full h-16 flex justify-center items-center bg-gray-900 dark:bg-gray-800 text-white"
    >
      <SocialLinks />
    </div>
  </div>
</template>

<script>
import ContentList from '@/components/ContentList'
import InfiniteLoading from 'vue-infinite-loading'
import SocialLinks from '@/components/SocialLinks'
import Fuse from 'fuse.js'

export default {
  asyncData(context) {
    return {
      resVov: context.$vov,
    }
  },
  data: () => ({
    search: '',
    visible: 11,
    fuse: null,
    searchedEpisodes: [],
  }),
  computed: {
    vov() {
      return this.$store.state.vov
    },
    episodes() {
      return this.vov.items.map((episode) => ({
        ...episode,
        image: this.vov.image.url,
        excerpt: episode.contentSnippet.split('\n')[0],
      }))
    },
    activeEpisodes() {
      return this.searchedEpisodes.filter(
        (episode, index) => index <= this.visible
      )
    },
  },
  methods: {
    infiniteHandler($state) {
      if (this.episodes.length > this.visible) {
        this.visible += 3
        $state.loaded()
      } else {
        $state.complete()
      }
    },
  },
  watch: {
    search() {
      clearTimeout(this.debounceSearch)

      if (!this.search.length) this.searchedEpisodes = this.episodes
      else
        this.debounceSearch = setTimeout(() => {
          this.searchedEpisodes = this.fuse
            .search(this.search)
            .map((s) => ({ ...s.item }))
        }, 1000)
    },
  },
  mounted() {
    this.$store.dispatch('updateVov', this.resVov)
    this.fuse = new Fuse(this.episodes, {
      keys: ['title', 'contentSnippet'],
    })
    this.searchedEpisodes = this.episodes
  },
  components: {
    ContentList,
    InfiniteLoading,
    SocialLinks,
  },
}
</script>

<style lang="postcss">
.podcast-item {
  height: auto !important;

  &:hover {
    .podcast-image {
      transform: none !important;
    }
  }
}

.podcast-title {
  position: relative !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
</style>
