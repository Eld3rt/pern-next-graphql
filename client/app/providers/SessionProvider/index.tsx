'use client'

import { createContext } from 'react'
import { useMeQuery } from '@/graphql/generated'

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
}

const SessionProvider: React.FC<Props> = ({ children }) => {
  const { data } = useMeQuery()
  const currentUser = data?.me

  return <SessionContext.Provider value={{ currentUser }}>{children}</SessionContext.Provider>
}

export default SessionProvider
