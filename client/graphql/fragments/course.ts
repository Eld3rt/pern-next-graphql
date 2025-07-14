import { gql } from '@apollo/client'

export default gql`
  fragment Course on Course {
    id
    name
    description
    imageURL
    smallImageURL
    mainColor
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
    topics {
      id
      name
      lessons {
        id
        name
      }
    }
  }
`
