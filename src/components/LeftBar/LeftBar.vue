<template>
  <nav id="left-nav">
    <div class="py-5">
      <img
        :src="$static.metadata.githubData.user.avatarUrl"
        class="mx-auto rounded-full"
        style="width: 40%"
      />
    </div>
    <div class="py-3">
      <h3>{{$static.metadata.githubData.user.name}}</h3>
      <label>Programmer and Writer</label>
    </div>
    <MenuContent />
  </nav>
</template>

<script>
import MenuContent from '../MenuContent/MenuContent'

export default {
  components: {
    MenuContent
  }
}
</script>

<style lang="postcss" scoped>
#left-nav {
  position: sticky;
  top: 0px;
  height: 100vh;
  background: rgb(39, 41, 43);
  color: rgb(204, 204, 204);
  text-align: center;
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
