/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import {Row, Col, Container} from "react-tailwind-lib"
import "./layout.css"
import LeftBar from "./LeftBar/LeftBar"
import TopBar from "./TopBar/TopBar";

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
        <div className="md:hidden">
          <TopBar />
        </div>
        <Row className="mt-10 md:mt-0">
          <Col className="hidden md:block md:w-1/3 lg:w-1/4 xl:w-1/5">
            <LeftBar />
          </Col>
          <Col style={{ background: "rgb(240, 241, 242)" }}>
            <Container className="bg-white my-5 p-2">
              <main>{children}</main>
            </Container>
            <footer
              style={{
                padding: "0.30em 7.4074%",
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
