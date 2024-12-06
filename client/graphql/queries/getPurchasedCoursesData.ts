import { gql } from '@apollo/client'
import purchasedCourseData from '../fragments/purchasedCourseData'

export default gql`
  query GetPurchasedCourseData($slug: String!) {
    getPurchasedCourseData(slug: $slug) {
      ...PurchasedCourseData
    }
		${purchasedCourseData}
  }
`
