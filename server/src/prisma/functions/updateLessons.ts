import { Course, Lesson } from '@prisma/client'
import { prisma } from '../prisma'
import { getVideosByProjectId } from '../../kinescope/getVideos'

export const updateLessons = async (args: {
  projectId: string
  courseId: number
}): Promise<{ lessons: Lesson[]; course: Course | null }> => {
  const { courseId, projectId } = args

  return prisma.$transaction(async prisma => {
    const videos = await getVideosByProjectId(projectId)

    const updatedLessons: Lesson[] = []
    for (const { id, embed_link, duration } of videos) {
      const updatedLesson = await prisma.lesson.update({
        where: { videoId: id },
        data: {
          videoURL: embed_link,
          videoDuration: duration,
        },
      })
      updatedLessons.push(updatedLesson)
    }

    const totalDuration = updatedLessons.reduce((sum, { videoDuration }) => sum + videoDuration, 0)

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        duration: totalDuration,
      },
    })

    return { lessons: updatedLessons, course }
  })
}
