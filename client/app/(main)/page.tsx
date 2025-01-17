import { getCurrentUser } from '@/utils/getCurrentUser'
import CourseSearch from '../components/CourseSearch'

interface Props {}

const Page: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser()

  return (
    <main>
      <h1>Привет, {currentUser?.name?.trim() || currentUser?.email || 'пользователь'}!</h1>
      <CourseSearch></CourseSearch>
    </main>
  )
}

export default Page
