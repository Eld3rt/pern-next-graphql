import Link from 'next/link'
import { GetCoursesQuery, GetCoursesDocument } from '@/graphql/generated'
import { query } from '@/apollo/ApolloClient'

interface Props {}

const Page: React.FC<Props> = async () => {
  const { data } = await query<GetCoursesQuery>({
    query: GetCoursesDocument,
  })
  return (
    <>
      <h1>Список курсов</h1>
      <ul>
        {data.getCourses.map(course => (
          <li key={course.id}>
            <Link href={`/courses/${course.slug}`}>
              <h3>{course.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Page
