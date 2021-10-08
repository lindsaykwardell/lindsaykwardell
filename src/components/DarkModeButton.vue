<template>
  <button
    class="
      fixed
      fab
      rounded-full
      bg-gray-900
      dark:bg-gray-800
      text-yellow-400
      shadow-xl
      border-4 border-gray-200
      dark:border-gray-900
      w-16
      h-16
      text-3xl
      hover:text-4xl
      z-20
      transition
      duration-100
    "
    @click="toggleDarkMode"
  >
    {{ isDark ? "🌙" : "☀️" }}
  </button>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isDark: localStorage.getItem("darkMode") === "true",
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark;
    },
  },
  watch: {
    isDark: {
      immediate: true,
      handler() {
        localStorage.setItem("darkMode", this.isDark);
        const html = document.querySelector("html");

        if (this.isDark) {
          html.classList.add("dark");
        } else {
          html.classList.remove("dark");
        }
      },
    },
  },
  mounted() {
    const prev = localStorage.getItem("darkMode");

    if (prev !== undefined) {
      this.isDark = prev === "true";
    } else {
      this.isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  },
};
</script>
