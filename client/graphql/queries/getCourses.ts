import { gql } from '@apollo/client'
import courseInfo from '../fragments/courseInfo'

export default gql`
  query GetCourses {
    getCourses {
      ...CourseInfo
    }
		${courseInfo}
  }
`
