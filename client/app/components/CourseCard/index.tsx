'use client'

import Link from 'next/link'

type Props = {
  course: {
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
  }
}

const CourseCard: React.FC<Props> = ({ course }) => {
  return (
    <li className="course-catalog__course bg-[#fbfaf8] border rounded-[16px]">
      <Link
        href={`/courses/${course.slug}`}
        className="course-catalog__link sm:flex sm:items-center sm:gap-x-[2rem] sm:flex-col sm:h-[100%]"
      >
        <div className="course-catalog__course-image flex justify-center sm:block sm:w-[100%] sm:mb-[0] lg:mb-[0.5rem]">
          <img
            src={course.imageURL}
            alt={course.name}
            loading="lazy"
            className="course-catalog__course-picture object-contain rounded-t-[16px] sm:rounded-[16px] lg:rounded-b-[0]"
          />
        </div>
        <div className="course-catalog__course-text flex flex-col py-[1.5rem] px-[1rem] lg:w-[100%] lg:h-[100%]">
          <h3 className="course-catalog__course-title text-xl md:text-2xl">{course.name}</h3>
          <p className="course-catalog__course-description text-sm mt-[0.8rem] mb-[1.5rem]">
            {course.description.slice(0, 100)}...
          </p>
          <span className="course-catalog__course-lessons-quantity mb-[0.5rem]">{`${course.lessons.length} уроков`}</span>
          <span className="course-catalog__course-duration mb-[0.5rem]">
            {`${Math.floor(course.duration / 3600)} ч. `}
            {`${Math.floor((course.duration % 3600) / 60)} мин.`}
          </span>
          <div className="course-catalog__course-prices text-xl mb-[1.5rem]">
            <span
              className={`course-catalog__course-price${
                course.price ? (course.reducedPrice < course.price ? ' price-with-discount' : '') : ' free-price'
              }`}
            >
              {course.price ? `${course.price}₽` : 'Бесплатно'}
            </span>
            {course.reducedPrice < course.price && (
              <span className="course-catalog__course-reduced-price text-orange-500">
                {!course.reducedPrice ? 'Бесплатно' : course.reducedPrice}₽
              </span>
            )}
          </div>
          <ul className="course-catalog__course-tag-list flex flex-wrap gap-x-[0.5rem] gap-y-[0.5rem] mt-[auto]">
            {course.tags.map(tag => (
              <li key={tag.id} className="course-catalog__course-tag tag border border-current">
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </li>
  )
}

export default CourseCard
