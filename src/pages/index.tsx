import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Button from "../components/Button/Button"
import Row from "../components/Row/Row"
import Col from "../components/Col/Col"
import Card from "../components/Card/Card"
import Tooltip from "../components/Tooltip/Tooltip"

interface Props {
  data: {
    homeImage: {
      childImageSharp: {
        fluid: any
      }
    }
  }
}

const IndexPage = (props: Props) => (
  <Layout>
    <SEO title="Home" />
    <Img
      fluid={props.data.homeImage.childImageSharp.fluid}
      style={{ maxWidth: "700px", margin: "0 auto" }}
    />
    <p className="p-6 italic">
      Before all else, there were but two substances – the Void, and the Light.
      In the Dawn of All, the Light descended into the Void, piercing it to the
      core. From the place where the two touched came the Seven, tasked with the
      creation of all things. By their hands were all things formed, both in the
      World and the Heavens. When at last their task was complete, and the
      cycles of the World set in motion, the Seven rested, and fell into a deep
      slumber.
      <br />
      <br />– The Book of Generations
    </p>

    <p>
      My name is Lindsay Wardell. Welcome to my website. I am a partner, parent,
      writer, and minimalist. My primary work is collectively called Ilandrior.
      It is a fantasy setting, but intended to be relatable at the same time as
      fantastic. While there is plenty of history and lore to dig into, my main
      focus is on a period much like our own world. Large empires cover the
      land, alliances and formed and broken, and political intrigue and
      shuffling rule the day. But it doesn’t forget the smaller characters,
      those who don’t have as great an impact on the world at large.
    </p>

    <p>
      The first novel in this series, The Folly of Wizards, follows two main
      characters. The first is Lindin, recently promoted to the rank of High
      Mage within the magocratic Argantin Empire. The second, Brayand Hathen,
      governor of the port city of Alden. Other characters will enter and leave
      as needed to tell the story, but the main focus is on these two, and their
      interactions with those around them.
    </p>

    <p>
      Every so often, new portions of the novel will be posted here for your
      enjoyment. When the novel is completed, it will be available for purchase
      as either an eBook or a traditional book. Other content will be available
      on other days of the week as it is created. You can follow what is going
      on via Facebook, Twitter, Google+, RSS, or by e-mail.
    </p>

    <p>
      If you want to help support this project, you will find my Patreon page
      linked below. Some content will be posted specifically for my patrons,
      based upon interest.
    </p>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query {
    homeImage: file(relativePath: { eq: "map.png" }) {
      childImageSharp {
        fluid(maxWidth: 700) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
