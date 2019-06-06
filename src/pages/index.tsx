import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Button from "../components/Button/Button"
import Row from "../components/Row/Row"
import Col from "../components/Col/Col"
import Card from "../components/Card/Card"
import Tooltip from "../components/Tooltip/Tooltip"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Button>I'm a button</Button>
    <Row gutter={1}>
      <Col>Column 1</Col>
      <Col>Column 2</Col>
      <Col>Column 3</Col>
    </Row>
    <Card>Hey, it's a card!</Card>
    <Tooltip label="Smile!">Look at me!</Tooltip>
  </Layout>
)

export default IndexPage
