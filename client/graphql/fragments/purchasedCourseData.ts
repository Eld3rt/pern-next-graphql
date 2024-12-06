import { gql } from '@apollo/client'

export default gql`
  fragment PurchasedCourseData on Course {
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
