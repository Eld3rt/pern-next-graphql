'use client'

import { debounce } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  setSearchQuery: (searchQuery: string) => void
}

const CatalogSearch: React.FC<Props> = ({ setSearchQuery }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const updateParam = (key: string, value: string) => {
    params.set(key, value)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    updateParam('query', value)
    setSearchQuery(value)
  }, 700)

  return (
    <input
      name="search"
      type="text"
      placeholder="Найти курс"
      onChange={handleChange}
      className="course-search__input w-[13rem] py-2 px-10 border-2 border-current rounded-3xl search-icon sm:w-[18rem] lg:w-[24rem]"
    />
  )
}

export default CatalogSearch
