<template>
  <div class="relative">
    <nav
      class="bg-pink-900 w-full h-20 flex items-center px-6 shadow-md fixed z-10"
    >
      <nuxt-link to="/" class="flex items-center hover:no-underline">
        <img
          :src="$github.user.avatarUrl"
          class="w-16 h-16 rounded-full"
          alt="Lindsay Wardell"
        />
        <h3 class="text-white pl-3 hidden md:block">Lindsay Wardell</h3>
      </nuxt-link>
      <div class="flex-grow flex justify-end text-white text-lg">
        <nuxt-link to="/" class="mx-4 hidden sm:inline">Home</nuxt-link>
        <nuxt-link to="/about-me" class="mx-4 hide-too-small whitespace-nowrap"
          >About <span class="hidden sm:inline">Me</span></nuxt-link
        >
        <nuxt-link to="/blog/" class="mx-4">Blog</nuxt-link>
        <nuxt-link to="/podcast" class="mx-4">Podcast</nuxt-link>
      </div>
    </nav>
    <main>
      <Nuxt />
    </main>
    <button
      @click="changeMode"
      class="fixed fab rounded-full bg-gray-900 dark:bg-gray-800 text-yellow-400 shadow-xl border-4 border-gray-200 dark:border-gray-900 w-16 h-16 text-xl hover:text-2xl z-20 transition duration-100"
    >
      <font-awesome-icon :icon="isDark ? ['fa', 'sun'] : ['fa', 'moon']" />
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    isDark() {
      return this.$colorMode.preference === 'dark'
    },
  },
  methods: {
    changeMode() {
      this.$colorMode.preference =
        this.$colorMode.preference === 'light' ? 'dark' : 'light'
    },
  },
}
</script>

<style lang="postcss">
body {
  @apply bg-gray-200 transition duration-100;
  font-family: 'Fira Sans', sans-serif;
}

.dark body {
  @apply bg-gray-900 text-gray-200;
}

main {
  @apply pt-4;
  position: relative;
  top: 70px;
}

p {
  @apply py-2;
}

h1,
h2,
h3,
h4,
h5,
h6,
footer {
  font-family: 'Rokkitt', serif;
}

h1 {
  font-size: 3.25rem;
}

h2 {
  font-size: 2.5rem;
}

h3 {
  font-size: 2rem;
}

h4 {
  font-size: 1.5rem;
}

.title {
  line-height: 3.5rem;
}

label,
a.recent-post {
  font-family: 'Fira Sans', sans-serif;
}

a:hover {
  text-decoration: underline;
}

hr {
  @apply border-0 mx-auto my-4;
  background-color: rgb(68, 68, 68);
  height: 1px;
  width: 80%;
}

.fab {
  bottom: 15px;
  right: 15px;

  @media (max-width: 640px) {
    & {
      bottom: 5px;
      right: 5px;
    }
  }
}

@media (max-width: 370px) {
  .hide-too-small {
    display: none;
  }
}
</style>
