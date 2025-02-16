import { Course } from '@prisma/client'
import { prisma } from '../prisma'

export const getCourses = async (): Promise<Course[]> => {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tags: true,
      lessons: true,
    },
  })

  return courses
}
