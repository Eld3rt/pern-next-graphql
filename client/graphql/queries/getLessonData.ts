import { gql } from '@apollo/client'
import lesson from '../fragments/lesson'

export default gql`
	query GetLessonData($courseSlug: String!, $lessonSlug: String!) {
		getLessonData(courseSlug: $courseSlug, lessonSlug: $lessonSlug) {
			...Lesson
		}
		${lesson}
	}
`
