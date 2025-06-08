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
    <>
      <ul>
        <li>
          <UpdateUserName currentName={currentUser.name} />
        </li>
        <li>
          <UpdateEmail currentEmail={currentUser.email} />
        </li>
      </ul>
      <Link href="/user/settings/password">Изменение пароля</Link>
    </>
  )
}

export default Page
