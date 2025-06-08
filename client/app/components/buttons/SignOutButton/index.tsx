'use client'

import { useSignOutMutation } from '@/graphql/generated'
import { useApolloClient } from '@apollo/client'
import { clearCookie } from '@/utils/clearCookie'

interface Props {
  className?: string
}

const SignOutButton: React.FC<Props> = ({ className }) => {
  const client = useApolloClient()

  const [signOut] = useSignOutMutation({
    notifyOnNetworkStatusChange: true,
  })

  const handleClick = async () => {
    await signOut()
      .then(() => clearCookie())
      .then(() => client.resetStore())
      .then(() => location.reload())
  }
  return (
    <button type="submit" onClick={handleClick} className={className}>
      Выход
    </button>
  )
}

export default SignOutButton
