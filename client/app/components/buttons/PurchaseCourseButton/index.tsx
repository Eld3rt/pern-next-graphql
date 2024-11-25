'use client'

import { useState, useContext } from 'react'
import { SessionContext } from '@/app/providers/SessionProvider'
import { usePurchaseCourseMutation } from '@/graphql/generated'
import { useRouter } from 'next/navigation'

interface Props {
  courseId: number
  slug: string
}

const PurchaseCourseButton: React.FC<Props> = ({ courseId, slug }) => {
  const { currentUser } = useContext(SessionContext)
  const router = useRouter()

  const [purchaseCourse] = usePurchaseCourseMutation({
    notifyOnNetworkStatusChange: true,
  })

  const [isPurchased, setIsPurchased] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleClick = async () => {
    if (!currentUser) {
      router.push(`/register?course_slug=${slug}`)
      return
    }

    try {
      const { data } = await purchaseCourse({ variables: { courseId } })
      if (data?.purchaseCourse?.message) {
        setIsPurchased(true)
        setMessage(data.purchaseCourse.message)
      } else {
        throw new Error('Ошибка при приобретении курса')
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <>
      {isPurchased ? (
        <p className="text-success">{message}</p>
      ) : error ? (
        <p className="text-error">{error}</p>
      ) : (
        <button className="btn" onClick={handleClick}>
          Приобрести курс
        </button>
      )}
    </>
  )
}

export default PurchaseCourseButton
