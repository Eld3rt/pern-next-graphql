import { User, Course } from '@prisma/client'
import { MutationPurchaseCourseArgs, RequireFields } from '../../graphql/types/resolvers-types.js'
import { prisma } from '../prisma.js'

export const purchaseCourse = async (
  args: RequireFields<MutationPurchaseCourseArgs, 'slug'>,
  currentUser: User
): Promise<Course> => {
  const { slug } = args
  const userId = currentUser.id
  const courseProgress = await prisma.courseProgress.create({
    data: {
      courseSlug: slug,
      userId: userId,
    },
    include: {
      course: true,
    },
  })

  return courseProgress.course
}
