import { gql } from '@apollo/client'
import tag from '../fragments/tag'

export default gql`
	query GetTags($first: PositiveInt, $cursor: Int) {
		getTags(first: $first, after: $cursor) {
			edges {
				node {
					...Tag
				}
			}
			pageInfo {
        hasNextPage
				endCursor
			}
		}
		${tag}
	}
`
