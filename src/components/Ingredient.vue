<script setup lang="ts">
import { ref } from 'vue'

const isDone = ref(false)

const toggleDone = () => {
  isDone.value = !isDone.value
}
</script>

<template>
  <li :class="{ done: isDone }">
    <label>
      <input type="checkbox" :checked="isDone" @click="toggleDone" />
      <slot />
    </label>
  </li>
</template>

<style scoped>
.done {
  text-decoration: line-through;
  font-style: italic;
}

input {
  width: 0px;
  height: 0px;
}

li {
  user-select: none;
}
</style>