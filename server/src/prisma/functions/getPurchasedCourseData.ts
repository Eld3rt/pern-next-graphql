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
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      tags: true,
      lessons: true,
    },
  })

  return purchasedCourse
}
