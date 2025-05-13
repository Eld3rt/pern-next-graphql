import Link from 'next/link'
import SignIn from '../../components/SignIn'

interface Props {}

const Page: React.FC<Props> = () => {
  return (
    <>
      <div className="logo pt-8 pl-8">
        <Link href="/">Главная</Link>
      </div>
      <SignIn />
    </>
  )
}

export default Page
