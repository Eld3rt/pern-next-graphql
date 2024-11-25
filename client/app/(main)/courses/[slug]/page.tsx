import { query } from '@/apollo/ApolloClient'
import { notFound } from 'next/navigation'
import PurchaseCourseButton from '@/app/components/buttons/PurchaseCourseButton'
import { GetCourseInfoDocument, GetCourseInfoQuery } from '@/graphql/generated'

interface Props {
  params: { slug: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params
  const { data } = await query<GetCourseInfoQuery>({
    query: GetCourseInfoDocument,
    variables: { slug },
  })

  if (!data.getCourseData) {
    notFound()
  }

  return (
    <>
      <h1>{data.getCourseData.name}</h1>
      <PurchaseCourseButton courseId={data.getCourseData.id} slug={slug} />
    </>
  )
}

export default Page
