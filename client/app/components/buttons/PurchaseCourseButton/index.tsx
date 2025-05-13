'use client'

import { useContext } from 'react'
import { SessionContext } from '@/app/providers/SessionProvider'
import { usePurchaseCourseMutation } from '@/graphql/generated'
import { useRouter } from 'next/navigation'

interface Props {
  slug: string
}

const PurchaseCourseButton: React.FC<Props> = ({ slug }) => {
  const { currentUser } = useContext(SessionContext)
  const router = useRouter()

  const [purchaseCourse, { data, error }] = usePurchaseCourseMutation({
    notifyOnNetworkStatusChange: true,
  })

  const handleClick = async () => {
    if (!currentUser) {
      router.push(`/register?course_slug=${slug}`)
    }
    await purchaseCourse({ variables: { slug } })
  }

  return (
    <>
      <button className="btn" onClick={handleClick}>
        Приобрести курс
      </button>

      {data?.purchaseCourse.success && <p className="text-success">{data.purchaseCourse.message}</p>}
      {(error || (data?.purchaseCourse && !data.purchaseCourse.success && currentUser)) && (
        <p className="text-error text-red-500 mt-6">{error?.message || data?.purchaseCourse.message}</p>
      )}
    </>
  )
}

export default PurchaseCourseButton
