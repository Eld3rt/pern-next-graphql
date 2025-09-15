'use client'

import { CircularProgress } from '@mui/material'
import { useGetPurchasedCoursesSuspenseQuery } from '@/graphql/generated'
import { useTransition } from 'react'
import UserCourseList from '../UserCourseList'

type Props = {
  searchQuery: string
  searchTags: string[]
  sortField: string
  sortOrder: string
}

const UserCourses: React.FC<Props> = ({ searchQuery, searchTags, sortField, sortOrder }) => {
  const { data, fetchMore } = useGetPurchasedCoursesSuspenseQuery({
    variables: {
      tags: searchTags,
      query: searchQuery,
      sort: { field: sortField, order: sortOrder },
      first: 6,
    },
  })

  const nodes = data?.getPurchasedCourses?.edges.map(edge => edge.node)
  const pageInfo = data?.getPurchasedCourses?.pageInfo

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
    <div className="user-courses grid place-items-center pt-[2rem] pb-[0.5rem] px-[1rem] lg:w-[65%] xl:w-[75%] xl:w-[80%] 2xl:pt-[5rem] 2xl:pb-[1rem] 2xl:px-[2rem]">
      {!nodes?.length ? (
        <p className="user-courses-message py-3 px-10">Курсы не найдены.</p>
      ) : (
        <UserCourseList entries={nodes} />
      )}
      {isPending ? (
        <CircularProgress size={24} sx={{ color: '#732a46', margin: '16px' }} />
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

export default UserCourses
