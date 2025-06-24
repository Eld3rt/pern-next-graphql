import { getPurchasedCoursesWithProgress } from '@/utils/getPurchasedCoursesWithProgress'
import UserCourseCardMedium from '../ui/UserCourseCardMedium'

type Props = {}

const DashboardContinue: React.FC<Props> = async () => {
  const courses = await getPurchasedCoursesWithProgress()

  return (
    <section className="dashboard-continue mt-[2rem] md:mt-[3rem] lg:mt-[4rem]">
      <div className="dashboard-continue__head flex justify-center md:justify-start items-center">
        <h2 className="dashboard-continue__title text-lg text-center md:text-left md:text-xl font-semibold">
          Продолжить обучение
        </h2>
      </div>
      <ul className="dashboard-continue__course-list flex justify-center md:justify-start gap-4 flex-wrap md:gap-6 mt-4 sm:mt-6">
        {courses.map(course => (
          <UserCourseCardMedium key={course.id} course={course} />
        ))}
      </ul>
    </section>
  )
}

export default DashboardContinue
