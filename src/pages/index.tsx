import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Row from "../components/Row/Row"
import Col from "../components/Col/Col"

interface Props {
  data: {
    githubData: {
      data: {
        user: {
          name: string
          bio: string
          avatarUrl: string
        }
      }
    }
    hero: {
      childImageSharp: {
        fluid: any
      }
    }
    project: {
      childImageSharp: {
        fluid: any
      }
    }
  }
}

const IndexPage = (props: Props) => {
  console.log(props)
  return (
    <Layout>
      <SEO title="Home" />
      <div className="clearfix">
        <Img
          fluid={props.data.hero.childImageSharp.fluid}
          className="shadow-lg"
        />
        <h1>Hi, I'm Lindsay Wardell</h1>
        <h3 className="my-4">I'm a software developer and IT professional</h3>
        <h4 className="my-6">
          Helping people get the most out of technology is my passion. I build
          web applications and IT solutions that drive your business.
        </h4>
        <Row gutter={2}>
          <Col>
            <Img fluid={props.data.project.childImageSharp.fluid} className="home-card" />
          </Col>
          <Col />
          <Col />
        </Row>
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    githubData {
      data {
        user {
          name
          avatarUrl
          bio
        }
      }
    }
    hero: file(relativePath: { eq: "lindsay-2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 968) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    project: file(relativePath: { eq: "juralen.PNG" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
