import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({data}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Welcome, humans.</h1>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/about/">This is about Josh.</Link>
      <h1>Upcoming Shows</h1>
      {data.allItems.edges.map(({ node }, index) => (
        <div>
          <Link to={node.alternative_id}>{node.summary}</Link>
          <br />
          {node.start.dateTime}
        </div>
      ))}
    </Layout>
  )
}
export default IndexPage

export const query = graphql`
  query GetNextShows ($currentDate:Date) {
    allItems(
      limit: 5 
      filter: { start: { dateTime: { gt: $currentDate } } }
      sort: { fields: [start___dateTime], order: ASC }
    ) {
      edges {
        node {
          summary
          alternative_id
          start {
            dateTime(formatString: "dddd MMM Do, YYYY h:mm a")
          }
        }
      }
    }
  }
`
