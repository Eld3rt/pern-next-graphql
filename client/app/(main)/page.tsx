import HomeIntro from '../components/HomeIntro'
import HomeCatalog from '../components/HomeCatalog'

interface Props {}

const Page: React.FC<Props> = async () => {
  return (
    <main>
      <HomeIntro />
      <HomeCatalog />
    </main>
  )
}

export default Page
