import { gql } from '@apollo/client'
import courseData from '../fragments/courseData'

export default gql`
  query GetCourseData($slug: String!) {
    getCourseData(slug: $slug) {
      ...CourseData
    }
		${courseData}
  }
`
