import { gql } from '@apollo/client'

export default gql`
  fragment Course on Course {
    id
    name
    description
    imageURL
    duration
    price
    reducedPrice
    level
    prerequisites
    offerMessage
    discountValue
    slug
    tags {
      id
      name
    }
    lessons {
      id
      name
      videoId
      videoDuration
    }
  }
`
