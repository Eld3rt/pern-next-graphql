'use client'

import { useGetTagsSuspenseQuery } from '@/graphql/generated'
import { CircularProgress } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { IoClose } from 'react-icons/io5'
import CourseTagList from '../../ui/CourseTagList'

type Props = {
  setSearchTags: (searchTags: string[]) => void
}

const CatalogTags: React.FC<Props> = ({ setSearchTags }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const searchTags = searchParams.getAll('tag')

  const { data, fetchMore } = useGetTagsSuspenseQuery({
    variables: {
      first: 15,
    },
  })

  const nodes = data?.getTags.edges.map(edge => edge.node)
  const pageInfo = data?.getTags.pageInfo

  const [isOpen, setIsOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState(searchTags)
  const [isPending, startTransition] = useTransition()

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

  const handleLoadMore = () => {
    startTransition(async () => {
      await fetchMore({
        variables: {
          cursor: pageInfo?.endCursor,
        },
      })
    })
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
    } else {
      document.body.style.overflow = 'auto'
      document.body.style.position = 'static'
    }
  }, [isOpen])

  return (
    <div className="course-catalog__sidebar grid place-items-center lg:w-[20%] lg:block lg:border-r-2 border-current gap-y-[1rem] pt-[1.4rem] pb-[0.5rem] px-[1rem] lg:pt-[5rem] lg:pb-[1rem]">
      <button
        onClick={toggleTagList}
        className="course-catalog__filter-title lg:pointer-events-none px-[1rem] py-[0.5rem] rounded-full border-2 border-current lg:p-[0] lg:border-[0]"
      >
        Фильтр по тегам
      </button>
      {searchTags.length > 0 && (
        <ul className="course-catalog__filter-list flex flex-wrap justify-center gap-[0.4rem] lg:hidden">
          {searchTags.map((tag, i) => {
            return (
              <li key={i}>
                <p className="px-4 py-2 border border-current rounded bg-[#732a46] text-white">{tag}</p>
              </li>
            )
          })}
        </ul>
      )}
      {!nodes?.length ? (
        <p className="course-catalog__sidebar-message py-3 px-10">Теги не найдены.</p>
      ) : (
        <div
          className={`${
            isOpen ? 'course-tag-list__tag-menu course-tag-list__tag-menu--active' : 'course-tag-list__tag-menu'
          }`}
        >
          <CourseTagList entries={nodes} selectedTags={selectedTags} handleTagSelection={handleTagSelection} />
          <div className="course-catalog__filter-buttons grid place-items-center">
            {isPending ? (
              <CircularProgress size={24} sx={{ color: '#732a46' }} />
            ) : (
              pageInfo?.hasNextPage && (
                <button onClick={handleLoadMore} className="mt-[2rem]">
                  Показать ещё
                </button>
              )
            )}
            <button
              onClick={() => {
                isOpen && setIsOpen(false)
                handleClick()
              }}
              className="mt-6 w-full px-[1rem] py-[0.5rem] rounded-full border-2 border-current"
            >
              Применить
            </button>
          </div>
          {isOpen && (
            <button className="modal-close z-[1] fixed top-0 right-0 p-[1rem]" onClick={() => setIsOpen(false)}>
              <IoClose className="w-8 h-8" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default CatalogTags
