import { gql } from '@apollo/client'
import purchasedCourse from '../fragments/purchasedCourse'

export default gql`
	query GetPurchasedCourses($tags: [String!], $query: String, $sort: SortInput, $first: PositiveInt, $cursor: Int) {
		getPurchasedCourses(tags: $tags, query: $query, sort: $sort, first: $first, after: $cursor) {
			edges {
				node {
					...PurchasedCourse
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
		${purchasedCourse}
	}
`
