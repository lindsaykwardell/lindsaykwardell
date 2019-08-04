import React from "react"
import {
  FaLinkedin,
  FaFacebookSquare,
  FaTwitterSquare,
  FaGithubSquare,
  FaRssSquare,
} from "react-icons/fa"
import Row from "../Row/Row"
import Col from "../Col/Col"
import Button from "../Button/Button"
import MenuItem from "./../MenuItem/MenuItem"
import { StaticQuery, graphql, Link } from "gatsby"
import naturalOrder from "natural-order"
import Mailchimp from "../Mailchimp/Mailchimp";

const LeftBar = () => {
  return (
    <StaticQuery
      query={graphql`
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
        <div
          style={{
            position: "sticky",
            top: "0px",
            height: "100vh",
            background: "rgb(39, 41, 43)",
            color: "rgb(204, 204, 204)",
            textAlign: "center",
          }}
        >
          <div className="py-5">
            <img
              src={data.githubData.data.user.avatarUrl}
              className="mx-auto rounded-full"
              style={{ width: "40%" }}
            />
          </div>
          <div className="py-3">
            <h2>{data.githubData.data.user.name}</h2>
            <label>Programmer and Writer</label>
          </div>
          <Row className="mx-auto text-xl w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2">
            <Col>
              <Button
                size="na"
                color="none"
                text="na"
                href="https://www.facebook.com/lindsaykwardell.writer/?ref=settings"
              >
                <FaFacebookSquare />
              </Button>
            </Col>
            <Col>
              <Button
                size="na"
                color="none"
                text="na"
                href="https://twitter.com/Yagaboosh"
              >
                <FaTwitterSquare />
              </Button>
            </Col>
            <Col>
              <Button
                size="na"
                color="none"
                text="na"
                href="https://www.linkedin.com/in/lindsaykwardell/"
              >
                <FaLinkedin />
              </Button>
            </Col>
            <Col>
              <Button
                size="na"
                color="none"
                text="na"
                href="https://github.com/lindsaykwardell"
              >
                <FaGithubSquare />
              </Button>
            </Col>
            <Col>
              <Button size="na" color="none" text="na" href="/rss.xml">
                <FaRssSquare />
              </Button>
            </Col>
          </Row>
          <hr />
          <div>
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/about">About</MenuItem>
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
        </div>
      )}
    />
  )
}

export default LeftBar
