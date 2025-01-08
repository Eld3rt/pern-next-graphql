import { gql } from '@apollo/client'

export default gql`
  query ConfirmAccount($key: String!) {
    confirmAccount(key: $key) {
      success
      message
      path
      sessionToken
    }
  }
`
