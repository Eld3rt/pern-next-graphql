import { gql } from '@apollo/client'

export default gql`
  mutation PurchaseCourse($courseId: Int!) {
    purchaseCourse(courseId: $courseId) {
      message
    }
  }
`
