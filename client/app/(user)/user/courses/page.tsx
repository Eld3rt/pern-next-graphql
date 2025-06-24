import UserCoursesBoard from '@/app/components/UserCoursesBoard'

interface Props {}

const Page: React.FC<Props> = async () => {
  return (
    <main className="user-courses flex-1 col-span-1 md:col-span-5 pt-10 px-6 2xl:p-12">
      <section className="user-courses__head">
        <h1 className="user-courses__title text-2xl text-center md:text-3xl md:text-left font-bold">Твои курсы</h1>
        <p className="user-courses__description text-gray-600 text-center md:text-left my-6 md:my-8">
          Здесь ты можешь найти все добавленные тобой курсы!
        </p>
      </section>
      <UserCoursesBoard />
    </main>
  )
}

export default Page
