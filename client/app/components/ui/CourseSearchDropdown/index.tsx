'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { debounce } from 'lodash'
import { CircularProgress } from '@mui/material'
import { LazyQueryExecFunction, OperationVariables } from '@apollo/client'
import { InputMaybe } from '@/graphql/generated'

interface SearchVariables extends OperationVariables {
  query?: InputMaybe<string>
  first?: number
}

type SearchedCourse = {
  id: number
  name: string
  slug: string
}

interface Props<TData, TVariables extends SearchVariables> {
  getSearchResults: LazyQueryExecFunction<TData, TVariables>
  data: TData | undefined
  loading: boolean
  extractNodes: (data: TData | undefined) => SearchedCourse[]
  extractPageInfo: (data: TData | undefined) => { hasNextPage: boolean } | undefined
}

const CourseSearchDropdown = <TData, TVariables extends SearchVariables>({
  getSearchResults,
  data,
  loading,
  extractNodes,
  extractPageInfo,
}: Props<TData, TVariables>) => {
  const nodes = extractNodes(data)
  const pageInfo = extractPageInfo(data)

  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState<string>()
  const searchBarRef = useRef<HTMLDivElement | null>(null)

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setQuery(value)
    if (!value) return
    setIsOpen(true)
    handleSearch(value)
  }, 1250)

  const handleSearch = async (searchQuery: string) => {
    const variables = {
      query: searchQuery,
      first: 12,
    } as TVariables

    await getSearchResults({ variables })
  }

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
    <div ref={searchBarRef} className="course-search__bar md:w-9/12 grid place-items-center relative">
      <input
        name="search"
        type="text"
        placeholder="Найти курс"
        autoComplete="off"
        onClick={() => !isOpen && query && setIsOpen(true)}
        onChange={handleChange}
        className="course-search__input py-2 px-10 w-full border-2 border-current rounded-full search-icon z-50"
      />
      {isOpen && (
        <div className="course-search__modal grid place-items-center absolute top-0 left-0 w-full bg-white shadow-lg rounded-lg pb-4 pt-12">
          {loading ? (
            <CircularProgress size={24} sx={{ color: '#732a46', marginTop: '10px' }} />
          ) : data && !nodes?.length ? (
            <p className="course-search__message py-3 px-10">Курсы не найдены.</p>
          ) : (
            <ul className="course-search__list w-full py-3 rounded-lg">
              {nodes?.map(course => (
                <li key={course.id} className="course-search__list-item py-2 px-10">
                  <Link href={`/courses/${course.slug}`} className="course-search__link">
                    <h4 className="course-search__name">{course.name}</h4>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {pageInfo?.hasNextPage && (
            <Link href={`/courses?query=${query}`} className="course-show-all__link flex place-self-end">
              <h5 className="course-show-all_text text-sm px-10 text-right">Показать все результаты</h5>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default CourseSearchDropdown
