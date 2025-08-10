'use server'

import { query } from '@/apollo/ApolloClient'
import { GetCourseMainColorQuery, GetCourseMainColorDocument } from '@/graphql/generated'

export const getCourseMainColor = async (slug: string) => {
  const { data } = await query<GetCourseMainColorQuery>({
    query: GetCourseMainColorDocument,
    variables: {
      slug,
    },
  })
  return data.getCourseData?.mainColor
}
