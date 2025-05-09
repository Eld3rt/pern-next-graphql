import { CourseDataFragment } from '@/graphql/generated'
import PurchaseCourseButton from '../buttons/PurchaseCourseButton'

type Props = {
  slug: string
  course: CourseDataFragment
}

const CourseOffer: React.FC<Props> = async ({ slug, course }) => {
  return (
    <section className="course-offer bg-white mt-6 lg:mt-16 px-6 py-8 sm:px-12 xl:px-20 border-t border-gray-200">
      <div className="course-offer__inner custom-container">
        <div className="course-offer__text max-w-4xl mx-auto text-center">
          <h2 className="course-offer__title text-2xl sm:text-3xl font-bold mb-4">Начните обучение уже сегодня!</h2>
          <p className="course-offer__description text-gray-600 text-base sm:text-lg mb-6">
            {course.offerMessage || 'Получите доступ ко всем материалам курса и начните развиваться в IT прямо сейчас.'}
          </p>
          <PurchaseCourseButton slug={slug} />
        </div>
      </div>
    </section>
  )
}

export default CourseOffer
