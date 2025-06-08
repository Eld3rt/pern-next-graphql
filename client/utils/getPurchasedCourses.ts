'use server'

import { query } from '@/apollo/ApolloClient'
import { GetPurchasedCoursesQuery, GetPurchasedCoursesDocument } from '@/graphql/generated'

export const getPurchasedCourses = async () => {
  const { data } = await query<GetPurchasedCoursesQuery>({
    query: GetPurchasedCoursesDocument,
    variables: { first: 6 },
  })
  return data.getPurchasedCourses
}
