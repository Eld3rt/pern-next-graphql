import { getPurchasedCoursesWithProgress } from '@/utils/getPurchasedCoursesWithProgress'
import UserCourseCardSmall from '../ui/UserCourseCardSmall'

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
      <ul className="dashboard-continue__course-list grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
        {courses.map(course => (
          <UserCourseCardSmall key={course.id} course={course} />
        ))}
      </ul>
    </section>
  )
}

export default DashboardContinue
