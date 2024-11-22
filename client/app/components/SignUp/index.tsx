'use client'

import { useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { ApolloError } from '@apollo/client'
import { useSignUpMutation } from '@/graphql/generated'
import { authValidation } from '@/utils/authValidation'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import FormInput from '../forms/FormInput'

interface Props {}
interface FormikValues {
  name: string
  email: string
  password: string
}

const SignUp: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const path = searchParams.get('path')
  const [signUp] = useSignUpMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [errMsg, setErrMsg] = useState<string | undefined>()
  const [statusMsg, setStatusMsg] = useState<string | undefined>()

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const creds = { ...values }
    actions.resetForm()
    try {
      const { data } = await signUp({
        variables: {
          name: creds.name,
          email: creds.email,
          password: creds.password,
          path: path,
        },
      })
      setStatusMsg(data?.signUp?.message)
      console.log(statusMsg)
    } catch (error) {
      setErrMsg((error as ApolloError).message)
    }
  }
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={authValidation}
      onSubmit={handleSubmit}
    >
      <div className="loginForm">
        <Form>
          <FormInput name="name" type="text" label="Ваше имя" />
          <FormInput name="email" type="email" label="Email" />
          <FormInput name="password" type="password" label="Пароль" />

          <button className="btn" type="submit">
            Зарегистрироваться
          </button>
          <p className="status-text">{errMsg}</p>
          <Link href={path ? `/login?path=${path}` : '/login'}>Войти</Link>
        </Form>
      </div>
    </Formik>
  )
}

export default SignUp
