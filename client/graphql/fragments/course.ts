import { gql } from '@apollo/client'

export default gql`
  fragment Course on Course {
    id
    name
    slug
    lessons {
      id
      name
      videoURL
    }
  }
`
