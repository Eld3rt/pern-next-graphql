import { gql } from '@apollo/client'
import course from '../fragments/course'

export default gql`
  query GetCourseData($slug: String!) {
    getCourseData(slug: $slug) {
      ...Course
    }
		${course}
  }
`
