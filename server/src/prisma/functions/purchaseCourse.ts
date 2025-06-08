import { User, Course } from '@prisma/client'
import { MutationPurchaseCourseArgs, RequireFields } from '../../graphql/types/resolvers-types'
import { prisma } from '../prisma'

export const purchaseCourse = async (
  args: RequireFields<MutationPurchaseCourseArgs, 'slug'>,
  currentUser: User
): Promise<Course> => {
  const { slug } = args
  const userId = currentUser.id
  const purchasedCourse = await prisma.course.update({
    where: {
      slug: slug,
    },
    data: {
      courseProgress: {
        connect: {
          id: userId,
        },
      },
    },
  })

  return purchasedCourse
}
