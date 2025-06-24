'use client'

import { TagFragment } from '@/graphql/generated'

interface Props {
  entries: TagFragment[]
  handleTagSelection: (tagName: string) => void
  selectedTags: string[]
}

const CourseTagList: React.FC<Props> = ({ entries, selectedTags, handleTagSelection }) => {
  return (
    <ul className="course-tag-list__filter-list flex flex-wrap gap-[0.4rem] mt-[3rem] lg:mt-[1.5rem]">
      {entries?.map(tag => {
        return (
          <li key={tag.id} className="course-tag-list__list-item">
            <button
              onClick={() => handleTagSelection(tag.name)}
              className={`course-tag-list__tag px-4 py-2 border border-current rounded ${
                selectedTags.includes(tag.name) && 'bg-[#732a46] text-white'
              }`}
            >
              {tag.name}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default CourseTagList
