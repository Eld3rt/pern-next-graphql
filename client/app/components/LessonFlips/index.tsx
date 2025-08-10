'use client'

import { CourseColorContext } from '@/app/providers/CourseColorProvider'
import { LessonInfoFragment } from '@/graphql/generated'
import chroma from 'chroma-js'
import Link from 'next/link'
import { useContext } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

interface Props {
  lessons: LessonInfoFragment[]
  currentPosition: number
  courseSlug: string
}

const LessonsFlips: React.FC<Props> = ({ lessons, currentPosition, courseSlug }) => {
  const { mainColor } = useContext(CourseColorContext)

  const moreLightenedColor = chroma(mainColor).brighten(3).hex()
  const moreDarkenedColor = chroma(mainColor).darken(3).hex()

  const lessonNameColor = chroma.contrast(mainColor, '#1f2431ff') > 4.5 ? moreDarkenedColor : moreLightenedColor

  const prevLesson = currentPosition > 1 ? lessons[currentPosition - 2] : null
  const nextLesson = currentPosition < lessons.length ? lessons[currentPosition] : null

  return (
    <section
      className={`lesson-flips flex ${
        prevLesson && nextLesson ? 'justify-between' : prevLesson ? 'justify-start' : 'justify-end'
      } mt-[3rem] lg:mt-[5rem]`}
    >
      {prevLesson && (
        <div className="flex items-center gap-2 min-h-[48px] content-between">
          <FaChevronLeft fill={mainColor} className="lesson-flips__arrow text-gray-500 text-xl" />
          <Link
            href={`/user/courses/${courseSlug}/lesson-${currentPosition - 1}`}
            style={{ backgroundColor: mainColor }}
            className="lesson-flips__link w-[130px] sm:w-[200px] h-full rounded-lg p-2 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <h3
              style={{ color: lessonNameColor }}
              className="lesson-flips__title lesson-flips__title text-xs text-center sm:text-sm leading-tight"
            >
              {currentPosition - 1}. {prevLesson.name}
            </h3>
          </Link>
        </div>
      )}

      {nextLesson && (
        <div className="flex items-center gap-2 min-h-[48px] content-between">
          <Link
            href={`/user/courses/${courseSlug}/lesson-${currentPosition + 1}`}
            style={{ backgroundColor: mainColor }}
            className="lesson-flips__link w-[130px] sm:w-[200px] h-full rounded-lg p-2 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <h3
              style={{ color: lessonNameColor }}
              className="lesson-flips__title text-xs text-center sm:text-sm leading-tight"
            >
              {currentPosition + 1}. {nextLesson.name}
            </h3>
          </Link>
          <FaChevronRight fill={mainColor} className="lesson-flips__arrow text-gray-500 text-xl" />
        </div>
      )}
    </section>
  )
}

export default LessonsFlips
