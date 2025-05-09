'use client'

import { CourseDataFragment } from '@/graphql/generated'
import { useState } from 'react'

type Props = {
  course: CourseDataFragment
}

const CourseProgram: React.FC<Props> = ({ course }) => {
  const [openTopics, setOpenTopics] = useState<Record<number, boolean>>({})

  const toggleTopic = (topicId: number) => {
    setOpenTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId],
    }))
  }

  return (
    <section className="course-program mt-6 lg:mt-16 px-6 py-8 sm:px-12 xl:px-20">
      <div className="course-program__inner custom-container">
        <h2 className="course-program__title text-2xl font-bold mb-6">Программа курса</h2>
        <div className="course-program__content text-gray-800 bg-white rounded-lg overflow-hidden border border-green-100">
          <div className="course-program__head flex items-center px-4 py-4 border-b border-green-100 font-semibold">
            <h3 className="course-program__name h-3 w-3 rounded-full mr-2"></h3>
            {course.name}
          </div>
          <ul className="course-program__topics divide-y divide-green-100">
            {course.topics.map(topic => (
              <li key={topic.id} className="course-program__topic px-4 py-4">
                <div className="course-program__topic-head flex justify-between">
                  <h4 className="course-program__topic-title text-gray-800">{topic.name}</h4>
                  <span
                    onClick={() => toggleTopic(topic.id)}
                    className="course-program__topic__expand text-xl cursor-pointer"
                  >
                    {openTopics[topic.id] ? '−' : '+'}
                  </span>
                </div>

                <ul
                  className={`course-program__lessons divide-y divide-green-100 text-gray-800${
                    openTopics[topic.id] ? '' : ' hidden'
                  }`}
                >
                  {topic.lessons.map(lesson => (
                    <li key={lesson.id} className="course-program__lesson flex justify-between items-center px-4 py-4">
                      <h5 className="course-program__lesson-title">{lesson.name}</h5>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default CourseProgram
