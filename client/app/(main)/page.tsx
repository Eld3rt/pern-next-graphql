import { getCurrentUser } from '@/utils/getCurrentUser'

interface Props {}

const Page: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser()

  return (
    <main>
      <h1>Привет, {currentUser?.name ?? currentUser?.email ?? 'пользователь'}!</h1>
    </main>
  )
}

export default Page
