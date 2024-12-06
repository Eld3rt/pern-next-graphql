import { gql } from '@apollo/client'

export default gql`
  fragment CourseData on Course {
    id
    name
    slug
    lessons {
      id
      name
    }
  }
`
