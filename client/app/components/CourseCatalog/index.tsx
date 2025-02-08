import Link from 'next/link'
import { getCourses } from '@/utils/getCourses'

type Props = {}

const truncateString = (s: string, w: number) => (s.length > w ? s.slice(0, w) + '...' : s)

const CourseCatalog: React.FC<Props> = async () => {
  const courses = await getCourses()

  return (
    <section className="course-catalog mt-[5rem] lg:mt-[10rem]">
      <div className="course-catalog__inner custom-container bg-white border-2 border-current rounded-3xl">
        <div className="course-catalog__text flex flex-wrap justify-between items-center border-b-2 border-current mb-[1.5rem] gap-x-[5rem] gap-y-[2rem] lg:mb-[4rem] py-[1rem] px-[2rem]">
          <h2 className="course-catalog__title text-3xl md:text-4xl">Популярные курсы</h2>
          <Link href="/courses" className="course-catalog__link text-sm arrow-icon pr-7">
            Смотреть все
          </Link>
        </div>
        <div className="course-catalog__courses py-[0.5rem] px-[1rem] lg:py-[1rem] lg:px-[2rem]">
          <ul className="course-catalog__course-list flex flex-col gap-y-[1.5rem] gap-x-[2rem] lg:grid lg:grid-cols-3">
            {courses.map(course => (
              <li
                key={course.id}
                className="course-catalog__course bg-[#fbfaf8] border rounded-[16px] sm:py-[1.5rem] sm:px-[1rem] lg:px-[0] lg:py-[0]"
              >
                <Link
                  href={`/courses/${course.slug}`}
                  className="course-catalog__link sm:flex sm:items-center sm:gap-x-[2rem] lg:flex-col lg:h-[100%]"
                >
                  <div className="course-catalog__course-image flex justify-center sm:block sm:w-[60%] sm:mb-[0] lg:w-[100%] lg:mb-[0.5rem]">
                    <img
                      src={course.imageURL}
                      alt={course.name}
                      loading="lazy"
                      className="course-catalog__course-picture object-contain rounded-t-[16px] sm:rounded-[16px] lg:rounded-b-[0]"
                    />
                  </div>
                  <div className="course-catalog__course-text flex flex-col py-[1.5rem] px-[1rem] sm:px-[0] sm:py-[0] sm:w-[60%] lg:w-[100%] lg:h-[100%] lg:py-[1.5rem] lg:px-[1rem]">
                    <h3 className="course-catalog__course-title text-xl md:text-2xl">{course.name}</h3>
                    <p className="course-catalog__course-description text-sm mt-[0.8rem] mb-[1.5rem]">
                      {truncateString(course.description, 100)}
                    </p>
                    <span className="course-catalog__course-lessons-quantity mb-[0.5rem]">{`${course.lessons.length} уроков`}</span>
                    <span className="course-catalog__course-duration mb-[0.5rem]">
                      {Math.floor(course.duration / 3600) > 0 && `${Math.floor(course.duration / 3600)} ч. `}
                      {`${Math.floor((course.duration % 3600) / 60)} мин.`}
                    </span>
                    <div className="course-catalog__course-prices text-xl mb-[1.5rem]">
                      <span
                        className={`course-catalog__course-price ${course.reducedPrice && 'price-with-discount'} ${
                          !course.price && 'free-price'
                        }`}
                      >
                        {course.price ? `${course.price}₽` : 'Бесплатно'}
                      </span>
                      {course.reducedPrice && (
                        <span className="course-catalog__course-reduced-price text-orange-500">
                          {course.reducedPrice}₽
                        </span>
                      )}
                    </div>
                    <ul className="course-catalog__course-tag-list flex flex-wrap gap-x-[0.5rem] gap-y-[0.5rem] mt-[auto]">
                      {course.tags.map(tag => (
                        <li key={tag.id} className="course-catalog__course-tag tag border border-current">
                          {tag.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default CourseCatalog
