<template>
  <div class="flex flex-col lg:flex-row flex-wrap">
    <div
      v-for="item in content"
      :key="item.link"
      class="w-full lg:w-1/2 xl:w-1/3 p-4"
    >
      <slot :item="item">
        <ContentItem :item="item">
          <template #title="{ title, item, defaultClasses }">
            <slot
              name="title"
              :title="title"
              :item="item"
              :defaultClasses="defaultClasses"
            />
          </template>
          <template #image="{ image, item, wrapperClass, defaultClasses }">
            <slot
              name="image"
              :image="image"
              :item="item"
              :wrapperClass="wrapperClass"
              :defaultClasses="defaultClasses"
            />
          </template>
          <template #tags="{ item, tags }">
            <slot name="tags" :item="item" :tags="tags" />
          </template>
          <template #excerpt="{ item, excerpt, defaultClasses }">
            <slot
              name="excerpt"
              :item="item"
              :excerpt="excerpt"
              :defaultClasses="defaultClasses"
            />
          </template>
        </ContentItem>
      </slot>
    </div>
  </div>
</template>

<script>
import ContentItem from '@/components/ContentItem'
import TagPill from '@/components/TagPill'

export default {
  props: {
    content: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ContentItem,
    TagPill,
  },
}
</script>

<style lang="postcss" scoped></style>
