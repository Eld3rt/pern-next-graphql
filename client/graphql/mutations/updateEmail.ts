import { gql } from '@apollo/client'

export default gql`
  mutation UpdateEmail($email: String!) {
    updateEmail(email: $email) {
      message
    }
  }
`
