import { User, Lesson } from '@prisma/client'
import { QueryGetLessonDataArgs, RequireFields } from '../../graphql/types/resolvers-types.js'
import { prisma } from '../prisma.js'

export const getLessonData = async (
  args: RequireFields<QueryGetLessonDataArgs, 'courseSlug' | 'lessonSlug'>,
  currentUser: User
): Promise<Lesson | null> => {
  const { courseSlug, lessonSlug } = args
  const userId = currentUser.id
  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      topic: {
        course: {
          slug: courseSlug,
          courseProgress: {
            some: {
              userId: userId,
            },
          },
        },
      },
    },
    include: {
      topic: true,
      lessonProgress: {
        where: {
          userId: userId,
        },
      },
    },
  })

  return lesson
}
