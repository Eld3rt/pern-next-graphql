import { User, Lesson } from '@prisma/client'
import { QueryGetCourseLessonsArgs, RequireFields } from '../../graphql/types/resolvers-types'
import { prisma } from '../prisma'

export const getGetCourseLessons = async (
  args: RequireFields<QueryGetCourseLessonsArgs, 'slug'>,
  currentUser: User
): Promise<Lesson[]> => {
  const { slug } = args
  const userId = currentUser.id
  const lessons = await prisma.lesson.findMany({
    where: {
      topic: {
        course: {
          slug: slug,
          courseProgress: {
            some: {
              userId: userId,
            },
          },
        },
      },
    },
    orderBy: {
      position: 'asc',
    },
    include: {
      lessonProgress: {
        where: {
          userId: userId,
        },
      },
    },
  })

  return lessons
}
