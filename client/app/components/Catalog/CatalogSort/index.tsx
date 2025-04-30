'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type Props = {
  sortField: string
  sortOrder: string
  setSortField: (sortField: string) => void
  setSortOrder: (sortOrder: string) => void
}

const CatalogSort: React.FC<Props> = ({ sortField, sortOrder, setSortField, setSortOrder }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const sortOptions = {
    createdAt: 'По умолчанию',
    reducedPrice: 'По стоимости',
    duration: 'По длительности',
    popular: 'По популярности',
  }

  const [isOpen, setIsOpen] = useState(false)
  const sortPanel = useRef<HTMLDivElement | null>(null)

  const updateParam = (key: string, value: string) => {
    params.set(key, value)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleClick = (key: string) => {
    updateParam('sortField', key)
    setSortField(key)
    setIsOpen(!isOpen)
  }

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'desc' ? 'asc' : 'desc'
    updateParam('order', newOrder)
    setSortOrder(newOrder)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortPanel.current && !sortPanel.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={sortPanel} className="course-catalog__sort relative flex-col">
      <div className="course-catalog__sort-buttons relative flex items-center justify-end gap-x-[0.7rem]">
        <button onClick={() => setIsOpen(!isOpen)}>
          Сортировка: {sortOptions[sortField as keyof typeof sortOptions]}
        </button>
        <button
          onClick={() => {
            isOpen && setIsOpen(!isOpen)
            toggleSortOrder()
          }}
          className={`${sortOrder === 'desc' ? 'sort-icon-asc' : 'sort-icon-desc'} w-[24px] h-[24px]`}
        />
      </div>
      {isOpen && (
        <div className="course-catalog__sort-dropdown w-[276px] absolute right-0 bg-white shadow-lg rounded-lg p-3 mt-[0.5rem]">
          <ul className="course-catalog__sort-dropdown-list">
            {Object.entries(sortOptions).map(([key, label]) => (
              <li key={key}>
                <button
                  onClick={() => {
                    handleClick(key)
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CatalogSort
