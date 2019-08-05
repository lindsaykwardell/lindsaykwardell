import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Row from "../components/Row/Row"
import Col from "../components/Col/Col"
import Card from "../components/Card/Card"

interface Repository {
  description: string
  name: string
  url: string
  licenseInfo: {
    name: string
  }
  primaryLanguage: {
    name: string
    color: string
  }
}

interface Props {
  data: {
    githubData: {
      data: {
        user: {
          name: string
          bio: string
          avatarUrl: string
          repositories: {
            nodes: Repository[]
          }
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
    nan: {
      childImageSharp: {
        fluid: any
      }
    }
    mp: {
      childImageSharp: {
        fluid: any
      }
    }
  }
}

const IndexPage = (props: Props) => {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="clearfix">
        <div>
          <Img
            fluid={props.data.hero.childImageSharp.fluid}
            className="shadow-lg"
          />
          <h1>Hi, I'm Lindsay Wardell</h1>
          <h3 className="my-4">I'm a software developer and IT professional</h3>
          <h4 className="my-6 text-xl md:text-2xl">
            Helping people get the most out of technology is my passion. I build
            web applications and IT solutions to help people get things done.
          </h4>
        </div>
        <hr className="my-16" />
        <div>
          <div style={{ marginTop: "10vh" }}>
            <h2 className="text-center">Examples</h2>
            <Row gutter={2} default="inline" className="md:flex">
              <Col className="w-full m-auto my-6 md:my-0 md:flex-1" style={{ maxWidth: "400px" }}>
                <a href="https://warsofthejuriels.netlify.com" target="_blank">
                  <Img
                    fluid={props.data.project.childImageSharp.fluid}
                    className="home-card"
                  />
                </a>
              </Col>
              <Col className="w-full m-auto my-6 md:my-0 md:flex-1" style={{ maxWidth: "400px" }}>
                <a href="https://noadjustmentsneeded.com" target="_blank">
                  <Img
                    fluid={props.data.nan.childImageSharp.fluid}
                    className="home-card"
                  />
                </a>
              </Col>
              <Col className="w-full m-auto my-6 md:my-0 md:flex-1" style={{ maxWidth: "400px" }}>
                <a href="https://maryspixels.herokuapp.com" target="_blank">
                  <Img
                    fluid={props.data.mp.childImageSharp.fluid}
                    className="home-card"
                  />
                </a>
              </Col>
            </Row>
          </div>
        </div>
        <hr className="my-16" />
        <div>
          <h2 className="text-center">Current Projects</h2>
          <Row gutter={2} className="flex-wrap">
            {props.data.githubData.data.user.repositories.nodes.map(
              (node, index) => (
                <Col className="w-full md:w-1/2" key={index}>
                  <Card
                    style={{
                      border: `2px solid ${node.primaryLanguage.color}`,
                      minHeight: "200px",
                    }}
                  >
                    <span className="md:float-right">
                      {node.licenseInfo ? node.licenseInfo.name : ""}
                    </span>
                    <h4 className="underline mb-3">
                      <a href={node.url} target="_blank">
                        {node.name}
                      </a>
                    </h4>
                    <span className="italic font-bold">
                      {node.primaryLanguage.name}
                    </span>
                    <p className="p-5">{node.description}</p>
                  </Card>
                </Col>
              )
            )}
          </Row>
        </div>
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
    nan: file(relativePath: { eq: "nan.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    mp: file(relativePath: { eq: "mp.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
