import { gql } from '@apollo/client'
import user from '../fragments/user'

export default gql`
	query Me {
		me {
			...User
		}
		${user}
	}`
