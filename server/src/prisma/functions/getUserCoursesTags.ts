import { Tag, User } from '@prisma/client'
import { prisma } from '../prisma.js'

export const getUserCoursesTags = async (currentUser: User): Promise<Tag[]> => {
  const userId = currentUser.id

  const purchasedCourses = await prisma.course.findMany({
    where: {
      courseProgress: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      tags: true,
    },
  })

  const uniqueTags = Array.from(
    new Map(purchasedCourses.flatMap(course => course.tags).map(tag => [tag.id, tag])).values()
  )

  return uniqueTags
}
