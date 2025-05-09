import { gql } from '@apollo/client'

export default gql`
  fragment CourseData on Course {
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
    topics {
      id
      name
      lessons {
        id
        name
      }
    }
    lessons {
      id
      name
    }
  }
`
