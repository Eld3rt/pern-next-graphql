import { query } from '@/apollo/ApolloClient'
import { notFound } from 'next/navigation'
import { GetPurchasedCourseDataDocument, GetPurchasedCourseDataQuery } from '@/graphql/generated'

interface Props {
  params: { slug: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params
  const { data } = await query<GetPurchasedCourseDataQuery>({
    query: GetPurchasedCourseDataDocument,
    variables: { slug },
  })

  if (!data.getPurchasedCourseData) {
    notFound()
  }

  return (
    <>
      <h1>{data.getPurchasedCourseData.name}</h1>
    </>
  )
}

export default Page
