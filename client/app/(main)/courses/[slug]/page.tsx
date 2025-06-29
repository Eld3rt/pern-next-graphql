import { query } from '@/apollo/ApolloClient'
import { notFound } from 'next/navigation'
import { GetCourseDataDocument, GetCourseDataQuery } from '@/graphql/generated'
import CourseIntro from '@/app/components/CourseIntro'
import CourseBrief from '@/app/components/CourseBrief'
import CourseProgram from '@/app/components/CourseProgram'
import CourseOffer from '@/app/components/CourseOffer'

interface Props {
  params: { slug: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params
  const { data } = await query<GetCourseDataQuery>({
    query: GetCourseDataDocument,
    variables: { slug },
  })

  if (!data.getCourseData) {
    return notFound()
  }

  const course = data.getCourseData

  return (
    <main className="course-page mb-8 md:mb-16">
      <CourseIntro slug={slug} course={course} />
      <CourseBrief course={course} />
      <CourseProgram course={course} />
      <CourseOffer slug={slug} course={course} />
    </main>
  )
}

export default Page
