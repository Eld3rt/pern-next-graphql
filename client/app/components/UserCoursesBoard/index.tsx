'use client'

import { Suspense, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import UserCourses from './UserCourses'
import UserCoursesTags from './UserCoursesTags'
import CourseSearchFilter from '../ui/CourseSearchFilter'
import CoursesSort from '../ui/CoursesSort'

type Props = {}

const UserCoursesBoard: React.FC<Props> = () => {
  const searchParams = useSearchParams()

  const sortOptions = {
    createdAt: 'По умолчанию',
    duration: 'По длительности',
    progress: 'По прогрессу',
  }

  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '')
  const [searchTags, setSearchTags] = useState(searchParams.getAll('tag'))
  const [sortField, setSortField] = useState(searchParams.get('sortField') || 'createdAt')
  const [sortOrder, setSortOrder] = useState(searchParams.get('order') || 'desc')

  return (
    <section className="user-courses-board flex-1 col-span-1 md:col-span-5">
      <div className="user-courses-board__head flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center border-b-2 border-current gap-x-[2.5rem] gap-y-[2rem] py-[1rem]">
        <CourseSearchFilter setSearchQuery={setSearchQuery} />
        <CoursesSort
          sortOptions={sortOptions}
          sortField={sortField}
          sortOrder={sortOrder}
          setSortField={setSortField}
          setSortOrder={setSortOrder}
        />
      </div>
      <div className="user-courses-board__main lg:flex">
        <Suspense
          fallback={
            <div className="user-courses-board__spinner grid py-[4rem] lg:w-[20%]">
              <CircularProgress size={24} sx={{ color: '#732a46', marginTop: '10px', placeSelf: 'center' }} />
            </div>
          }
        >
          <UserCoursesTags setSearchTags={setSearchTags} />
        </Suspense>
        <Suspense
          fallback={
            <div className="user-courses-board__spinner grid py-[4rem] lg:w-[80%]">
              <CircularProgress size={24} sx={{ color: '#732a46', marginTop: '10px', placeSelf: 'center' }} />
            </div>
          }
        >
          <UserCourses searchQuery={searchQuery} searchTags={searchTags} sortField={sortField} sortOrder={sortOrder} />
        </Suspense>
      </div>
    </section>
  )
}

export default UserCoursesBoard
