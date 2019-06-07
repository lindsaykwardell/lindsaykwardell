/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Row from "./Row/Row"
import Col from "./Col/Col"
import Container from "./Container/Container"
import "./layout.css"
import LeftBar from "./LeftBar/LeftBar"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Row>
          <Col className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
            <LeftBar />
          </Col>
          <Col style={{ background: "rgb(240, 241, 242)" }}>
            <Container className="bg-white my-5 p-2">
              <main>{children}</main>
            </Container>
            <footer
              className="w-1/2 sm:w-2/3 md:w-3/4 lg:w-4/5"
              style={{
                position: "fixed",
                bottom: "0px",
                padding: "0.75em 7.4074%",
                background: "#D9D9D9",
                color: "#3E4145",
                textAlign: "center",
              }}
            >
              © {new Date().getFullYear()} Lindsay Wardell
            </footer>
          </Col>
        </Row>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
