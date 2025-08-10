import { Lesson, LessonProgress, User } from '@prisma/client'
import { prisma } from '../prisma'
import { MutationMarkLessonCompleteArgs } from '../../graphql/types/resolvers-types'

export const markLessonComplete = async (
  args: MutationMarkLessonCompleteArgs,
  currentUser: User
): Promise<Lesson | undefined> => {
  const { lessonId, courseSlug } = args
  const userId = currentUser.id

  return prisma.$transaction(async prisma => {
    const courseProgress = await prisma.courseProgress.findFirst({
      where: {
        userId: userId,
        courseSlug: courseSlug,
      },
    })

    const lessonProgress = courseProgress
      ? await prisma.lessonProgress.create({
          data: {
            lessonId: lessonId,
            userId: userId,
            courseProgressId: courseProgress.id,
          },
          include: {
            lesson: true,
          },
        })
      : null

    return lessonProgress?.lesson
  })
}
