import { gql } from '@apollo/client'
import purchasedCourse from '../fragments/purchasedCourse'

export default gql`
  query GetPurchasedCourseData($slug: String!) {
    getPurchasedCourseData(slug: $slug) {
      ...PurchasedCourse
    }
		${purchasedCourse}
  }
`
