import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/utils/getCurrentUser'
import UpdateUserName from '@/app/components/UpdateUserName'
import UpdateEmail from '@/app/components/UpdateEmail'

interface Props {}

const Page: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    notFound()
  }

  return (
    <main className="settings col-span-1 md:col-span-5 mb-8 md:mb-16 pt-10 px-6 md:p-12">
      <section className="settings__head">
        <h1 className="settings__title text-2xl text-center md:text-3xl md:text-left mb-6 md:mb-8 font-bold">
          Настройки
        </h1>
      </section>
      <section className="settings__forms">
        <ul className="settings__list">
          <li className="settings__list-item">
            <UpdateUserName currentName={currentUser.name} />
          </li>
          <li>
            <UpdateEmail currentEmail={currentUser.email} />
          </li>
        </ul>
      </section>
      <section className="settings__links">
        <Link href="/user/settings/password" className="block mt-[2rem] text-center md:text-left">
          Изменение пароля
        </Link>
      </section>
    </main>
  )
}

export default Page
