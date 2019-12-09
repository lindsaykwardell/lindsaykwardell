<template>
  <g-link :to="to" class="text-white font-light no-underline py-2 px-4 rounded block hover:underline w-full text-left">
    <slot />
  </g-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: "/"
    }
  }
}
</script>