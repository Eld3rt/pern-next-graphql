import { gql } from '@apollo/client'
import courseInfo from '../fragments/courseInfo'

export default gql`
	query GetCoursesByString($query: String!) {
		getCoursesByString(query: $query) {
			...CourseInfo
		}
		${courseInfo}
	}
`
