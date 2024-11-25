import { User, Course } from '@prisma/client'
import { MutationPurchaseCourseArgs, RequireFields } from '../../graphql/types/resolvers-types'
import { prisma } from '../prisma'

export const purchaseCourse = async (
  args: RequireFields<MutationPurchaseCourseArgs, 'courseId'>,
  currentUser: User
): Promise<Course> => {
  const { courseId } = args
  const userId = currentUser.id
  const purchasedCourse = await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      users: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      lessons: true,
    },
  })

  return purchasedCourse
}
