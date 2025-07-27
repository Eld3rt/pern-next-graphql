'use client'

import { LessonInfoFragment } from '@/graphql/generated'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'

interface Props {
  lessons: LessonInfoFragment[]
  courseSlug: string
}

const LessonNavigation: React.FC<Props> = ({ lessons, courseSlug }) => {
  const [isOpen, setIsOpen] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const [dragDistance, setDragDistance] = useState(0)
  const isDragging = useRef(false)
  const dragStartX = useRef<number | null>(null)
  const scrollStartX = useRef<number | null>(null)

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
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <section className="lesson-navigation grid justify-center px-2 lg:mb-[6rem]">
      <button
        onClick={toggleLessonList}
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
          className="lesson-navigation__arrow hidden lg:flex items-center justify-center min-w-[36px] min-h-[36px] rounded-full bg-white shadow hover:bg-gray-100 mr-2 border border-gray-200"
          onClick={() => scrollBy(-250)}
        >
          <FaChevronLeft className="text-gray-500 text-xl" />
        </button>
        <ul
          className={`lesson-navigation__list grid sm:flex overflow-x-auto no-scrollbar py-2 gap-4`}
          ref={listRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {lessons?.map((lesson, i) => (
            <li
              key={lesson.id}
              className={`lesson-navigation__lesson rounded-2xl block justify-between sm:min-w-[220px] bg-white rounded-xl shadow-md border border-gray-200 p-4`}
            >
              <Link
                href={`/user/courses/${courseSlug}/${lesson.slug}`}
                className={`lesson-navigation__lesson-link flex sm:flex-col h-full sm:justify-between gap-3 sm:gap-1 ${
                  dragDistance > 30 ? 'pointer-events-none select-none' : 'auto select-auto'
                }`}
                draggable="false"
              >
                <span className="lesson-navigation__lesson-text text-xs text-neutral-800 sm:text-sm sm:font-semibold self-center md:self-start">
                  #{lesson.position}
                </span>
                <span className="lesson-navigation__lesson-text text-xs text-neutral-800 sm:text-sm sm:font-semibold leading-tight">
                  {lesson.name}
                </span>
                <span className="lesson-navigation__lesson-text text-nowrap text-xs text-orange-600 ml-auto lg:mt-auto sm:text-sm self-end sm:font-bold">
                  {lesson.videoDuration} сек
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="lesson-navigation__arrow hidden lg:flex items-center justify-center min-w-[36px] min-h-[36px] rounded-full bg-white shadow hover:bg-gray-100 ml-2 border border-gray-200"
          onClick={() => scrollBy(250)}
        >
          <FaChevronRight className="text-gray-500 text-xl" />
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
