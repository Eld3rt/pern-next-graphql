'use server'

import { query } from '@/apollo/ApolloClient'
import { GetPurchasedCourseDataDocument, GetPurchasedCourseDataQuery } from '@/graphql/generated'

export const getPurchasedCourseData = async (slug: string) => {
  const { data } = await query<GetPurchasedCourseDataQuery>({
    query: GetPurchasedCourseDataDocument,
    variables: { slug },
  })

  return data.getPurchasedCourseData
}
