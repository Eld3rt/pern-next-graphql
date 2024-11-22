import { gql } from '@apollo/client'

export default gql`
  query ConfirmAccount($key: String!) {
    confirmAccount(key: $key) {
      user {
        email
      }
      path
    }
  }
`
