import { gql } from '@apollo/client'

export default gql`
  fragment PurchasedCourse on Course {
    id
    name
    imageURL
    smallImageURL
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
      }
    }
    courseProgress {
      id
      lessonProgress {
        id
      }
    }
  }
`
