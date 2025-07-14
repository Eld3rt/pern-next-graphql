import { notFound } from 'next/navigation'
import UserCourseIntro from '@/app/components/UserCourseIntro'
import UserCourseLessonsBoard from '@/app/components/UserCourseLessonsBoard'
import { getPurchasedCourseData } from '@/utils/getPurchasedCourseData'
import chroma from 'chroma-js'

interface Props {
  params: { slug: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params

  const course = await getPurchasedCourseData(slug)

  if (!course) {
    notFound()
  }

  const minLuminance = 0.25 // adjust as needed (0 = black, 1 = white)
  const maxLuminance = 0.75

  let color = chroma(course.mainColor)
  const luminance = color.luminance()

  if (luminance < minLuminance) {
    color = color.brighten(3)
  } else if (luminance > maxLuminance) {
    color = color.brighten(1)
  } else {
    color = color.brighten(2)
  }

  const courseColor = color.hex()
  return (
    <main style={{ backgroundColor: courseColor }} className="user-course col-span-5 pb-8 md:pb-16">
      <UserCourseIntro course={course} />
      <UserCourseLessonsBoard course={course} />
    </main>
  )
}

export default Page
