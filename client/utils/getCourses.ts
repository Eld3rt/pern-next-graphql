'use server'

import { query } from '@/apollo/ApolloClient'
import { GetCoursesQuery, GetCoursesDocument, GetCoursesQueryVariables } from '@/graphql/generated'

export const getCourses = async () => {
  const { data } = await query<GetCoursesQuery, GetCoursesQueryVariables>({
    query: GetCoursesDocument,
    variables: { sort: { field: 'popular', order: 'desc' }, first: 6 },
  })
  return data.getCourses
}
