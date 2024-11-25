import { gql } from '@apollo/client'

export default gql`
  fragment CourseInfo on Course {
    id
    name
    slug
  }
`
