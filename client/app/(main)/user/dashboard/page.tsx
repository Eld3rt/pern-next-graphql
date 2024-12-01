import Link from 'next/link'
import { getCurrentUser } from '@/utils/getCurrentUser'
import { getPurchasedCourses } from '@/utils/getPurchasedCourses'

interface Props {}

const Page: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser()
  const purchasedCourses = await getPurchasedCourses()

  return (
    <>
      <h1>Привет, {currentUser?.name ?? currentUser?.email ?? 'пользователь'}!</h1>
      <ul>
        Приобретенные курсы:
        {purchasedCourses?.map(course => (
          <li key={course.id}>
            <h3>{course.name}</h3>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Page
