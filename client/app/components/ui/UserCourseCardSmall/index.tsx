'use client'

import { PurchasedCourseFragment } from '@/graphql/generated'
import Link from 'next/link'

type Props = {
  course: PurchasedCourseFragment
}

const UserCourseCardSmall: React.FC<Props> = ({ course }) => {
  const totalLessons = course.topics.reduce((total, topic) => total + topic.lessons.length, 0)

  return (
    <li className="user-course-card-small bg-[#fbfaf8] border rounded-[16px]">
      <Link
        href={`/user/courses/${course.slug}`}
        className="user-course-card-small__link block p-3 flex gap-x-[1rem] xl:gap-x-[2rem] sm:h-[100%]"
      >
        <div className="user-course-card-small__image flex justify-center md:mb-3 sm:mb-0 w-[40%] xl:w-[30%]">
          {
            <img
              src={course.smallImageURL}
              alt={course.name}
              loading="lazy"
              className="user-course-card-small__picture max-h-[150px] md:max-h-[200px] w-full object-contain rounded-[8px] sm:rounded-[16px]"
            />
          }
        </div>
        <div className="user-course-card-small__text flex flex-col w-[60%] xl:w-[70%]">
          <h3 className="user-course-card-small__title text-base md:text-xl line-clamp-2">{course.name}</h3>
          <ul className="user-course-card-small__tags flex flex-wrap gap-x-[0.5rem] gap-y-[0.5rem] py-2 xl:py-4 mt-auto">
            {course.tags
              .filter(tag => tag.name !== course.level)
              .map(tag => (
                <li key={tag.id} className="user-course-card-small__tag tag tag--small border border-current text-xs">
                  {tag.name}
                </li>
              ))}
          </ul>
          <div className="user-course-card-small__info xl:flex text-xs text-gray-500">
            <span className="user-course-card-small__progress-lessons block mb-1">{`${totalLessons} уроков`}</span>
            {course.level && <span className="user-course-card-small__progress-level block">{course.level}</span>}
          </div>
        </div>
      </Link>
    </li>
  )
}

export default UserCourseCardSmall
