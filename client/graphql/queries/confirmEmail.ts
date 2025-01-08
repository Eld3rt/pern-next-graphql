import { gql } from '@apollo/client'

export default gql`
  query ConfirmEmail($key: String!) {
    confirmEmail(key: $key) {
      success
      message
    }
  }
`
