<template>
  <div class="blog-item bg-white dark:bg-gray-800 transition duration-100">
    <component
      :is="item.link.includes('http') ? 'a' : 'nuxt-link'"
      :href="item.link"
      :to="item.link"
      class="hover:no-underline w-full"
    >
      <slot
        name="image"
        :image="item.image"
        :item="item"
        :wrapperClass="'blog-image-wrapper'"
        :defaultClasses="'blog-image'"
      >
        <div v-if="item.image" class="blog-image-wrapper">
          <img class="blog-image dark:bg-white  transition duration-100" :src="item.image" :alt="item.title" />
        </div>
      </slot>
      <div class="p-3">
        <slot
          name="title"
          :title="item.title"
          :item="item"
          :defaultClasses="'blog-title leading-8 pb-4 hover:underline'"
        >
          <h3 class="blog-title leading-8 pb-4">{{ item.title }}</h3>
        </slot>
        <slot name="tags" :item="item" :tags="item.tags">
          <div class="hidden md:block">
            <TagPill v-for="tag in item.tags" :key="tag">{{ tag }}</TagPill>
          </div>
        </slot>
        <slot
          name="excerpt"
          :excerpt="item.excerpt"
          :item="item"
          :defaultClasses="'blog-excerpt text-gray-600 dark:text-gray-500 transition duration-100'"
        >
          <p class="blog-excerpt text-gray-600 dark:text-gray-500 transition duration-100">{{ item.excerpt }}</p>
        </slot>
      </div>
    </component>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="postcss" scoped>
.blog-item {
  @apply shadow-md rounded-lg relative overflow-hidden flex justify-center;
  /* height: 415px; */
  animation: 0.3s ease-out 0s 1 shift;

  .blog-image {
    @apply transition duration-500;
    height: 300px;
    width: 100%;
    object-fit: cover;
    /* filter: blur(3px); */
  }

  &:hover {
    .blog-title {
      @apply underline;
    }
    
    .blog-image {
      transform: scale(1.1);
      filter: blur(0);
    }
  }
}

.blog-image-wrapper {
  height: 300px;
  width: 100%;
  overflow: hidden;
}

@keyframes shift {
  0% {
    transform: translateY(30%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* .blog-title {
  @apply p-2 rounded shadow absolute bg-black text-white w-full top-0 right-0;
}

.blog-excerpt {
  @apply p-3 rounded shadow absolute bottom-0 left-0 w-full bg-black text-white text-lg;
  min-height: 6rem;
} */
</style>
