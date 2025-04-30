'use client'

import { Suspense, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import CatalogSearch from './CatalogSearch'
import CatalogSort from './CatalogSort'
import CatalogCourses from './CatalogCourses'
import CatalogTags from './CatalogTags'

type Props = {}

const Catalog: React.FC<Props> = () => {
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '')
  const [searchTags, setSearchTags] = useState(searchParams.getAll('tag'))
  const [sortField, setSortField] = useState(searchParams.get('sortField') || 'createdAt')
  const [sortOrder, setSortOrder] = useState(searchParams.get('order') || 'desc')

  return (
    <section className="courses-catalog mt-16">
      <div className="custom-container custom-container--wide">
        <div className="course-catalog__head flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center border-b-2 border-current gap-x-[2.5rem] gap-y-[2rem] py-[1rem]">
          <CatalogSearch setSearchQuery={setSearchQuery} />
          <CatalogSort
            sortField={sortField}
            sortOrder={sortOrder}
            setSortField={setSortField}
            setSortOrder={setSortOrder}
          />
        </div>
        <div className="lg:flex">
          <Suspense
            fallback={
              <div className="grid py-[4rem] lg:w-[20%]">
                <CircularProgress size={24} sx={{ color: '#732a46', marginTop: '10px', placeSelf: 'center' }} />
              </div>
            }
          >
            <CatalogTags setSearchTags={setSearchTags} />
          </Suspense>
          <Suspense
            fallback={
              <div className="grid py-[4rem] lg:w-[80%]">
                <CircularProgress size={24} sx={{ color: '#732a46', marginTop: '10px', placeSelf: 'center' }} />
              </div>
            }
          >
            <CatalogCourses
              searchQuery={searchQuery}
              searchTags={searchTags}
              sortField={sortField}
              sortOrder={sortOrder}
            />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default Catalog
