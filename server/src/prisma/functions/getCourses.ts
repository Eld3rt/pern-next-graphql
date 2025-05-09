import { Course } from '@prisma/client'
import { prisma } from '../prisma'
import { QueryGetCoursesArgs } from '../../graphql/types/resolvers-types'
import { setFilters } from '../../utils/setFilters'

export const getCourses = async (args: Partial<QueryGetCoursesArgs>): Promise<Course[]> => {
  const { tags, query, sort, first, after } = args

  const orderBy: any = sort
    ? sort.field === 'popular'
      ? [{ users: { _count: sort.order as 'asc' | 'desc' } }, { id: 'asc' }]
      : [{ [sort.field]: sort.order as 'asc' | 'desc' }, { id: 'asc' }]
    : { createdAt: 'desc' }

  const where = (tags || query) && setFilters(tags, query)

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
      lessons: true,
    },
  })

  return courses
}
