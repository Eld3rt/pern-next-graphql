import Link from 'next/link'
import SignUp from '../../components/SignUp'

interface Props {}

const Page: React.FC<Props> = () => {
  return (
    <>
      <div className="logo pt-8 pl-8">
        <Link href="/">Главная</Link>
      </div>
      <SignUp />
    </>
  )
}

export default Page
