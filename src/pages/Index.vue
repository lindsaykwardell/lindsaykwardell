<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image alt="Example image" src="~/favicon.png" width="135" />

    <h1>Hello, world!</h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
      excepturi labore tempore expedita, et iste tenetur suscipit explicabo!
      Dolores, aperiam non officia eos quod asperiores
    </p>

    <p class="home-links">
      <a href="https://gridsome.org/docs/" target="_blank" rel="noopener"
        >Gridsome Docs</a
      >
      <a
        href="https://github.com/gridsome/gridsome"
        target="_blank"
        rel="noopener"
        >GitHub</a
      >
    </p>

    <input
      id="search"
      v-model="searchTerm"
      class="input"
      type="text"
      placeholder="Search"
    />

    <div v-for="result in searchResults" :key="result.id">
      <g-link :to="result.path" class="navbar-item">
        {{ result.title }}
      </g-link>
      <p>By {{ result.author }} {{ generateExcerpt(result.content, 300) }}</p>
    </div>
  </Layout>
</template>

<script>
import Search from "gridsome-plugin-flexsearch/SearchMixin";

export default {
  mixins: [Search],
  metaInfo: {
    title: "Hello, world!"
  },
  methods: {
    generateExcerpt(textToStrip, length) {
      let regex = /(<([^>]+)>)/gi;
      return textToStrip.replace(regex, "").slice(0, length);
    }
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
