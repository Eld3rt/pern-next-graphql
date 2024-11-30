import { User, Course } from '@prisma/client'
import { prisma } from '../prisma'

export const getPurchasedCourses = async (currentUser: User): Promise<Course[] | null> => {
  const userId = currentUser.id
  const purchasedCourses = await prisma.course.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  })

  return purchasedCourses
}
