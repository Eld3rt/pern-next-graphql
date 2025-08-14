'use client'

import Link from 'next/link'
import chroma from 'chroma-js'
import CircleCheck from '../../icons/CircleCheck'

type Props = {
  lesson: {
    __typename?: 'Lesson'
    id: number
    name: string
    position: number
    slug: string
    videoDuration: number
    lessonProgress: Array<{
      __typename?: 'LessonProgress'
      id: number
    }>
  }
  color: string
  courseSlug: string
  dragDistance?: number
}

const UserLessonCard: React.FC<Props> = ({ lesson, color, courseSlug, dragDistance }) => {
  const lightenedColor = chroma(color).brighten(2).hex()
  const darkenedColor = chroma(color).darken(2).hex()
  const moreLightenedColor = chroma(color).brighten(3).hex()
  const moreDarkenedColor = chroma(color).darken(3).hex()

  const lessonNumberColor = chroma.contrast(color, lightenedColor) > 2.5 ? lightenedColor : darkenedColor
  const lessonNameColor = chroma.contrast(color, '#1f2431ff') > 4.5 ? moreDarkenedColor : moreLightenedColor

  const isCompleted = !!lesson.lessonProgress.length

  return (
    <li
      style={{ backgroundColor: color }}
      className="user-lesson-card rounded-2xl p-3 justify-between max-w-[300px] sm:min-w-[220px] sm:w-[220px] min-h-[68px] shadow-md"
    >
      <Link
        href={`/user/courses/${courseSlug}/${lesson.slug}`}
        className={`user-lesson-card__link flex sm:flex-col sm:justify-between items-center sm:items-start gap-3 h-full${
          dragDistance ? (dragDistance > 30 ? ' pointer-events-none select-none' : ' auto select-auto') : ''
        }`}
        draggable={dragDistance === undefined ? 'true' : 'false'}
      >
        <span
          style={{ color: lessonNumberColor }}
          className="user-lesson-card__text text-xs sm:text-sm sm:font-semibold self-center sm:self-start"
        >
          #{lesson.position}
        </span>
        <span
          style={{ color: lessonNameColor }}
          className="user-lesson-card__text text-xs sm:text-sm sm:font-semibold leading-tight"
        >
          {lesson.name}
        </span>
        <div className="user-lesson-card__right-info grid sm:flex sm:justify-between sm:w-full ml-auto self-end place-items-center gap-1">
          <span
            style={{ color: lessonNumberColor }}
            className="user-lesson-card__text text-nowrap text-xs ml-auto sm:text-sm self-end sm:font-bold"
          >
            {lesson.videoDuration >= 60 && `${Math.floor(lesson.videoDuration / 60)} мин`}
            {lesson.videoDuration < 60 && `${Math.floor(lesson.videoDuration)} сек`}
          </span>
          {isCompleted && (
            <>
              <CircleCheck className="sm:order-[-1]" color={lessonNumberColor} />

              <span
                style={{ color: lessonNumberColor }}
                className="user-lesson-card__text hidden sm:inline-flex order-[-1] text-xs self-end"
              >
                Урок пройден
              </span>
            </>
          )}
        </div>
      </Link>
    </li>
  )
}

export default UserLessonCard
