'use server'

import { query } from '@/apollo/ApolloClient'
import { GetTagsQuery, GetTagsDocument } from '@/graphql/generated'

export const getTags = async () => {
  const { data } = await query<GetTagsQuery>({
    query: GetTagsDocument,
  })
  return data.getTags
}
