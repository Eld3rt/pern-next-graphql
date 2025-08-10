'use server'

import { query } from '@/apollo/ApolloClient'
import { GetLessonDataDocument, GetLessonDataQuery } from '@/graphql/generated'

export const getLessonData = async (courseSlug: string, lessonSlug: string) => {
  const { data } = await query<GetLessonDataQuery>({
    query: GetLessonDataDocument,
    variables: { courseSlug, lessonSlug },
  })

  return data.getLessonData
}
