import React from "react"
import { StaticQuery, graphql } from "gatsby"
import MenuContent from "../MenuContent/MenuContent";

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
            <h3>{data.githubData.data.user.name}</h3>
            <label>Programmer and Writer</label>
          </div>
          <MenuContent />
        </div>
      )}
    />
  )
}

export default LeftBar
