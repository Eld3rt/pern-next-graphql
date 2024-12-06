import Link from 'next/link'
import { getPurchasedCourses } from '@/utils/getPurchasedCourses'

interface Props {}

const Page: React.FC<Props> = async () => {
  const purchasedCourses = await getPurchasedCourses()

  return (
    <ul>
      Приобретенные курсы
      {purchasedCourses?.map(course => (
        <li key={course.id}>
          <Link href={`/user/courses/${course.slug}`}>
            <h3>{course.name}</h3>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Page
