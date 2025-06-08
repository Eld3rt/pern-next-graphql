'use client'

import { CourseFragment } from '@/graphql/generated'
import CourseCard from '../CourseCard'

type Props = {
  entries: CourseFragment[]
}

const CourseList: React.FC<Props> = ({ entries }) => {
  return (
    <ul className="course-catalog__course-list flex flex-col gap-y-[1.5rem] gap-x-[2rem] sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-3">
      {entries?.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </ul>
  )
}

export default CourseList
