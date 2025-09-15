'use client'

import { CourseColorContext } from '@/app/providers/CourseColorProvider'
import { useContext } from 'react'

interface Props {}

const LessonVideoSkeleton: React.FC<Props> = () => {
  const { mainColor } = useContext(CourseColorContext)

  return (
    <div className="relative">
      <div
        style={{ backgroundColor: mainColor }}
        className="absolute inset-0 lg:p-[3rem] mx-auto w-full h-[300px] 2xl:w-[75%] lg:h-[550px] rounded-xl animate-pulse"
      />
    </div>
  )
}

export default LessonVideoSkeleton
