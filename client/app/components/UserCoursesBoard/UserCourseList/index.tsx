'use client'

import { PurchasedCourseFragment } from '@/graphql/generated'
import UserCourseCardMedium from '../../ui/UserCourseCardMedium'

type Props = {
  entries: PurchasedCourseFragment[]
}

const UserCourseList: React.FC<Props> = ({ entries }) => {
  return (
    <ul className="user-course-list flex flex-wrap justify-center gap-y-[1.5rem] gap-x-[2rem] sm:grid sm:grid-cols-2 lg:grid xl:grid-cols-3">
      {entries?.map(course => (
        <UserCourseCardMedium key={course.id} course={course} />
      ))}
    </ul>
  )
}

export default UserCourseList
