import { gql } from '@apollo/client'

export default gql`
  mutation MarkLessonComplete($lessonId: Int!, $courseSlug: String!) {
    markLessonComplete(lessonId: $lessonId, courseSlug: $courseSlug) {
      success
      message
    }
  }
`
