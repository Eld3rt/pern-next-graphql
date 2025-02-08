import { Course, Lesson } from '@prisma/client'
import { prisma } from '../prisma'
import { getVideo } from '../../kinescope/getVideo'

export const createLesson = async (args: {
  name: string
  videoId: string
  courseId: number
}): Promise<{ lesson: Lesson; course: Course }> => {
  const { name, videoId, courseId } = args

  return prisma.$transaction(async prisma => {
    const { duration } = await getVideo(videoId)

    const lesson = await prisma.lesson.create({
      data: {
        name,
        videoId,
        videoDuration: duration,
        courseId,
      },
    })

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        duration: {
          increment: duration,
        },
      },
    })

    return { lesson, course }
  })
}
