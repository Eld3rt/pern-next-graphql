import UserCourseIntro from '@/app/components/UserCourseIntro'
import UserCourseLessonsBoard from '@/app/components/UserCourseLessonsBoard'
import { getPurchasedCourseData } from '@/utils/getPurchasedCourseData'

interface Props {
  params: Promise<{ courseSlug: string }>
}

const Page: React.FC<Props> = async ({ params }) => {
  const { courseSlug } = await params

  const course = await getPurchasedCourseData(courseSlug)

  return (
    course && (
      <>
        <UserCourseIntro course={course} />
        <UserCourseLessonsBoard course={course} />
      </>
    )
  )
}

export default Page
