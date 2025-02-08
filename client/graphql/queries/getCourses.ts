import { gql } from '@apollo/client'
import courseData from '../fragments/courseData'

export default gql`
  query GetCourses {
    getCourses {
      ...CourseData
    }
		${courseData}
  }
`
