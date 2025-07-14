import { PurchasedCourseFragment } from '@/graphql/generated'
import UserCourseLessonList from './UserCourseLessonsByTopics'

type Props = {
  course: PurchasedCourseFragment
}

const UserCourseLessonsBoard: React.FC<Props> = ({ course }) => {
  const topics = course.topics
  const color = course.mainColor

  return (
    <section className="user-course-lessons-board flex-1 px-6 md:px-12">
      <div className="user-course-lessons-board__head flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center gap-x-[2.5rem] gap-y-[2rem] py-[2rem] sm:py-[2.5rem]">
        <h2 className="user-course-lessons__head text-lg md:text-xl font-semibold">Доска уроков</h2>
      </div>
      <div className="user-course-lessons-board__main lg:flex">
        <UserCourseLessonList entries={topics} color={color} />
      </div>
    </section>
  )
}

export default UserCourseLessonsBoard
