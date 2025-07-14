import { PurchasedCourseFragment } from '@/graphql/generated'
import Link from 'next/link'

type Props = {
  course: PurchasedCourseFragment
}

const UserCourseIntro: React.FC<Props> = ({ course }) => {
  const allLessons = course.topics.flatMap(topic => topic.lessons)
  const completedLessonIds = course.courseProgress.flatMap(progress => progress.lessonProgress.map(lp => lp.lesson.id))

  const isCourseCompleted = allLessons.length === completedLessonIds.length
  let uncompletedLesson = undefined
  if (!isCourseCompleted) {
    uncompletedLesson = allLessons.find(lesson => !completedLessonIds.includes(lesson.id))
  }

  return (
    <section className="user-course-intro grid justify-items-center">
      <div className="user-course-intro__image">
        <img src={course.imageURL} alt="Course image" className="user-course-intro__picture max-h-[350px]" />
      </div>
      <div className="user-course-intro__text px-6 grid justify-items-center md:px-12">
        <h1 className="user-course-intro__title text-2xl md:text-3xl font-bold mt-[2rem]">{course.name}</h1>
        <p className="user-course-intro__description text-center max-w-[850px]">{course.description}</p>
        {!isCourseCompleted && uncompletedLesson && (
          <Link
            href={`/user/courses/${course.slug}/${uncompletedLesson.slug}`}
            className="user-course-intro__link w-full max-w-[370px] mt-6 mb-4 bg-[#701437] text-white py-3 rounded-lg shadow-lg text-lg text-center"
          >
            Продолжить обучение
          </Link>
        )}
      </div>
    </section>
  )
}

export default UserCourseIntro
