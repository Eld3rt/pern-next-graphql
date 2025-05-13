import Link from 'next/link'
import ResetPassword from '../../components/ResetPassword'

interface Props {}

const Page: React.FC<Props> = () => {
  return (
    <>
      <div className="logo pt-8 pl-8">
        <Link href="/">Главная</Link>
      </div>
      <ResetPassword />
    </>
  )
}

export default Page
