<template>
  <div>
    <div class="project-wrapper">
      <h1 class="text-center">Projects</h1>
      <p class="text-2xl text-center">
        Here are some of my open-source projects that I love.
      </p>
      <ContentList :content="pinnedProjects">
        <template #default="{ item }">
          <ContentItem :item="item">
            <template #title="{ defaultClasses }">
              <div class="flex">
                <h3 :class="defaultClasses">{{ item.title }}</h3>
                <div
                  class="flex-grow text-right hover:no-underline font-bold text-border text-xl pl-3"
                  :style="`color: ${item.primaryLanguage.color}`"
                >
                  {{ item.primaryLanguage.name }}
                </div>
              </div>
            </template>
          </ContentItem>
        </template>
      </ContentList>
    </div>
    <div
      class="w-full h-16 flex justify-center items-center bg-gray-900 dark:bg-gray-800 text-white transition duration-100"
    >
      <SocialLinks />
    </div>
  </div>
</template>

<script>
import ContentList from '@/components/ContentList'
import ContentItem from '@/components/ContentItem'
import SocialLinks from '@/components/SocialLinks'

export default {
  computed: {
    pinnedProjects() {
      return this.$github.user.pinnedItems.nodes.map((project) => ({
        ...project,
        link: project.url,
        title: project.name,
        excerpt: project.description,
      }))
    },
  },
  components: {
    ContentList,
    ContentItem,
    SocialLinks,
  },
}
</script>

<style lang="postcss">
/* .text-border {
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
} */
.project-wrapper {
  min-height: calc(100vh - 150px);
}
</style>
