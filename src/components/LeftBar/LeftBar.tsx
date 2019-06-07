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
import MenuItem from "./../MenuItem/MenuItem"

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
          src="https://avatars0.githubusercontent.com/u/32229300?v=4"
          className="mx-auto rounded-full"
          style={{ width: "40%" }}
        />
      </div>
      <div className="py-3">
        <h1>Lindsay Wardell</h1>
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
      </Row>
      <hr />
      <div>
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/about">About</MenuItem>
      </div>
    </div>
  )
}

export default LeftBar
