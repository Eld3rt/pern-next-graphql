'use client'

import { CourseFragment } from '@/graphql/generated'
import Link from 'next/link'

type Props = {
  course: CourseFragment
}

const CourseCard: React.FC<Props> = ({ course }) => {
  return (
    <li className="course-card__course bg-[#fbfaf8] border rounded-[16px]">
      <Link
        href={`/courses/${course.slug}`}
        className="course-card__link sm:flex sm:items-center sm:gap-x-[2rem] sm:flex-col sm:h-[100%]"
      >
        <div className="course-card__course-image flex justify-center sm:block sm:w-[100%] sm:mb-[0] lg:mb-[0.5rem]">
          <img
            src={course.imageURL}
            alt={course.name}
            loading="lazy"
            className="course-card__course-picture object-contain rounded-t-[16px] sm:rounded-[16px] lg:rounded-b-[0]"
          />
        </div>
        <div className="course-card__course-text flex flex-col py-[1.5rem] px-[1rem] lg:w-[100%] lg:h-[100%]">
          <h3 className="course-card__course-title text-xl md:text-2xl">{course.name}</h3>
          <p className="course-card__course-description text-sm mt-[0.8rem] mb-[1.5rem]">
            {course.description.slice(0, 100)}...
          </p>
          <span className="course-card__course-lessons-quantity mb-[0.5rem]">
            {`${course.topics.reduce((total, topic) => total + topic.lessons.length, 0)} уроков`}
          </span>
          <span className="course-card__course-duration mb-[0.5rem]">
            {`${Math.floor(course.duration / 3600)} ч. `}
            {`${Math.floor((course.duration % 3600) / 60)} мин.`}
          </span>
          <div className="course-card__course-prices text-xl mb-[1.5rem]">
            <span
              className={`course-card__course-price${
                course.price ? (course.reducedPrice < course.price ? ' price-with-discount' : '') : ' free-price'
              }`}
            >
              {course.price ? `${course.price}₽` : 'Бесплатно'}
            </span>
            {course.reducedPrice < course.price && (
              <span className="course-card__course-reduced-price text-orange-500">
                {!course.reducedPrice ? 'Бесплатно' : course.reducedPrice}₽
              </span>
            )}
          </div>
          <ul className="course-card__course-tag-list flex flex-wrap gap-x-[0.5rem] gap-y-[0.5rem] mt-[auto]">
            {course.tags.map(tag => (
              <li key={tag.id} className="course-card__course-tag tag border border-current">
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
