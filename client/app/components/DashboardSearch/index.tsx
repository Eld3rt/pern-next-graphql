'use client'

import {
  GetPurchasedCoursesQuery,
  GetPurchasedCoursesQueryVariables,
  useGetPurchasedCoursesLazyQuery,
} from '@/graphql/generated'
import CourseSearchDropdown from '../ui/CourseSearchDropdown'

interface Props {}

const DashboardSearch: React.FC<Props> = () => {
  const [getPurchasedCourses, { data, loading }] = useGetPurchasedCoursesLazyQuery()

  const extractNodes = (data: GetPurchasedCoursesQuery | undefined) =>
    data?.getPurchasedCourses?.edges?.map(edge => edge.node) || []

  const extractPageInfo = (data: GetPurchasedCoursesQuery | undefined) => data?.getPurchasedCourses?.pageInfo

  return (
    <CourseSearchDropdown<GetPurchasedCoursesQuery, GetPurchasedCoursesQueryVariables>
      getSearchResults={getPurchasedCourses}
      data={data}
      loading={loading}
      extractNodes={extractNodes}
      extractPageInfo={extractPageInfo}
    />
  )
}

export default DashboardSearch
