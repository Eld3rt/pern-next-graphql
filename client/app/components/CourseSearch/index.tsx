'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { debounce } from 'lodash'
import { CircularProgress } from '@mui/material'
import { useGetCoursesByStringLazyQuery } from '@/graphql/generated'

interface Props {}

const CourseSearch: React.FC<Props> = () => {
  const [getCourses, { data, loading, error }] = useGetCoursesByStringLazyQuery()
  const [isOpen, setIsOpen] = useState(false)
  const searchBarRef = useRef<HTMLDivElement | null>(null)

  const handleChange = (e: any) => {
    const value = e.target.value.toLowerCase()
    if (value) {
      setIsOpen(true)
    }
    handleSearch(value)
  }

  const handleSearch = debounce(async query => {
    await getCourses({
      variables: {
        query: query,
      },
    })
  }, 250)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={searchBarRef} className="course-search__bar w-9/12 grid place-items-center relative">
      <input
        name="search"
        type="text"
        placeholder="Найти курс"
        onClick={() => setIsOpen(true)}
        onChange={handleChange}
        className="course-search__input py-2 px-10 w-full border-2 border-current rounded-full search-icon z-50"
      />
      {isOpen && data?.getCoursesByString && (
        <div className="course-search__modal absolute top-0 left-0 w-full bg-white shadow-lg rounded-lg pb-4 pt-12">
          {loading ? (
            <CircularProgress size={24} sx={{ color: '#732a46', marginTop: '10px' }} />
          ) : error ? (
            <p>{error.message}</p>
          ) : !loading && data?.getCoursesByString && !data.getCoursesByString.length ? (
            <p className="course-search__message py-3 px-10">Курсы не найдены.</p>
          ) : (
            data?.getCoursesByString.length && (
              <ul className="course-search__list w-full py-3 rounded-lg">
                {data?.getCoursesByString.map(course => (
                  <li key={course.id} className="course-search__list-item py-2 px-10">
                    <Link href={`/courses/${course.slug}`} className="course-search__link">
                      <h4 className="course-search__name">{course.name}</h4>
                    </Link>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default CourseSearch
