import React from "react"
import {
  FaLinkedin,
  FaFacebookSquare,
  FaTwitterSquare,
  FaGithubSquare,
} from "react-icons/fa"
import Row from "../Row/Row"
import Col from "../Col/Col"
import Button from "../Button/Button"

import ProfileImg from "../../images/profile.jpg"

const LeftBar = () => {
  return (
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
          src={ProfileImg}
          className="mx-auto rounded-full"
          style={{ width: "40%" }}
        />
      </div>
      <Row gutter={2} className="w-1/3 mx-auto text-xl">
        <Col>
          <Button size="na" color="none" text="na">
            <FaFacebookSquare />
          </Button>
        </Col>
        <Col>
          <Button size="na" color="none" text="na">
            <FaTwitterSquare />
          </Button>
        </Col>
        <Col>
          <Button size="na" color="none" text="na">
            <FaLinkedin />
          </Button>
        </Col>
        <Col>
          <Button size="na" color="none" text="na">
            <FaGithubSquare />
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default LeftBar
