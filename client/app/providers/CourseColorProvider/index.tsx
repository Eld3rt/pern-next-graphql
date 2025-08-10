'use client'

import { createContext } from 'react'

type CourseColorContextValue = {
  mainColor: string
}

export const CourseColorContext = createContext<CourseColorContextValue>({ mainColor: '#fbfaf8' })

interface Props {
  children: React.ReactNode
  mainColor?: string
}

const CourseColorProvider: React.FC<Props> = ({ mainColor, children }) => {
  return (
    <CourseColorContext.Provider value={{ mainColor: mainColor || '#fbfaf8' }}>{children}</CourseColorContext.Provider>
  )
}

export default CourseColorProvider
