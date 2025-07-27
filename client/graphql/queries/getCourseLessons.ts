import { gql } from '@apollo/client'
import lessonInfo from '../fragments/lessonInfo'

export default gql`
	query GetCourseLessons($slug: String!) {
		getCourseLessons(slug: $slug) {
			...LessonInfo
		}
		${lessonInfo}
	}
`
