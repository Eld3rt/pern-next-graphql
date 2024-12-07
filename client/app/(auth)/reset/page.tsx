import ResetPassword from '../../components/ResetPassword'

interface Props {}

const Page: React.FC<Props> = () => {
  return (
    <>
      <h1>Сброс пароля</h1>
      <ResetPassword />
    </>
  )
}

export default Page
