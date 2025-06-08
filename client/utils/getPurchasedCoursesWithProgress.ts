'use server'

import { query } from '@/apollo/ApolloClient'
import { GetPurchasedCoursesWithProgressQuery, GetPurchasedCoursesWithProgressDocument } from '@/graphql/generated'

export const getPurchasedCoursesWithProgress = async () => {
  const { data } = await query<GetPurchasedCoursesWithProgressQuery>({
    query: GetPurchasedCoursesWithProgressDocument,
  })
  return data.getPurchasedCoursesWithProgress
}
