import CourseCatalog from '../components/CourseCatalog'
import HomeIntro from '../components/HomeIntro'

interface Props {}

const Page: React.FC<Props> = async () => {
  return (
    <main>
      <HomeIntro />
      <CourseCatalog />
    </main>
  )
}

export default Page
