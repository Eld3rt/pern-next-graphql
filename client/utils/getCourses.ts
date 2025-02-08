'use server'

import { query } from '@/apollo/ApolloClient'
import { GetCoursesQuery, GetCoursesDocument } from '@/graphql/generated'

export const getCourses = async () => {
  const { data } = await query<GetCoursesQuery>({
    query: GetCoursesDocument,
  })
  return data.getCourses
}
