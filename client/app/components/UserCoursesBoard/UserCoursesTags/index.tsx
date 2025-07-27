'use client'

import { useGetUserCoursesTagsSuspenseQuery } from '@/graphql/generated'
import { CircularProgress } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { IoClose } from 'react-icons/io5'
import CourseTagList from '../../ui/CourseTagList'

interface Props {
  setSearchTags: (searchTags: string[]) => void
}

const UserCoursesTags: React.FC<Props> = ({ setSearchTags }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const searchTags = searchParams.getAll('tag')
  const TAGS_LIMIT = 3

  const [isOpen, setIsOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState(searchTags)
  const [isPending, startTransition] = useTransition()
  const [visibleTags, setVisibleTags] = useState(TAGS_LIMIT)

  const { data } = useGetUserCoursesTagsSuspenseQuery()

  const tags = data?.getUserCoursesTags.slice(0, visibleTags)

  const hasNextPage = data?.getUserCoursesTags ? visibleTags < data?.getUserCoursesTags.length : false

  const toggleTagList = () => {
    setIsOpen(prev => !prev)
  }

  const handleTagSelection = (tagName: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tagName) ? prevTags.filter(t => t !== tagName) : [...prevTags, tagName]
    )
  }

  const handleClick = () => {
    params.delete('tag')
    selectedTags.forEach(tag => params.append('tag', tag))
    router.push(`?${params.toString()}`, { scroll: false })
    setSearchTags(selectedTags)
  }

  const handleShowMore = () => {
    startTransition(() => {
      setVisibleTags(prev => prev + TAGS_LIMIT)
    })
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div className="course-tag-list grid place-items-center lg:w-[35%] xl:w-[25%] 2xl:w-[20%] lg:block lg:border-r-2 border-current gap-y-[1rem] pt-[1.4rem] pb-[0.5rem] px-[1rem] lg:pt-[5rem] lg:pb-[1rem]">
      <button
        onClick={toggleTagList}
        className="course-tag-list__filter-title lg:pointer-events-none px-[1rem] py-[0.5rem] rounded-full border-2 border-current lg:p-[0] lg:border-[0]"
      >
        Фильтр по тегам
      </button>
      {searchTags.length > 0 && (
        <ul className="course-tag-list__filter-list flex flex-wrap justify-center gap-[0.4rem] lg:hidden">
          {searchTags.map((tag, i) => {
            return (
              <li key={i} className="course-tag-list__list-item">
                <p className="course-tag-list__search-tag px-4 py-2 border border-current rounded bg-[#732a46] text-white">
                  {tag}
                </p>
              </li>
            )
          })}
        </ul>
      )}
      {!tags?.length ? (
        <p className="course-tag-list__message py-3 px-10">Теги не найдены.</p>
      ) : (
        <div
          className={`${
            isOpen ? 'course-tag-list__tag-menu course-tag-list__tag-menu--active' : 'course-tag-list__tag-menu'
          }`}
        >
          <CourseTagList entries={tags} selectedTags={selectedTags} handleTagSelection={handleTagSelection} />
          <div className="course-tag-list__filter-buttons grid place-items-center">
            {isPending ? (
              <CircularProgress size={24} sx={{ color: '#732a46' }} />
            ) : (
              hasNextPage && (
                <button onClick={handleShowMore} className="course-tag-list__load-more mt-[2rem]">
                  Показать ещё
                </button>
              )
            )}
            <button
              onClick={() => {
                isOpen && setIsOpen(false)
                handleClick()
              }}
              className="course-tag-list__accept-filters mt-6 w-full px-[1rem] py-[0.5rem] rounded-full border-2 border-current"
            >
              Применить
            </button>
          </div>
          {isOpen && (
            <button
              className="course-tag-list__close modal-close z-[1] fixed top-0 right-0 p-[1rem]"
              onClick={() => setIsOpen(false)}
            >
              <IoClose className="w-8 h-8" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default UserCoursesTags
