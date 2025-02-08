import { Course, Lesson } from '@prisma/client'
import { prisma } from '../prisma'
import { getVideosByProjectId } from '../../kinescope/getVideos'

export const createLessons = async (args: {
  projectId: string
  courseId: number
}): Promise<{ lessons: Lesson[]; course: Course }> => {
  const { courseId, projectId } = args

  return prisma.$transaction(async prisma => {
    const videos = await getVideosByProjectId(projectId)

    const videosData = videos.map(({ id, duration }) => ({ videoId: id, videoDuration: duration, courseId }))

    const lessons = await prisma.lesson.createManyAndReturn({
      data: videosData,
      skipDuplicates: true,
    })

    if (lessons.length == 0) throw new Error('No new lessons found to add.')

    const totalDuration = lessons.reduce((sum, { videoDuration }) => sum + videoDuration, 0)

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        duration: {
          increment: totalDuration,
        },
      },
    })

    return { lessons, course }
  })
}
