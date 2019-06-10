import React from "react"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Pill from "../components/Pill/Pill"
import Row from "../components/Row/Row"
import Col from "../components/Col/Col"
import Layout from "../components/layout"
import naturalOrder from "natural-order"
// import '../css/blog-post.css'; // make it pretty!

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark: post, allMarkdownRemark } = data // data.markdownRemark holds our post data

  const posts = naturalOrder(allMarkdownRemark.edges, ["node.frontmatter.date"])

  const postIndex = posts.findIndex(
    ({ node }) => node.frontmatter.path === post.frontmatter.path
  )

  console.log(postIndex)

  const prevPost = postIndex > 0 ? posts[postIndex - 1].node : null
  const nextPost = posts[postIndex + 1] ? posts[postIndex + 1].node : null

  return (
    <Layout>
      <Helmet
        title={`${post.frontmatter.title} | ${data.site.siteMetadata.title}`}
      />
      <div>
        {post.frontmatter.image && (
          <Img
            sizes={post.frontmatter.image.childImageSharp.sizes}
            className="mx-auto"
            style={{ maxWidth: "900px" }}
          />
        )}
        <h1 className="text-center">{post.frontmatter.title}</h1>
        <div className="text-center pt-2">
          Published by {post.frontmatter.author} on {post.frontmatter.date}
        </div>
        <div
          className="pt-6 m-4"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="p-6">
          <h2>Tags</h2>
          {post.frontmatter.tags.map((tag, index) => (
            <Pill
              color="gray-800"
              size="md"
              className="m-1 font-bold"
              style={{ userSelect: "none", fontSize: "0.8rem" }}
              key={index}
            >
              {tag}
            </Pill>
          ))}
        </div>
        <Row>
          <Col className="text-left flex-1">
            {prevPost && (
              <>
                Previous:{" "}
                <Link to={prevPost.frontmatter.path} className="underline">
                  {prevPost.frontmatter.title}
                </Link>
              </>
            )}
          </Col>
          <Col className="text-right flex-1">
            {nextPost && (
              <>
                Next:{" "}
                <Link to={nextPost.frontmatter.path} className="underline">
                  {nextPost.frontmatter.title}
                </Link>
              </>
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        author
        tags
        image {
          childImageSharp {
            sizes(maxWidth: 900) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            title
            date
          }
        }
      }
    }
  }
`
