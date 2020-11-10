<template>
  <Layout>
    <div class="clearfix index">
      <div class="flex flex-col">
        <div>
          <h1 class="leading-none mt-6 ml-2 text-center">
            Hi, I'm Lindsay Wardell
          </h1>
          <div class="p-2">
            <g-image src="~/images/lindsay-3.jpg" width="550" class="hero" />
          </div>
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
          <div class="flex">
            <div
              class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
            >
              <g-image class="tech-logo" src="~/images/vue.png" width="100" />
            </div>
            <div
              class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
            >
              <g-image
                class="tech-logo"
                src="~/images/postcss.png"
                width="100"
              />
            </div>
            <div
              class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
            >
              <g-image
                class="tech-logo"
                src="~/images/typescript.jpg"
                width="100"
              />
            </div>
            <div
              class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
            >
              <g-image
                class="tech-logo"
                src="~/images/nodejs.png"
                width="100"
              />
            </div>
            <div
              class="flex-1 flex justify-center items-center p-2 tech-logo-wrapper"
            >
              <g-image
                class="tech-logo"
                src="~/images/postgres.png"
                width="100"
              />
            </div>
          </div>
        </div>
      </div>
      <hr class="my-16 mx-auto" />
      <h2 class="text-center">Recent Posts</h2>
      <div class="flex flex-col lg:flex-row flex-wrap">
        <div
          v-for="{ node } in $page.allPost.edges"
          :key="node.id"
          class="w-full lg:w-1/2 p-2"
        >
          <div class="blog-item">
            <g-link :to="node.path">
              <g-image class="blog-image" v-if="node.image" :src="node.image" />
              <h4 class="blog-title">{{ node.title }}</h4>
              <p class="blog-excerpt">{{ node.excerpt.substring(0, 150) }}...</p>
            </g-link>
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
            class="p-2 w-full lg:w-1/2"
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
    </div>
  </Layout>
</template>

<style lang="postcss" scoped>
.hero {
  @apply shadow-lg mx-auto block rounded-lg;
}

.index {
  /* background-image: linear-gradient(
      to bottom right,
      #dbe8f5 2%,
      15%,
      rgba(255, 255, 255, 0) 30%
    ),
    linear-gradient(to bottom left, #f2edf7 1%, 7%, white 30%); */
}

.blog-item {
  @apply shadow-md rounded-lg relative overflow-hidden;
  height: 315px;

  .blog-image {
    @apply transition duration-500;
  }

  &:hover {
    .blog-image {
      transform: scale(1.1);
    }
  }
}

.blog-title {
  @apply p-2 rounded shadow;
  position: absolute;
  top: 10px;
  right: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
}

.blog-excerpt {
  @apply p-2 rounded shadow;
  /* white-space: pre; */
  position: absolute;
  bottom: 10px;
  left: 5%;
  width: 90%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
}

/* .tech-logo-wrapper {
  &:hover ~ & {
    filter: grayscale(100%);
  }
} */

.tech-logo {
  @apply transition duration-200;

  &:hover {
    transform: scale(1.1);
  }
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
  allPost(limit:4){
    edges {
      node {
        id
        title
        image
        excerpt
        path
      }
    }
  }
}
</page-query>
