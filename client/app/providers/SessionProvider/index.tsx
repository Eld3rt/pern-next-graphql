'use client'

import { createContext } from 'react'
import { useMeQuery } from '@/graphql/generated'

type SessionContextValue = {
  currentUser?: {
    id: number
    email: string
    name?: string | null
  } | null
  loading?: boolean
}

export const SessionContext = createContext<SessionContextValue>({})

interface Props {
  children: React.ReactNode
}

const SessionProvider: React.FC<Props> = ({ children }) => {
  const { data, loading } = useMeQuery()
  const currentUser = data?.me

  return <SessionContext.Provider value={{ currentUser, loading }}>{children}</SessionContext.Provider>
}

export default SessionProvider
