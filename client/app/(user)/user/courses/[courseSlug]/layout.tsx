import CourseColorProvider from '@/app/providers/CourseColorProvider'
import { getCourseMainColor } from '@/utils/getCourseMainColor'
import chroma from 'chroma-js'

interface Props {
  children: React.ReactNode
  params: Promise<{ courseSlug: string }>
}

const CourseLayout: React.FC<Props> = async ({ children, params }) => {
  const { courseSlug } = await params
  const mainColor = await getCourseMainColor(courseSlug)

  const minLuminance = 0.25
  const maxLuminance = 0.75

  const getChromaColor = () => {
    if (mainColor) {
      let color = chroma(mainColor)

      const luminance = color.luminance()

      if (luminance < minLuminance) {
        color = color.brighten(3)
      } else if (luminance > maxLuminance) {
        color = color.brighten(1)
      } else {
        color = color.brighten(2)
      }

      return color.hex()
    }
  }

  const backgroundColor = getChromaColor()

  return (
    <CourseColorProvider mainColor={mainColor}>
      <main className="col-span-5 pb-8 md:pb-16" style={{ backgroundColor: backgroundColor || '#fbfaf8' }}>
        {children}
      </main>
    </CourseColorProvider>
  )
}

export default CourseLayout
