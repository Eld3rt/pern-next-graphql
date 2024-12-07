import { gql } from '@apollo/client'

export default gql`
  mutation ConfirmPassword($key: String!, $password: String!) {
    confirmPassword(key: $key, password: $password) {
      message
    }
  }
`
