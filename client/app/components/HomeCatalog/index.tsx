import Link from 'next/link'
import { getHomeCatalogCourses } from '@/utils/getHomeCatalogCourses'
import CourseList from '../ui/CourseList'

type Props = {}

const HomeCatalog: React.FC<Props> = async () => {
  const data = await getHomeCatalogCourses()

  const nodes = data?.edges.map(edge => edge.node)

  return (
    <section className="course-catalog mt-[5rem] lg:mt-[10rem]">
      <div className="course-catalog__inner bg-white border-2 border-current rounded-3xl">
        <div className="course-catalog__text flex flex-wrap justify-between items-center border-b-2 border-current mb-[1.5rem] gap-x-[5rem] gap-y-[2rem] lg:mb-[4rem] py-[1rem] px-[2rem]">
          <h2 className="course-catalog__title text-3xl md:text-4xl">Популярные курсы</h2>
          <Link href="/courses" className="course-catalog__link bg-right text-sm arrow-icon pr-7">
            Смотреть все
          </Link>
        </div>
        <div className="course-catalog__courses py-[0.5rem] px-[1rem] lg:py-[1rem] lg:px-[2rem]">
          <CourseList entries={nodes} />
        </div>
      </div>
    </section>
  )
}

export default HomeCatalog
