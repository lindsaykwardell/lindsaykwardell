<template>
  <div>
    <VResize>
      <template #default="{ width }">
        <div v-if="width <= 750" class="pb-10">
          <TopBar />
        </div>
        <div class="flex">
          <div class="md:w-1/3 lg:w-1/4 xl:w-1/5">
            <LeftBar v-if="width > 750" />
          </div>
          <div class="body w-full md:w-2/3 lg:w-3/4 xl:w-4/5">
            <div class="container">
              <main class="bg-white my-5 p-2">
                <slot />
              </main>
            </div>
            <ConvertKit class="mb-12" />
          </div>
        </div>
      </template>
    </VResize>
  </div>
</template>

<script>
import { VResize } from "vuetensils"
import LeftBar from "../components/LeftBar/LeftBar"
import TopBar from "../components/TopBar/TopBar"
import ConvertKit from "~/components/ConvertKit/ConvertKit"

export default {
  components: {
    LeftBar,
    TopBar,
    VResize,
    ConvertKit,
  },
}
</script>

<style lang="postcss" scoped>
.body {
  background: rgb(240, 241, 242);
}

.container {
  @apply mx-auto px-2;
  max-width: 1000px;
  margin-bottom: 70px;
}
</style>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
