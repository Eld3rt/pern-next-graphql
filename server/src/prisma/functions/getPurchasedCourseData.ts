import { User, Course } from '@prisma/client'
import { QueryGetPurchasedCourseDataArgs, RequireFields } from '../../graphql/types/resolvers-types'
import { prisma } from '../prisma'

export const getPurchasedCourseData = async (
  args: RequireFields<QueryGetPurchasedCourseDataArgs, 'slug'>,
  currentUser: User
): Promise<Course | null> => {
  const { slug } = args
  const userId = currentUser.id
  const purchasedCourse = await prisma.course.findFirst({
    where: {
      slug: slug,
      courseProgress: {
        some: {
          userId: userId,
        },
      },
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
        orderBy: {
          position: 'asc',
        },
      },
      courseProgress: {
        where: {
          userId: userId,
        },
        include: {
          lessonProgress: {
            include: {
              lesson: true,
            },
          },
        },
      },
    },
  })

  return purchasedCourse
}
