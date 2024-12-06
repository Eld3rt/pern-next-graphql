import { User } from '@prisma/client'
import { QueryHasCourseAccessArgs, RequireFields } from '../../graphql/types/resolvers-types'
import { prisma } from '../prisma'

export const hasCourse = async (
  args: RequireFields<QueryHasCourseAccessArgs, 'slug'>,
  currentUser: User
): Promise<boolean> => {
  const { slug } = args
  const userId = currentUser.id
  const isPurchased = await prisma.course.exists({
    slug: slug,
    users: {
      some: {
        id: userId,
      },
    },
  })

  return isPurchased
}
