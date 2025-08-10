import { User } from '@prisma/client'
import { prisma } from '../prisma.js'

export const checkCompletedLesson = async (lessonId: number, currentUser: User): Promise<boolean> => {
  const userId = currentUser.id
  const isComplete = await prisma.lessonProgress.exists({
    lessonId: lessonId,
    userId: userId,
  })

  return isComplete
}
