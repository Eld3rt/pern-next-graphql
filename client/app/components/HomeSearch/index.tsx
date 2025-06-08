'use client'

import { GetCoursesQuery, GetCoursesQueryVariables, useGetCoursesLazyQuery } from '@/graphql/generated'
import CourseSearchDropdown from '../ui/CourseSearchDropdown'

interface Props {}

const HomeSearch: React.FC<Props> = () => {
  const [getCourses, { data, loading }] = useGetCoursesLazyQuery()

  const extractNodes = (data: GetCoursesQuery | undefined) => data?.getCourses?.edges?.map(edge => edge.node) || []

  const extractPageInfo = (data: GetCoursesQuery | undefined) => data?.getCourses?.pageInfo

  return (
    <CourseSearchDropdown<GetCoursesQuery, GetCoursesQueryVariables>
      getSearchResults={getCourses}
      data={data}
      loading={loading}
      extractNodes={extractNodes}
      extractPageInfo={extractPageInfo}
    />
  )
}

export default HomeSearch
