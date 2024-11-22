'use server'

import { query } from '@/apollo/ApolloClient'
import { MeQuery, MeDocument } from '@/graphql/generated'

export const getCurrentUser = async () => {
  const { data } = await query<MeQuery>({
    query: MeDocument,
  })
  return data.me
}
