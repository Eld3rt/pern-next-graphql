'use client'

import { CircularProgress } from '@mui/material'
import { useGetCoursesSuspenseQuery } from '@/graphql/generated'
import { useTransition } from 'react'
import CourseList from '../../ui/CourseList'

type Props = {
  searchQuery: string
  searchTags: string[]
  sortField: string
  sortOrder: string
}

const CatalogCourses: React.FC<Props> = ({ searchQuery, searchTags, sortField, sortOrder }) => {
  const { data, fetchMore } = useGetCoursesSuspenseQuery({
    variables: {
      tags: searchTags,
      query: searchQuery,
      sort: { field: sortField, order: sortOrder },
      first: 6,
    },
  })

  const nodes = data?.getCourses.edges.map(edge => edge.node)
  const pageInfo = data?.getCourses.pageInfo

  const [isPending, startTransition] = useTransition()

  const handleLoadMore = () => {
    startTransition(async () => {
      await fetchMore({
        variables: {
          cursor: pageInfo?.endCursor,
        },
      })
    })
  }

  return (
    <div className="course-catalog__courses grid place-items-center pt-[2rem] pb-[0.5rem] px-[1rem] lg:w-[80%] lg:pt-[5rem] lg:pb-[1rem] lg:px-[2rem]">
      {!nodes?.length ? (
        <p className="course-catalog__courses-message py-3 px-10">Курсы не найдены.</p>
      ) : (
        <CourseList entries={nodes} />
      )}
      {isPending ? (
        <CircularProgress size={24} sx={{ color: '#732a46' }} />
      ) : (
        pageInfo?.hasNextPage && (
          <button onClick={handleLoadMore} className="mt-[2rem]">
            Показать ещё
          </button>
        )
      )}
    </div>
  )
}

export default CatalogCourses
