import { gql } from '@apollo/client'

export default gql`
  mutation signUp($name: String, $email: String!, $password: String!, $path: String) {
    signUp(name: $name, email: $email, password: $password, path: $path) {
      success
      message
    }
  }
`
