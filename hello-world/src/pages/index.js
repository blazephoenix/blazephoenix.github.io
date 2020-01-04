import React from "react"
import Header from "../components/header"
import Container from "../components/container"
import { graphql } from "gatsby"

export default ({ data }) => (
<Container>
    <Header/>
    <h1>{data.site.siteMetadata.title}</h1>
    <p>This is a started template for gatsby.</p>
    <img src="https://source.unsplash.com/random/400x200" alt="" />
</Container>
)
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
