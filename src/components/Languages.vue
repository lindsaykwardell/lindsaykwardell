<script setup lang="ts">
defineProps<{ languages: string[] }>()

function langToImg(lang: string): string {
  switch (lang.toLowerCase()) {
    case 'css':
      return 'css3.png'
    case 'cypress':
      return 'cypress.png'
    case 'elm':
      return 'elm.png'
    case 'html':
      return 'html5.png'
    case 'javascript':
      return 'js.png'
    case 'node':
      return 'nodejs.png'
    case 'postcss':
      return 'postcss.png'
    case 'react':
      return 'react.svg'
    case 'tailwind':
      return 'tailwind.png'
    case 'typescript':
      return 'typescript.jpg'
    case 'vite':
      return 'vite.svg'
    case 'vue':
      return 'vue.png'
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <img
      v-for="lang in languages"
      :key="lang"
      :src="langToImg(lang)"
      :alt="lang"
      class="w-8 h-8 md:w-16 md:h-16"
    />
  </div>
</template>
