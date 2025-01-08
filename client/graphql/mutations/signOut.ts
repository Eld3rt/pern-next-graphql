import { gql } from '@apollo/client'

export default gql`
  mutation SignOut {
    signOut {
      success
    }
  }
`
