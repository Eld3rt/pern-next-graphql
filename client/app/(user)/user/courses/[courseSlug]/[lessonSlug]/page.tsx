'use client'

import LessonsFlips from '@/app/components/LessonFlips'
import LessonNavigation from '@/app/components/LessonNavigation'
import LessonVideo from '@/app/components/LessonVideo'
import { useGetLessonDataSuspenseQuery, useGetCourseLessonsSuspenseQuery } from '@/graphql/generated'
import { usePathname } from 'next/navigation'

interface Props {}

const Page: React.FC<Props> = () => {
  const pathname = usePathname()

  const segments = pathname.split('/')
  const courseSlug = segments[segments.length - 2] || ''
  const lessonSlug = segments[segments.length - 1] || ''

  const { data: lessonData } = useGetLessonDataSuspenseQuery({
    variables: {
      courseSlug,
      lessonSlug,
    },
  })

  const { data: lessonsInfoData } = useGetCourseLessonsSuspenseQuery({
    variables: {
      slug: courseSlug,
    },
  })

  const lesson = lessonData?.getLessonData || null

  const lessonsInfo = lessonsInfoData?.getCourseLessons || null

  return (
    lesson &&
    lessonsInfo && (
      <main className="lesson col-span-5 pb-8 md:pb-16 min-h-full">
        <LessonVideo videoURL={lesson.videoURL} />
        <LessonNavigation lessons={lessonsInfo} courseSlug={courseSlug} />
        <section className="lesson__text px-6 md:px-12">
          <span className="lesson__topic">{lesson.topic.name}</span>
          <h1 className="lesson__title text-2xl font-semibold mt-1 mb-8">{`${lesson.position}. ${lesson.name}`}</h1>
          <p className="lesson__content text-gray-700 mb-6">{lesson.content}</p>
        </section>
        <LessonsFlips lessons={lessonsInfo} currentPosition={lesson.position} courseSlug={courseSlug} />
      </main>
    )
  )
}

export default Page
