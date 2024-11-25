import { gql } from '@apollo/client'
import courseInfo from '../fragments/courseInfo'

export default gql`
  query GetCourseInfo($slug: String!) {
    getCourseData(slug: $slug) {
      ...CourseInfo
    }
		${courseInfo}
  }
`
