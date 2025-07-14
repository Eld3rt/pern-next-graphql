import { Course } from '@prisma/client'
import { QueryGetCourseDataArgs, RequireFields } from '../../graphql/types/resolvers-types'
import { prisma } from '../prisma'

export const getCourseData = async (args: RequireFields<QueryGetCourseDataArgs, 'slug'>): Promise<Course | null> => {
  const { slug } = args

  const course = await prisma.course.findFirst({
    where: {
      slug: slug,
    },
    include: {
      tags: true,
      topics: {
        include: {
          lessons: {
            orderBy: {
              position: 'asc',
            },
          },
        },
      },
    },
  })

  return course
}
