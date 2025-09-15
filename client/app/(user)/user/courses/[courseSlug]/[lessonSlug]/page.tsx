import LessonsFlips from '@/app/components/LessonFlips'
import LessonNavigation from '@/app/components/LessonNavigation'
import LessonText from '@/app/components/LessonText'
import LessonVideo from '@/app/components/LessonVideo'
import { getLessonData } from '@/utils/getLessonData'
import { getLessonsInfoData } from '@/utils/getLessonsInfoData'

interface Props {
  params: Promise<{ courseSlug: string; lessonSlug: string }>
}

const Page: React.FC<Props> = async ({ params }) => {
  const { courseSlug, lessonSlug } = await params

  const lesson = await getLessonData(courseSlug, lessonSlug)

  const lessonsInfo = await getLessonsInfoData(courseSlug)

  const isComplete = !!lesson?.lessonProgress.length

  return (
    lesson &&
    lessonsInfo && (
      <>
        <LessonVideo videoURL={lesson.videoURL} lessonId={lesson.id} courseSlug={courseSlug} isComplete={isComplete} />
        <LessonNavigation lessons={lessonsInfo} courseSlug={courseSlug} />
        <LessonText lesson={lesson} />
        <LessonsFlips lessons={lessonsInfo} currentPosition={lesson.position} courseSlug={courseSlug} />
      </>
    )
  )
}

export default Page
