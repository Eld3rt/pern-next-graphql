'use client'

import React, { useEffect } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSignInMutation } from '@/graphql/generated'
import * as Yup from 'yup'
import FormInput from '../forms/FormInput'

interface Props {}
interface FormikValues {
  email: string
  password: string
}

const SignIn: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const course_slug = searchParams.get('course_slug')
  const [signIn, { data, error }] = useSignInMutation({
    notifyOnNetworkStatusChange: true,
  })

  const yupMessages = {
    email: {
      required: 'Требуется указать email',
      email: 'Неверный email или пароль',
      max: 'Неверный email или пароль',
    },
    password: {
      required: 'Требуется указать пароль',
      min: 'Неверный email или пароль',
      max: 'Неверный email или пароль',
    },
  }

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const creds = { ...values }
    actions.resetForm({})
    const { data } = await signIn({
      variables: {
        email: creds.email,
        password: creds.password,
      },
    })
    if (data?.signIn.success) {
      location.assign(`${course_slug ? `http://localhost:4000/courses/${course_slug}` : 'http://localhost:4000'}`)
    }
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required(yupMessages.email.required)
          .email(yupMessages.email.email)
          .max(200, yupMessages.email.max),
        password: Yup.string()
          .required(yupMessages.password.required)
          .min(6, yupMessages.password.min)
          .max(200, yupMessages.password.max),
      })}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, setFieldValue, setFieldError }) => {
        useEffect(() => {
          if (
            (errors.email || errors.password) &&
            !(errors.email == yupMessages.email.required) &&
            !(errors.password == yupMessages.password.required)
          ) {
            setFieldValue('email', '')
            setFieldValue('password', '')
          }
        }, [errors])

        return (
          <div className="loginForm">
            <Form noValidate={true}>
              <FormInput
                name="email"
                type="email"
                label="Email"
                onInput={() => {
                  if (errors.email) {
                    setFieldError('email', '')
                    if (!(errors.password == yupMessages.password.required)) {
                      setFieldError('password', '')
                    }
                  }
                }}
              />
              {errors.email == yupMessages.email.required && <p className="text-error text-red-500">{errors.email}</p>}
              <FormInput
                name="password"
                type="password"
                label="Пароль"
                onInput={() => {
                  if (errors.password) {
                    setFieldError('password', '')
                    if (!(errors.email == yupMessages.email.required)) {
                      setFieldError('email', '')
                    }
                  }
                }}
              />
              {errors.password == yupMessages.password.required && (
                <p className="text-error text-red-500">{errors.password}</p>
              )}
              <button className="btn" type="submit">
                Войти
              </button>
              {(error || errors.email || errors.password || (data?.signIn && !data.signIn.success)) &&
                !(errors.email == yupMessages.email.required) &&
                !(errors.password == yupMessages.password.required) && (
                  <p className="text-error text-red-500">
                    {error?.message || errors.email || errors.password || data?.signIn.message}
                  </p>
                )}
              <Link href="/register">Создать аккаунт</Link>
              <Link href="/reset">Забыли пароль?</Link>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export default SignIn
