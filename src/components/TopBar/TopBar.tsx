import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import MenuContent from "../MenuContent/MenuContent"
import { FaBars } from "react-icons/fa"
import { Button } from "react-tailwind-lib"

const TopBar = () => {
  const [showMenu, toggleMenu] = useState<boolean>(false)

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
            position: "fixed",
            top: "0px",
            minHeight: "50px",
            maxHeight: !showMenu ? "50px" : "500px",
            width: "100%",
            background: "rgb(39, 41, 43)",
            color: "rgb(204, 204, 204)",
            zIndex: 100,
            transition: "1s",
            overflow: "hidden",
          }}
        >
          <div className="float-left">
            <img
              src={data.githubData.data.user.avatarUrl}
              className="inline rounded-full"
              style={{ width: "40px", marginLeft: "5px", paddingTop: "5px" }}
            />
            <h4
              className="ml-4 inline"
              style={{ position: "relative", top: "5px" }}
            >
              {data.githubData.data.user.name}
            </h4>
          </div>
          <Button
            size="na"
            color="none"
            text="white"
            className="float-right"
            style={{ marginRight: "5px", paddingTop: "5px" }}
            onClick={() => toggleMenu(!showMenu)}
          >
            <FaBars style={{ fontSize: "2.5rem" }} />
          </Button>
          {showMenu && (
            <div className="mt-16">
              <MenuContent />
            </div>
          )}
        </div>
      )}
    />
  )
}
export default TopBar
