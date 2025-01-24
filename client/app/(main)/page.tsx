import HomeIntro from '../components/HomeIntro'

interface Props {}

const Page: React.FC<Props> = async () => {
  return (
    <main>
      <HomeIntro />
    </main>
  )
}

export default Page
