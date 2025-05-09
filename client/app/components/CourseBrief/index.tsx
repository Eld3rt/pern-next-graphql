import { CourseDataFragment } from '@/graphql/generated'
import Link from 'next/link'

type Props = {
  course: CourseDataFragment
}

const CourseBrief: React.FC<Props> = ({ course }) => {
  return (
    <section className="course-brief mt-6 lg:mt-16 px-6 py-8 sm:px-12 xl:px-20 space-y-10">
      <div className="course-brief__inner custom-container">
        <div className="course-brief__topics">
          <h2 className="course-brief__topics-title text-2xl font-semibold mb-6">Что будем изучать?</h2>
          <ul className="course-brief__list grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-12 text-gray-800 text-base list-disc list-inside">
            {course.tags
              .filter(tag => tag.name !== course.level)
              .map(tag => (
                <li key={tag.id} className="course-brief__topic">
                  {tag.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="course-brief__skills mt-12">
          <h2 className="course-brief__skills-title text-2xl font-semibold mb-4">Повысь знания навыков:</h2>
          <ul className="course-brief__skills-list flex flex-wrap gap-3 list-none p-0 m-0">
            {course.tags
              .filter(tag => tag.name !== course.level)
              .map(tag => (
                <li
                  key={tag.id}
                  className="course-brief__skill inline-block bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full"
                >
                  <Link href={`/courses/?tag=${tag.name}`}>{tag.name}</Link>
                </li>
              ))}
          </ul>
        </div>
        {course.prerequisites && (
          <div className="course-brief__prerequisites mt-12">
            <h2 className="course-brief__prerequisites-title text-2xl font-semibold mb-2">
              Что рекомендовано знать перед прохождением:
            </h2>
            <p className="course-brief__prerequisites-description text-base text-gray-800">{course.prerequisites}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CourseBrief
