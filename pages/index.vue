<template>
  <div class="index-wrapper">
    <div class="flex flex-wrap justify-between w-full mb-24">
      <div class="w-full xl:w-1/2 flex flex-col items-center">
        <opti-image
          :src="$github.user.avatarUrl"
          :alt="$github.user.name"
          class="rounded-full shadow-xl w-64 my-4"
        />
        <h1 class="title text-6xl py-3 font-medium">
          {{ $github.user.name }}
        </h1>
        <h2 class="text-3xl lg:text-4xl leading-9 font-medium py-4">
          {{ $github.user.bio }}
        </h2>
        <div class="flex w-full pt-4">
          <div
            class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
          >
            <opti-image
              class="tech-logo"
              src="~/assets/images/vue.png"
              width="100"
              alt="Vue"
            />
          </div>
          <div
            class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
          >
            <opti-image
              class="tech-logo"
              src="~/assets/images/tailwind.png"
              width="100"
              alt="Tailwind CSS"
            />
          </div>
          <div
            class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
          >
            <opti-image
              class="tech-logo"
              src="~/assets/images/typescript.jpg"
              width="100"
              alt="Typescript"
            />
          </div>
          <div
            class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
          >
            <opti-image
              class="tech-logo"
              src="~/assets/images/nodejs.png"
              width="100"
              alt="NodeJS"
            />
          </div>
          <div
            class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
          >
            <opti-image
              class="tech-logo"
              src="~/assets/images/aplus.png"
              width="100"
              alt="CompTIA A+ Certified"
            />
          </div>
        </div>
      </div>
      <div
        class="w-full xl:w-1/3 pt-6 xl:pt-0 flex flex-col items-center justify-end"
      >
        <h2>Latest Post</h2>
        <ContentItem
          v-for="item in formattedPosts"
          :key="item.slug"
          :item="item"
        />
      </div>
    </div>
    <div
      class="fixed bottom-0 w-full h-16 flex justify-center items-center bg-gray-900 dark:bg-gray-800 text-white transition duration-100"
    >
      <SocialLinks />
    </div>
  </div>
</template>

<script>
import SocialLinks from '@/components/SocialLinks'
import ContentItem from '@/components/ContentItem'

export default {
  async asyncData({ $content }) {
    const posts = await $content(`posts`)
      .sortBy('date', 'desc')
      .limit(1)
      .fetch()

    return {
      posts,
    }
  },
  computed: {
    formattedPosts() {
      return this.posts.map((post) => ({
        ...post,
        link: `/blog${post.slug}`,
        image: post.image || this.$github.user.avatarUrl,
      }))
    },
  },
  components: {
    SocialLinks,
    ContentItem,
  },
}
</script>

<style lang="postcss" scoped>
.index-wrapper {
  @apply relative w-full flex justify-center items-center text-center px-8;
  /* margin: 0 auto; */
  min-height: calc(100vh - 110px);
}

.tech-logo {
  @apply transition duration-200;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
