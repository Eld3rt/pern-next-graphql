import { User, Course } from '@prisma/client'
import { prisma } from '../prisma'

export const getPurchasedCoursesWithProgress = async (currentUser: User): Promise<Course[]> => {
  const userId = currentUser.id

  const purchasedCourses = await prisma.course.findMany({
    where: {
      courseProgress: {
        some: {
          userId: userId,
          lessonProgress: {
            some: {},
          },
        },
      },
    },
    take: 6,
    include: {
      tags: true,
      topics: {
        include: {
          lessons: {
            include: {
              lessonProgress: true,
            },
          },
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

  purchasedCourses.sort((a, b) => {
    const aDate = a.courseProgress[0].lessonProgress.reduce(
      (latest, progress) => (progress.updatedAt > latest ? progress.updatedAt : latest),
      new Date(0)
    )
    const bDate = b.courseProgress[0].lessonProgress.reduce(
      (latest, progress) => (progress.updatedAt > latest ? progress.updatedAt : latest),
      new Date(0)
    )
    return bDate.getTime() - aDate.getTime()
  })

  return purchasedCourses
}
