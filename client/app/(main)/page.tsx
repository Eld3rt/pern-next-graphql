import HomeIntro from '../components/HomeIntro'
import HomeCatalog from '../components/HomeCatalog'

interface Props {}

const Page: React.FC<Props> = async () => {
  return (
    <main className="home mb-8 md:mb-16">
      <HomeIntro />
      <HomeCatalog />
    </main>
  )
}

export default Page
