'use client'

import Link from 'next/link'
import chroma from 'chroma-js'

type Props = {
  lesson: {
    __typename?: 'Lesson'
    id: number
    name: string
    slug: string
    videoDuration: number
  }
  color: string
}

const getLessonNumber = (slug: string) => {
  const match = slug.match(/lesson-(\d+)/)
  return match ? Number(match[1]) : null
}

const UserLessonCard: React.FC<Props> = ({ lesson, color }) => {
  const lessonNumber = getLessonNumber(lesson.slug)

  const lightenedColor = chroma(color).brighten(2).hex()
  const darkenedColor = chroma(color).darken(2).hex()

  const lessonNumberColor = chroma.contrast(color, lightenedColor) > 2.5 ? lightenedColor : darkenedColor
  const lessonNameColor = chroma.contrast(color, '#1f2431ff') > 4.5 ? '#1f2431ff' : 'white'
  const lessonDurationColor = chroma.contrast(color, '#F7C873') > 4.5 ? '#F7C873' : '#701437'

  return (
    <li
      style={{ backgroundColor: color }}
      className="rounded-2xl p-4 flex flex-col justify-between max-w-[300px] sm:w-[220px] shadow-md"
    >
      <Link href={lesson.slug} className="flex sm:flex-col sm:justify-between gap-3 sm:gap-1 h-full">
        <span style={{ color: lessonNumberColor }} className="text-xs sm:text-sm sm:font-semibold">
          #{lessonNumber}
        </span>
        <span style={{ color: lessonNameColor }} className="text-xs sm:text-sm sm:font-semibold leading-tight">
          {lesson.name}
        </span>
        <span
          style={{ color: lessonDurationColor }}
          className="text-nowrap text-xs ml-auto sm:text-sm self-end sm:font-bold"
        >
          {lesson.videoDuration >= 60 && `${Math.floor(lesson.videoDuration / 60)} мин`}
          {lesson.videoDuration < 60 && `${Math.floor(lesson.videoDuration)} сек`}
        </span>
      </Link>
    </li>
  )
}

export default UserLessonCard
