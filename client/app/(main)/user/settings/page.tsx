import { notFound } from 'next/navigation'
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
      <UpdateUserName currentName={currentUser.name} />
      <UpdateEmail currentEmail={currentUser.email} />
    </>
  )
}

export default Page
