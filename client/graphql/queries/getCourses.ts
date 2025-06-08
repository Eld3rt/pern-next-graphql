import { gql } from '@apollo/client'
import course from '../fragments/course'

export default gql`
  query GetCourses($tags: [String!], $query: String, $sort: SortInput, $first: PositiveInt, $cursor: Int) {
    getCourses(tags: $tags, query: $query, sort: $sort, first: $first, after: $cursor) {
			edges {
				node {
					...Course
				}
			}
			pageInfo {
        hasNextPage
				endCursor
			}
    }
		${course}
  }
`
