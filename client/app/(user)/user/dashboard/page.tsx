import { getCurrentUser } from '@/utils/getCurrentUser'
import DashboardContinue from '@/app/components/DashboardContinue'
import DashboardSearch from '@/app/components/DashboardSearch'
import DashboardUserCourses from '@/app/components/DashboardUserCourses'

interface Props {}

const Page: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser()

  return (
    <main className="dashboard flex-1 col-span-1 md:col-span-5 mb-8 md:mb-16 pt-10 px-6 md:p-12">
      <section className="dashboard__head">
        <h1 className="dashboard__title text-2xl text-center md:text-3xl md:text-left font-bold">
          Привет{currentUser?.name ? `, ${currentUser.name}!` : '!'}
        </h1>
        <p className="dashboard__description text-gray-600 text-center md:text-left my-6 md:my-8">
          Рады видеть Вас! <br /> Надеемся, что обучение сегодня будет продуктивным!
        </p>
      </section>
      <DashboardSearch />
      <DashboardContinue />
      <DashboardUserCourses />
    </main>
  )
}

export default Page
