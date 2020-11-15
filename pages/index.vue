<template>
  <div class="container">
    <div class="flex flex-col items-center">
      <img
        :src="$github.user.avatarUrl"
        :alt="$github.user.name"
        class="rounded-full shadow-xl w-64 lg:w-auto my-4"
      />
      <h1 class="title text-6xl py-3 font-medium">
        {{ $github.user.name }}
      </h1>
      <h2 class="text-3xl lg:text-4xl leading-9 font-medium py-4">
        {{ $github.user.bio }}
      </h2>
      <div class="flex w-full pt-12">
        <div
          class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
        >
          <img
            class="tech-logo"
            src="~/assets/images/vue.png"
            width="100"
            alt="Vue"
          />
        </div>
        <div
          class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
        >
          <img
            class="tech-logo"
            src="~/assets/images/tailwind.png"
            width="100"
            alt="Tailwind CSS"
          />
        </div>
        <div
          class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
        >
          <img
            class="tech-logo"
            src="~/assets/images/typescript.jpg"
            width="100"
            alt="Typescript"
          />
        </div>
        <div
          class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
        >
          <img
            class="tech-logo"
            src="~/assets/images/nodejs.png"
            width="100"
            alt="NodeJS"
          />
        </div>
        <div
          class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
        >
          <img
            class="tech-logo"
            src="~/assets/images/aplus.png"
            width="100"
            alt="CompTIA A+ Certified"
          />
        </div>
      </div>
    </div>
    <div
      class="fixed bottom-0 w-full h-16 flex justify-center items-center bg-gray-900 text-white"
    >
      <SocialLinks />
    </div>
  </div>
</template>

<script>
import SocialLinks from '@/components/SocialLinks'

export default {
  components: {
    SocialLinks,
  },
}
</script>

<style lang="postcss" scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  position: relative;
  margin: 0 auto;
  min-height: calc(100vh - 110px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  line-height: 3.5rem;
}

.tech-logo {
  @apply transition duration-200;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
