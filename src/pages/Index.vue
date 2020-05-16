<template>
  <Layout>
    <div class="clearfix index">
      <div class="flex flex-col">
        <div>
          <h1 class="leading-none mt-6 ml-2 text-center">
            Hi, I'm Lindsay Wardell
          </h1>
          <g-image src="~/images/lindsay-3.jpg" width="550" class="hero" />
          <h3 class="mt-8 text-center">
            I'm a software developer and IT professional
          </h3>
        </div>
      </div>
      <h4 class="my-6 text-xl md:text-2xl w-4/5 m-auto">
        Helping people get the most out of technology is my passion. I build web
        applications and IT solutions to help people get things done.
      </h4>
      <hr class="my-16 mx-auto" />
      <div>
        <div class="my-32">
          <h2 class="text-center mb-5">Technologies I Love</h2>
          <div class="md:flex">
            <div class="flex-1 flex justify-center items-center">
              <g-image src="~/images/vue.png" width="100" />
            </div>
            <div class="flex-1 flex justify-center items-center">
              <g-image src="~/images/postcss.png" width="100" />
            </div>
            <div class="flex-1 flex justify-center items-center">
              <g-image src="~/images/typescript.jpg" width="100" />
            </div>
            <div class="flex-1 flex justify-center items-center">
              <g-image src="~/images/nodejs.png" width="100" />
            </div>
            <div class="flex-1 flex justify-center items-center">
              <g-image src="~/images/postgres.png" width="100" />
            </div>
          </div>
        </div>
      </div>
      <hr class="my-16 mx-auto" />
      <div>
        <div class="my-32">
          <h2 class="text-center mb-5">Examples</h2>
          <div class="md:flex">
            <div class="home-card w-full m-auto my-6 md:my-0 md:flex-1 p-2">
              <a href="https://warsofthejuriels.netlify.app">
                <g-image src="~/images/juralen.png" width="400" />
              </a>
            </div>
            <div class="home-card w-full m-auto my-6 md:my-0 md:flex-1 p-2">
              <a href="https://noadjustmentsneeded.com">
                <g-image src="~/images/nan.png" width="400" />
              </a>
            </div>
            <div class="home-card w-full m-auto my-6 md:my-0 md:flex-1 p-2">
              <a href="https://maryspixels.herokuapp.com">
                <g-image src="~/images/marys-pixels.jpg" width="400" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-16 mx-auto" />
      <div>
        <h2 class="text-center">Current Projects</h2>
        <div class="flex flex-wrap">
          <div
            v-for="(node, index) in $page.metadata.githubData.user.repositories
              .nodes"
            :key="index"
            class="p-2 w-full md:w-1/2"
          >
            <div
              class="p-2 rounded shadow-md bg-white"
              :style="`border: 2px solid ${node.primaryLanguage.color}; min-height: 200px`"
            >
              <span class="md:float-right">{{
                node.licenseInfo ? node.licenseInfo.name : ""
              }}</span>
              <h4 class="underline mb-3">
                <a :href="node.url" target="_blank">{{ node.name }}</a>
              </h4>
              <span class="italic font-bold">{{
                node.primaryLanguage.name
              }}</span>
              <p class="p-5">{{ node.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <Mailchimp /> -->
    </div>
  </Layout>
</template>

<script>
import Mailchimp from '~/components/Mailchimp/Mailchimp'

export default {
  components: {
    Mailchimp
  }
}
</script>

<style lang="postcss" scoped>
.hero {
  @apply shadow-lg mx-auto block rounded-lg;
}

.index {
  background-image: linear-gradient(
      to bottom right,
      #cfe4f8 2%,
      15%,
      rgba(255, 255, 255, 0) 30%
    ),
    linear-gradient(to bottom left, #f2edf7 1%, 7%, white 30%);
}
</style>

<page-query>
query {
  metadata {
    githubData {
      user {
        name
        avatarUrl
        bio
        repositories {
          nodes {
            description
            name
            url
            licenseInfo {
              name
            }
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
}
</page-query>
