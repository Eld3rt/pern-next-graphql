import { gql } from '@apollo/client'
import courseData from '../fragments/courseData'

export default gql`
  query GetCourses($tags: [String!], $query: String, $sort: SortInput, $first: PositiveInt, $cursor: Int) {
    getCourses(tags: $tags, query: $query, sort: $sort, first: $first, after: $cursor) {
			edges {
				node {
					...CourseData
				}
			}
			pageInfo {
        hasNextPage
				endCursor
			}
    }
		${courseData}
  }
`
