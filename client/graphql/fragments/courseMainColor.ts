import { gql } from '@apollo/client'

export default gql`
  fragment CourseMainColor on Course {
    mainColor
  }
`
