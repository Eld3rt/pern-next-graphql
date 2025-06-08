import { gql } from '@apollo/client'
import purchasedCourse from '../fragments/purchasedCourse'

export default gql`
	query GetPurchasedCoursesWithProgress {
		getPurchasedCoursesWithProgress {
			...PurchasedCourse
		}
		${purchasedCourse}
	}
`
