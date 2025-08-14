import { Course } from '@prisma/client'
import { prisma } from '../prisma.js'
import { QueryGetCoursesArgs } from '../../graphql/types/resolvers-types.js'
import { setCoursesFilters } from '../../utils/setCoursesFilters.js'

export const getCourses = async (args: Partial<QueryGetCoursesArgs>): Promise<Course[]> => {
  const { tags, query, sort, first, after } = args

  const orderBy: any = sort
    ? sort.field === 'popular'
      ? [{ courseProgress: { _count: sort.order as 'asc' | 'desc' } }, { id: 'asc' }]
      : [{ [sort.field]: sort.order as 'asc' | 'desc' }, { id: 'asc' }]
    : { createdAt: 'desc' }

  const where = (tags || query) && setCoursesFilters(tags, query)

  const take = first && first + 1
  const cursor = after
    ? {
        id: after,
      }
    : undefined

  const courses = await prisma.course.findMany({
    where,
    orderBy,
    take,
    cursor,
    include: {
      tags: true,
      topics: {
        include: {
          lessons: true,
        },
      },
    },
  })

  return courses
}
