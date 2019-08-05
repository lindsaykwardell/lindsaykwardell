import React from "react"
import MenuItem from "../MenuItem/MenuItem"
import {
  FaLinkedin,
  FaFacebookSquare,
  FaTwitterSquare,
  FaGithubSquare,
  FaRssSquare,
} from "react-icons/fa"
import Button from "../Button/Button"
import Row from "../Row/Row"
import Col from "../Col/Col"
import naturalOrder from "natural-order"
import { Link, StaticQuery, graphql } from "gatsby"
import Mailchimp from "../Mailchimp/Mailchimp"

const MenuContent = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
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
      `}
      render={data => (
        <>
          <Row className="mx-auto text-xl w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2">
            <Col>
              <Button
                size="na"
                color="none"
                text="na"
                href="https://www.facebook.com/lindsaykwardell.writer/?ref=settings"
              >
                <FaFacebookSquare className="m-auto" />
              </Button>
            </Col>
            <Col>
              <Button
                size="na"
                color="none"
                text="na"
                href="https://twitter.com/Yagaboosh"
              >
                <FaTwitterSquare className="m-auto" />
              </Button>
            </Col>
            <Col>
              <Button
                size="na"
                color="none"
                text="na"
                href="https://www.linkedin.com/in/lindsaykwardell/"
              >
                <FaLinkedin className="m-auto" />
              </Button>
            </Col>
            <Col>
              <Button
                size="na"
                color="none"
                text="na"
                href="https://github.com/lindsaykwardell"
              >
                <FaGithubSquare className="m-auto" />
              </Button>
            </Col>
            <Col>
              <Button size="na" color="none" text="na" href="/rss.xml">
                <FaRssSquare className="m-auto" />
              </Button>
            </Col>
          </Row>
          <hr />
          <div>
            <MenuItem to="/">Home</MenuItem>
            {/* <MenuItem to="/about">About</MenuItem> */}
            <MenuItem to="/blog">Blog</MenuItem>
          </div>
          <hr />
          <div className="text-left">
            <span className="text-white px-4 py-2">Recent Posts</span>
            {naturalOrder(
              data.allMarkdownRemark.edges,
              ["node.frontmatter.date"],
              ["desc"]
            )
              .filter((edge, index) => index < 5)
              .map(({ node }, index) => (
                <Link
                  to={node.frontmatter.path}
                  className="recent-post block px-6 py-1"
                  key={index}
                >
                  {node.frontmatter.title}
                </Link>
              ))}
          </div>
          <hr />
          <Mailchimp />
        </>
      )}
    />
  )
}

export default MenuContent
