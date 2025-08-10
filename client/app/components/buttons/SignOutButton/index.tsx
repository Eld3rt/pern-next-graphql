'use client'

import { useSignOutMutation } from '@/graphql/generated'
import { useApolloClient } from '@apollo/client'
import { clearCookie } from '@/utils/clearCookie'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { CircularProgress } from '@mui/material'

interface Props {
  className?: string
}

const SignOutButton: React.FC<Props> = ({ className }) => {
  const client = useApolloClient()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [signOut] = useSignOutMutation({
    notifyOnNetworkStatusChange: true,
  })

  const handleClick = async () => {
    startTransition(async () => {
      await signOut()
        .then(() => clearCookie())
        .then(() => client.resetStore())
        .then(() => router.refresh())
    })
  }
  return (
    <>
      {isPending && (
        <div className="modal-loading">
          <CircularProgress size={24} sx={{ color: '#732a46' }} />
        </div>
      )}
      <button type="submit" onClick={handleClick} className={className}>
        Выход
      </button>
    </>
  )
}

export default SignOutButton
