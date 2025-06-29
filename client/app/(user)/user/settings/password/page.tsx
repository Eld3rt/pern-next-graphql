import UpdatePassword from '@/app/components/UpdatePassword'

interface Props {}

const Page: React.FC<Props> = () => {
  return (
    <main className="settings-password col-span-1 md:col-span-5 mb-8 md:mb-16 pt-10 px-6 md:p-12">
      <section className="settings-password__head">
        <h1 className="settings-password__title text-2xl text-center md:text-3xl md:text-left mb-6 md:mb-8 font-bold">
          Изменение пароля
        </h1>
      </section>
      <section className="settings-password__forms grid justify-items-center md:justify-items-start">
        <UpdatePassword />
      </section>
    </main>
  )
}

export default Page
