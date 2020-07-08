<template>
  <div id="top-bar" class="shadow-xl" :style="showMenu ? 'height: 500px' : 'height: 50px'">
    <div class="flex items-center">
      <div class="flex-grow">
        <g-image :src="$static.metadata.githubData.user.avatarUrl" class="avatar" />
        <h4 class="site-name">{{$static.metadata.githubData.user.name}}</h4>
      </div>
      <div class="flex-shrink px-3">
        <button class="btn menu-button" @click="showMenu = !showMenu">
          <v-icon name="bars" label="Menu" scale="2.5" />
        </button>
      </div>
    </div>
    <MenuContent class="my-8" />
  </div>
</template>

<script>
import "vue-awesome/icons/bars"

import MenuContent from "../MenuContent/MenuContent"

export default {
  data() {
    return {
      showMenu: false,
    }
  },
  components: {
    MenuContent,
  },
}
</script>

<style lang="postcss" scoped>
#top-bar {
  position: fixed;
  top: 0px;
  min-height: 50px;
  width: 100%;
  background: rgb(39, 41, 43);
  color: rgb(204, 204, 204);
  z-index: 100;
  transition: 0.5s;
  overflow: hidden;

  .menu-closed {
    max-height: 50px;
  }

  .menu-open {
    max-height: 500px;
  }

  .avatar {
    @apply inline rounded-full;
    width: 40px;
    margin-left: 5px;
    padding-top: 5px;
  }

  .site-name {
    @apply ml-4 inline relative;
    top: 5px;
  }

  .menu-button {
    @apply float-right;
    cursor: pointer;
  }
}
</style>

<static-query>
query {
  metadata {
    githubData {
      user {
        name
        avatarUrl
        bio
      }
    }
  }
}
</static-query>
