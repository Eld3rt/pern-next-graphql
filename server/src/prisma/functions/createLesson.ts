import { Course, Lesson } from '@prisma/client'
import { prisma } from '../prisma.js'
import { getVideo } from '../../kinescope/getVideo.js'

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
      } as any,
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
