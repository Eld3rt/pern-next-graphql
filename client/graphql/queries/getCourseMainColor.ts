import { gql } from '@apollo/client'
import courseMainColor from '../fragments/courseMainColor'

export default gql`
	query GetCourseMainColor($slug: String!) {
		getCourseData(slug: $slug) {
			...CourseMainColor
		}
		${courseMainColor}
	}
`
