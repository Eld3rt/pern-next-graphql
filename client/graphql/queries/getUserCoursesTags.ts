import { gql } from '@apollo/client'
import tag from '../fragments/tag'

export default gql`
	query GetUserCoursesTags {
		getUserCoursesTags {
			...Tag
		}
		${tag}
	}
`
