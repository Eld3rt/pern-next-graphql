import { gql } from '@apollo/client'

export default gql`
  fragment Lesson on Lesson {
    id
    position
    name
    content
    videoId
    videoURL
    videoDuration
    topic {
      id
      name
    }
    slug
    lessonProgress {
      id
    }
  }
`
