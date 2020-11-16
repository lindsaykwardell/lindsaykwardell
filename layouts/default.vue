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
        <h3 class="text-white pl-3 hidden sm:block">Lindsay Wardell</h3>
      </nuxt-link>
      <div class="flex-grow flex justify-end text-white text-lg">
        <nuxt-link to="/" class="mx-4 hidden sm:inline">Home</nuxt-link>
        <nuxt-link to="/projects" class="mx-4">Projects</nuxt-link>
        <nuxt-link to="/blog/" class="mx-4">Blog</nuxt-link>
        <nuxt-link to="/podcast" class="mx-4">Podcast</nuxt-link>
      </div>
    </nav>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<style lang="postcss">
body {
  @apply bg-gray-200;
  font-family: 'Fira Sans', sans-serif;
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
</style>
