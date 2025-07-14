'use client'

import { PurchasedCourseFragment } from '@/graphql/generated'
import Link from 'next/link'

type Props = {
  course: PurchasedCourseFragment
}

const UserCourseCardMedium: React.FC<Props> = ({ course }) => {
  const totalLessons = course.topics.reduce((total, topic) => total + topic.lessons.length, 0)
  const completedLessons = course.courseProgress[0].lessonProgress.length
  const progressPercent = totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100

  return (
    <li className="user-course-card-medium bg-[#fbfaf8] border rounded-[16px]">
      <Link
        href={`/user/courses/${course.slug}`}
        className="user-course-card-medium__link block sm:flex sm:gap-x-[1rem] md:gap-x-[2rem] sm:flex-col sm:h-[100%]"
      >
        <div className="user-course-card-medium__image flex justify-center sm:block sm:w-[100%] sm:mb-[0] lg:mb-[0.5rem]">
          <img
            src={course.imageURL}
            alt={course.name}
            loading="lazy"
            className="user-course-card-medium__picture max-h-[200px] w-full object-contain rounded-t-[16px]"
          />
        </div>
        <div className="user-course-card-medium__text flex flex-col max-w-[267px] p-3 md:py-[1.5rem] md:px-[1rem] lg:w-[100%] md:h-[100%]">
          <h3 className="user-course-card-medium__title text-base text-center md:text-left md:text-xl">
            {course.name}
          </h3>
          {course.level && (
            <span className="user-course-card-medium-level text-xs text-gray-500 mt-2 text-center md:text-left">
              {course.level}
            </span>
          )}
          <div className="user-course-card-medium__progress mt-auto">
            <div className="flex justify-between items-center gap-x-2 mt-3 md:mt-[1.5rem] mb-[0.5rem]">
              <h4 className="user-course-card-medium__progress-title text-xs md:text-sm">Прогресс по курсу</h4>
              <span className="user-course-card-medium__progress-lessons text-xs text-gray-500">
                {completedLessons}/{totalLessons}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 mt-1 md:mt-2 mb-1">
              <div
                className="user-course-card-medium__progress-bar bg-green-500 h-2 md:h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default UserCourseCardMedium
