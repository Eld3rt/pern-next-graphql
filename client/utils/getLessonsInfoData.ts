'use server'

import { query } from '@/apollo/ApolloClient'
import { GetCourseLessonsDocument, GetCourseLessonsQuery } from '@/graphql/generated'

export const getLessonsInfoData = async (slug: string) => {
  const { data } = await query<GetCourseLessonsQuery>({
    query: GetCourseLessonsDocument,
    variables: { slug },
  })

  return data.getCourseLessons
}
