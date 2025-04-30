'use client'

import CourseCard from '../CourseCard'

type Props = {
  entries: {
    __typename?: 'Course'
    id: number
    name: string
    description: string
    imageURL: string
    duration: number
    price: number
    reducedPrice: number
    discountValue: number
    slug: string
    tags: Array<{
      __typename?: 'Tag'
      id: number
      name: string
    }>
    lessons: Array<{
      __typename?: 'Lesson'
      id: number
      name: string
    }>
  }[]
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
