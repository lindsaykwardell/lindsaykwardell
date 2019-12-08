<template>
  <div>
    <!-- <LeftBar /> -->
    <!-- <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
      </nav>
    </header> -->
    <VResize>
      <template #default="{ width }">
        <hstack>
          <div class="md:w-1/3 lg:w-1/4 xl:w-1/5">
            <LeftBar v-if="width > 768" />
          </div>
          <vstack class="w-full md:w-2/3 lg:w-3/4 xl:w-4/5">
            <main class="bg-white my-5 p-2">
              <slot/>
            </main>
          </vstack>
        </hstack>
      </template>
    </VResize>
  </div>
</template>

<script>
import { VResize } from "vuetensils"
import LeftBar from "../components/LeftBar/LeftBar"

export default {
  components: {
    LeftBar,
    VResize
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
