'use client'

import React, { useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { ApolloError } from '@apollo/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSignInMutation } from '@/graphql/generated'
import { authValidation } from '@/utils/authValidation'
import FormInput from '../forms/FormInput'

interface Props {}
interface FormikValues {
  email: string
  password: string
}

const SignIn: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const course_slug = searchParams.get('course_slug')
  const [signIn] = useSignInMutation({})
  const [errMsg, setErrMsg] = useState<string | undefined>()

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const creds = { ...values }
    actions.resetForm()
    try {
      await signIn({
        variables: {
          email: creds.email,
          password: creds.password,
        },
      })
      location.assign(`${course_slug ? `http://localhost:4000/courses/${course_slug}` : 'http://localhost:4000'}`)
    } catch (error) {
      setErrMsg((error as ApolloError).message)
    }
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={authValidation}
      onSubmit={handleSubmit}
    >
      <div className="loginForm">
        <Form>
          <FormInput name="email" type="email" label="Email" />
          <FormInput name="password" type="password" label="Пароль" />

          <button className="btn" type="submit">
            Войти
          </button>
          <p className="status-text">{errMsg}</p>
          <Link href="/register">Создать аккаунт</Link>
        </Form>
      </div>
    </Formik>
  )
}

export default SignIn
