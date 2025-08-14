'use client'

import { CourseColorContext } from '@/app/providers/CourseColorProvider'
import { LessonInfoFragment } from '@/graphql/generated'
import { useContext, useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import UserLessonCard from '../ui/UserLessonCard'
import chroma from 'chroma-js'

interface Props {
  lessons: LessonInfoFragment[]
  courseSlug: string
}

const LessonNavigation: React.FC<Props> = ({ lessons, courseSlug }) => {
  const { mainColor } = useContext(CourseColorContext)

  const [isOpen, setIsOpen] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const [dragDistance, setDragDistance] = useState(0)
  const isDragging = useRef(false)
  const dragStartX = useRef<number | null>(null)
  const scrollStartX = useRef<number | null>(null)

  const lightenedColor = chroma(mainColor).brighten(2).hex()
  const darkenedColor = chroma(mainColor).darken(2).hex()

  const strokeColor = chroma.contrast(mainColor, lightenedColor) > 2.5 ? lightenedColor : darkenedColor

  const scrollBy = (offset: number) => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    dragStartX.current = e.clientX
    scrollStartX.current = listRef.current ? listRef.current.scrollLeft : 0
    setDragDistance(0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || dragStartX.current === null || scrollStartX.current === null) return
    if (listRef.current) {
      const dx = e.clientX - dragStartX.current
      setDragDistance(Math.abs(dx))
      listRef.current.scrollLeft = scrollStartX.current - dx
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
    dragStartX.current = null
    scrollStartX.current = null
    setDragDistance(0)
  }

  const handleMouseLeave = () => {
    isDragging.current = false
    dragStartX.current = null
    scrollStartX.current = null
    setDragDistance(0)
  }

  const toggleLessonList = () => {
    setIsOpen(prev => !prev)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
    } else {
      document.body.style.overflow = 'auto'
      document.body.style.position = 'static'
    }
  }, [isOpen])

  return (
    <section className="lesson-navigation grid justify-center px-2 lg:mb-[6rem]">
      <button
        onClick={toggleLessonList}
        style={{ color: darkenedColor }}
        className="lesson-navigation__title-button lg:pointer-events-none px-[1rem] py-[0.5rem] my-8 lg:mb-2 lg:mt-[3rem] rounded-full border-2 border-current lg:p-[0] lg:border-[0]"
      >
        Навигация по урокам
      </button>
      <div
        className={`${
          isOpen
            ? 'lesson-navigation__menu flex items-center justify-center w-full bg-gray-50 overflow-hidden lesson-navigation__menu--active'
            : 'lesson-navigation__menu flex items-center justify-center w-full bg-gray-50 overflow-hidden'
        }`}
      >
        <button
          className="lesson-navigation__arrow hidden lg:flex items-center justify-center min-w-[36px] min-h-[36px] rounded-full mr-2"
          style={{ backgroundColor: mainColor }}
          onClick={() => scrollBy(-250)}
        >
          <FaChevronLeft fill={strokeColor} className="text-gray-500 text-xl" />
        </button>
        <ul
          className={`lesson-navigation__list grid lg:flex overflow-x-auto no-scrollbar py-2 gap-4`}
          ref={listRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {lessons?.map(lesson => (
            <UserLessonCard
              key={lesson.id}
              lesson={lesson}
              color={mainColor}
              courseSlug={courseSlug}
              dragDistance={dragDistance}
            />
          ))}
        </ul>
        <button
          className="lesson-navigation__arrow hidden lg:flex items-center justify-center min-w-[36px] min-h-[36px] rounded-full ml-2"
          style={{ backgroundColor: mainColor }}
          onClick={() => scrollBy(250)}
        >
          <FaChevronRight fill={strokeColor} className="text-gray-500 text-xl" />
        </button>
        {isOpen && (
          <button
            className="lesson-navigation__close modal-close z-[1] fixed top-0 right-0 p-[1rem]"
            onClick={() => setIsOpen(false)}
          >
            <IoClose className="w-8 h-8" />
          </button>
        )}
      </div>
    </section>
  )
}

export default LessonNavigation
