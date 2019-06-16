import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/Card/Card"
import { graphql, Link } from "gatsby"
import Row from "../components/Row/Row"
import Col from "../components/Col/Col"
import Button from "../components/Button/Button"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface Props {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            excerpt: string
            frontmatter: {
              path: string
              title: string
              date: string
            }
          }
        }
      ]
    }
  }
}

const Blog = (props: Props) => {
  const [currentIndex, setIndex] = useState<number>(0)

  const pageCount = Math.ceil(props.data.allMarkdownRemark.edges.length / 5)

  return (
    <Layout>
      <SEO title="Blog" />
      <h1 className="text-center">All Posts</h1>
      {props.data.allMarkdownRemark.edges
        .filter(
          (edge, index) => index >= currentIndex && index <= currentIndex + 4
        )
        .map(({ node }, index) => (
          <Card key={index} className="mb-6 mx-2">
            <Link to={node.frontmatter.path}>
              <h2>{node.frontmatter.title}</h2>
            </Link>
            <label>{node.frontmatter.date}</label>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </Card>
        ))}
      <Row>
        <Col>
          <Button
            disabled={currentIndex === 0}
            onClick={() =>
              currentIndex > 0 ? setIndex(currentIndex - 5) : null
            }
          >
            <FaChevronLeft />
          </Button>
        </Col>
        <Col className="flex-1 text-center">
          Page {Math.ceil((currentIndex + 1) / 5)} of {pageCount}
        </Col>
        <Col className="flex-1 text-right">
          <Button
            disabled={((currentIndex + 10) / 5) > pageCount}
            onClick={() => {
              ((currentIndex + 10) / 5) <= pageCount
                ? setIndex(currentIndex + 5)
                : null
            }}
          >
            <FaChevronRight />
          </Button>
        </Col>
      </Row>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 300, format: HTML)
          frontmatter {
            path
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
