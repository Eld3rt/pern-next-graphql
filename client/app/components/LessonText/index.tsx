'use client'

import { CourseColorContext } from '@/app/providers/CourseColorProvider'
import { LessonFragment } from '@/graphql/generated'
import chroma from 'chroma-js'
import { useContext } from 'react'
import CircleCheck from '../icons/CircleCheck'

interface Props {
  lesson: LessonFragment
}

const LessonText: React.FC<Props> = ({ lesson }) => {
  const { mainColor } = useContext(CourseColorContext)

  const darkenedColor = chroma(mainColor).darken(2).hex()

  const isCompleted = !!lesson.lessonProgress.length

  return (
    <section style={{ color: darkenedColor }} className="lesson__text px-6 md:px-12">
      <span className="lesson__topic">{lesson.topic.name}</span>
      <div className="lesson__head grid sm:flex gap-3 sm:gap-8 items-center mt-1 mb-8">
        <h1 className="lesson__title text-2xl font-semibold">{`${lesson.position}. ${lesson.name}`}</h1>
        {isCompleted && (
          <div className="lesson__progress-status flex gap-2">
            <CircleCheck width="25" height="25" className="" />
            <span className="user-lesson-card__text self-end">Урок пройден</span>
          </div>
        )}
      </div>
      <p className="lesson__content mb-6">{lesson.content}</p>
    </section>
  )
}

export default LessonText
