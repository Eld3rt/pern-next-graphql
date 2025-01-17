import { Course } from '@prisma/client'
import { QueryGetCoursesByStringArgs, RequireFields } from '../../graphql/types/resolvers-types'
import { prisma } from '../prisma'

export const getSearchedCourses = async (
  args: RequireFields<QueryGetCoursesByStringArgs, 'query'>
): Promise<Course[]> => {
  const { query } = args
  const searchedCourses = await prisma.course.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
  })

  return searchedCourses
}
