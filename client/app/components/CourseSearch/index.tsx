'use client'

import { useGetCoursesByStringLazyQuery } from '@/graphql/generated'
import { debounce } from 'lodash'

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
    <div className="course-search-bar">
      <input name="search" type="text" placeholder="Найти курс" onChange={handleChange} />
      {loading && <p>Ищем курсы...</p>}
      {error && <p>error.message</p>}
      {!loading && data?.getCoursesByString && !data.getCoursesByString.length && <p>Курсы не найдены.</p>}
      {!loading && (
        <ul className="course-list">
          {data?.getCoursesByString.map((course, index) => (
            <li key={index} className="course-item">
              <p className="course-name">{course.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CourseSearch
