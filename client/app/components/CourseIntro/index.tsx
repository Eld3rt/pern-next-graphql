import { CourseDataFragment } from '@/graphql/generated'
import PurchaseCourseButton from '../buttons/PurchaseCourseButton'

type Props = {
  slug: string
  course: CourseDataFragment
}

const CourseIntro: React.FC<Props> = ({ slug, course }) => {
  return (
    <section className="course-intro mt-6 lg:mt-16 px-6 py-8 sm:px-12 xl:px-20">
      <div className="course-intro__inner custom-container">
        <div className="course-intro__head flex flex-col-reverse lg:flex-row items-start gap-8">
          <div className="course-intro__text flex-1">
            {course.level && (
              <h3 className="course-intro__level text-sm sm:text-base text-gray-500 mb-2">{course.level}</h3>
            )}
            <h1 className="course-intro__title text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">{course.name}</h1>
            <p className="course-intro__description text-base sm:text-lg text-gray-700 mb-6">{course.description}</p>
            <PurchaseCourseButton slug={slug} />
          </div>
          <div className="course-intro__image flex justify-center w-full lg:w-1/2">
            <img
              src={course.imageURL}
              alt="Course Image"
              className="course-intro__picture w-full max-w-[550px] lg:max-w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
        <ul className="course-intro__tags grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {course.level && (
            <li className="course-intro__tag">
              <h4 className="text-sm text-gray-600">Уровень</h4>
              <p className="text-base font-medium">{course.level}</p>
            </li>
          )}
          <li className="course-intro__tag">
            <h4 className="text-sm text-gray-600">Длительность</h4>
            <p className="text-base font-medium">
              {`${Math.floor(course.duration / 3600)} ч. `}
              {`${Math.floor((course.duration % 3600) / 60)} мин.`}
            </p>
          </li>
          <li className="course-intro__tag">
            <h4 className="text-sm text-gray-600">Кол-во уроков</h4>
            <p className="text-base font-medium">{`${course.lessons.length} уроков`}</p>
          </li>
          <li className="course-intro__tag">
            <h4 className="text-sm text-gray-600">Стоимость</h4>
            <p
              className={`course-catalog__course-price inline-flex ${
                course.price ? (course.reducedPrice < course.price ? 'price-with-discount' : '') : 'free-price'
              }`}
            >
              {course.price ? `${course.price}₽` : 'Бесплатно'}
            </p>
            {course.reducedPrice < course.price && (
              <p className="course-catalog__course-reduced-price inline-flex text-orange-500">
                {!course.reducedPrice ? 'Бесплатно' : course.reducedPrice}₽
              </p>
            )}
          </li>
        </ul>
      </div>
    </section>
  )
}

export default CourseIntro
