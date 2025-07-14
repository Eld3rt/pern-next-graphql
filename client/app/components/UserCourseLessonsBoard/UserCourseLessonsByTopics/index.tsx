'use client'

import UserLessonCard from '../../ui/UserLessonCard'

type Props = {
  entries: {
    __typename?: 'Topic'
    id: number
    name: string
    lessons: Array<{
      __typename?: 'Lesson'
      id: number
      name: string
      slug: string
      videoDuration: number
    }>
  }[]
  color: string
}

const UserCourseLessonsByTopics: React.FC<Props> = ({ entries, color }) => {
  return (
    <ul className="user-course-topics-list grid 2xl:grid-cols-2 justify-center gap-y-[1.5rem] gap-x-[2rem] 2xl:gap-[2.5rem]">
      {entries?.map(topic => (
        <li key={topic.id} className="user-course-topic col-span-1">
          <div className="course-program__topic-head flex justify-center sm:justify-between mb-4">
            <h4 className="course-program__topic-title text-gray-800">{topic.name}</h4>
          </div>
          <ul className="user-course-lessons-list grid sm:flex flex-wrap gap-[1rem]">
            {topic.lessons.map(lesson => (
              <UserLessonCard key={lesson.id} lesson={lesson} color={color} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default UserCourseLessonsByTopics
