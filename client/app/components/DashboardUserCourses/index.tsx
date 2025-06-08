import { getPurchasedCourses } from '@/utils/getPurchasedCourses'
import DashboardCourseCardSmall from '../DashboardCourseCardSmall'
import Link from 'next/link'

type Props = {}

const DashboardUserCourses: React.FC<Props> = async () => {
  const data = await getPurchasedCourses()

  const nodes = data?.edges.map(edge => edge.node)

  return (
    <section className="dashboard-user-courses mt-[2rem] md:mt-[3rem] lg:mt-[4rem]">
      <div className="dashboard-user-courses__head flex justify-between items-center">
        <h2 className="dashboard-user-courses__title text-lg text-center md:text-left md:text-xl font-semibold">
          Твои курсы
        </h2>
        <Link href="/user/courses" className="dashboard-user-courses__link bg-right text-xs md:text-sm arrow-icon pr-7">
          Смотреть все
        </Link>
      </div>
      <ul className="dashboard-user-courses__course-list grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
        {nodes?.map(course => (
          <DashboardCourseCardSmall key={course.id} course={course} />
        ))}
      </ul>
    </section>
  )
}

export default DashboardUserCourses
