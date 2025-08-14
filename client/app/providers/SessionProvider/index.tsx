'use client'

import { createContext } from 'react'

type SessionContextValue = {
  currentUser?: {
    id: number
    email: string
    name?: string | null
  } | null
}

export const SessionContext = createContext<SessionContextValue>({})

interface Props {
  children: React.ReactNode
  currentUser?: {
    id: number
    email: string
    name?: string | null
  } | null
}

const SessionProvider: React.FC<Props> = ({ currentUser, children }) => {
  return <SessionContext.Provider value={{ currentUser }}>{children}</SessionContext.Provider>
}

export default SessionProvider
