'use client'

import { useState, useContext } from 'react'
import { SessionContext } from '@/app/providers/SessionProvider'
import { usePurchaseCourseMutation } from '@/graphql/generated'
import { useRouter } from 'next/navigation'

interface Props {
  slug: string
}

const PurchaseCourseButton: React.FC<Props> = ({ slug }) => {
  const { currentUser } = useContext(SessionContext)
  const router = useRouter()

  const [purchaseCourse] = usePurchaseCourseMutation({
    notifyOnNetworkStatusChange: true,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const clearStates = () => {
    setMessage('')
    setError('')
  }

  const handleClick = async () => {
    if (!currentUser) {
      router.push(`/register?course_slug=${slug}`)
    }

    clearStates()
    setIsSubmitted(true)

    try {
      const { data } = await purchaseCourse({ variables: { slug } })

      if (!data?.purchaseCourse) {
        throw new Error('Ошибка при приобретении курса')
      }

      if (data?.purchaseCourse.success) {
        setMessage(data.purchaseCourse.message)
      } else {
        setError(data.purchaseCourse.message)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <>
      {!isSubmitted && (
        <button className="btn" onClick={handleClick}>
          Приобрести курс
        </button>
      )}

      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-error text-red-500">{error}</p>}
    </>
  )
}

export default PurchaseCourseButton
