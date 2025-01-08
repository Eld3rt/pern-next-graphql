import { gql } from '@apollo/client'

export default gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      success
      message
    }
  }
`
