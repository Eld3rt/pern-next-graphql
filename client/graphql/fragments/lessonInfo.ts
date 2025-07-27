import { gql } from '@apollo/client'

export default gql`
  fragment LessonInfo on Lesson {
    id
    position
    name
    videoDuration
    slug
    lessonProgress {
      id
    }
  }
`
