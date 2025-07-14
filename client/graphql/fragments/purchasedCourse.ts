import { gql } from '@apollo/client'

export default gql`
  fragment PurchasedCourse on Course {
    id
    name
    description
    imageURL
    smallImageURL
    mainColor
    duration
    level
    slug
    tags {
      id
      name
    }
    topics {
      id
      name
      lessons {
        id
        name
        slug
        videoDuration
      }
    }
    courseProgress {
      id
      lessonProgress {
        id
        lesson {
          id
        }
      }
    }
  }
`
