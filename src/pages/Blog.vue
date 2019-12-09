<template>
  <Layout>
    <div>
      <h1 class="text-center">All Posts</h1>
      <div
        v-for="({node}) in $page.allPost.edges"
        :key="node.id"
        class="p-2 rounded shadow-md bg-white mb-6 mx-2"
      >
        <g-link :to="node.path">
          <h2>{{node.title}}</h2>
        </g-link>
        <label>{{node.date}}</label>
        <div v-html="excerpt(node.content)"></div>
      </div>
    </div>
    <Pager :info="$page.allPost.pageInfo" class="pagination-container" linkClass="pagination-elem" />
  </Layout>
</template>

<script>
import { Pager } from "gridsome"

export default {
  methods: {
    excerpt(content) {
      var longText = content.length > 300 ? "..." : ""
      return content.substring(0, 300) + longText
    },
  },
  components: {
    Pager,
  },
}
</script>

<page-query>
query($page: Int) {
  allPost(perPage: 5, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        path
        title
        date(format: "MMMM DD, YYYY")
        excerpt
        content
      }
    }
  }
}
</page-query>