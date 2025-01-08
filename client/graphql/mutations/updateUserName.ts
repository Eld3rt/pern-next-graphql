import { gql } from '@apollo/client'

export default gql`
  mutation UpdateUserName($newName: String!) {
    updateUserName(newName: $newName) {
      success
      message
    }
  }
`
