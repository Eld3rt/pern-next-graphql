import { gql } from '@apollo/client'

export default gql`
  fragment PurchasedCourseData on Course {
    id
    name
    description
    imageURL
    duration
    price
    reducedPrice
    discountValue
    tags {
      id
      name
    }
    slug
    lessons {
      id
      name
      videoDuration
    }
  }
`
