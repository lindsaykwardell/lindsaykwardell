<template>
  <div class="layout">
    <!-- <LeftBar /> -->
    <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
      </nav>
    </header>
    <main class="bg-white my-5 p-2">
      <slot/>
    </main>
  </div>
</template>

<script>
import LeftBar from "../components/LeftBar"

export default {
  components: {
    LeftBar
  }
}
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
body {
  background: rgb(240, 241, 242);
}

.nav__link {
  margin-left: 20px;
}
</style>
