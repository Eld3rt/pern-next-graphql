'use client'

import { debounce } from 'lodash'
import { CircularProgress } from '@mui/material'
import { useGetCoursesByStringLazyQuery } from '@/graphql/generated'

interface Props {}

const CourseSearch: React.FC<Props> = () => {
  const [getCourses, { data, loading, error }] = useGetCoursesByStringLazyQuery()

  const handleChange = (e: any) => {
    const value = e.target.value.toLowerCase()
    handleSearch(value)
  }

  const handleSearch = debounce(async query => {
    await getCourses({
      variables: {
        query: query,
      },
    })
  }, 250)

  return (
    <div className="course-search__bar w-9/12 grid place-items-center">
      <input
        name="search"
        type="text"
        placeholder="Найти курс"
        onChange={handleChange}
        className="course-search__input py-2 px-10 w-full border-2 border-current rounded-full search-icon"
      />
      {loading ? (
        <CircularProgress size={24} sx={{ color: '#732a46', marginTop: '10px' }} />
      ) : error ? (
        <p>error.message</p>
      ) : !loading && data?.getCoursesByString && !data.getCoursesByString.length ? (
        <p className="course-search__message py-3 px-10">Курсы не найдены.</p>
      ) : (
        data?.getCoursesByString.length && (
          <ul className="course-search__list w-full py-3 rounded-lg shadow-xl">
            {data?.getCoursesByString.map((course, index) => (
              <li key={index} className="course-search__list-item py-2 px-10">
                <a href={`/courses/${course.slug}`} className="course-search__link">
                  <h4 className="course-search__name">{course.name}</h4>
                </a>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  )
}

export default CourseSearch
