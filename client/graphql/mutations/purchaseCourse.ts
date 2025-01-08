import { gql } from '@apollo/client'

export default gql`
  mutation PurchaseCourse($slug: String!) {
    purchaseCourse(slug: $slug) {
      success
      message
    }
  }
`
