import { gql } from '@apollo/client'

export default gql`
  fragment Tag on Tag {
    id
    name
  }
`
