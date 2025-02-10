import HomeIntro from '../components/HomeIntro'
import CourseCatalog from '../components/CourseCatalog'

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
