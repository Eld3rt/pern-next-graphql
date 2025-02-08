import { gql } from '@apollo/client'

export default gql`
  fragment CourseInfo on Course {
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
  }
`
