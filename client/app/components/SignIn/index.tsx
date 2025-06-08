'use client'

import React, { useEffect } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSignInMutation } from '@/graphql/generated'
import * as Yup from 'yup'
import FormInput from '../forms/FormInput'
import { useRouter } from 'next/navigation'

interface Props {}
interface FormikValues {
  email: string
  password: string
}

const SignIn: React.FC<Props> = () => {
  const router = useRouter()
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
      router.push(`${course_slug ? `http://localhost:4000/courses/${course_slug}` : 'http://localhost:4000'}`)
    }
  }

  return (
    <section className="sign-in min-h-screen flex items-center justify-center p-4">
      <div className="sign-in-card bg-white w-full max-w-5xl rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:p-10">
        <div className="sign-in-card__text p-8 md:p-12 flex flex-col justify-center">
          <div className="sign-in-card__register mb-6 text-sm flex gap-2">
            <p className="text-sm text-gray-500">Нет аккаунта?</p>
            <Link href="/register" className="sign-in-card__link">
              Зарегистрироваться
            </Link>
          </div>
          <h2 className="sign-in-card__title text-xl sm:text-3xl font-semibold mb-8">Войти в аккаунт</h2>

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
                  !(errors.email === yupMessages.email.required) &&
                  !(errors.password === yupMessages.password.required)
                ) {
                  setFieldValue('email', '')
                  setFieldValue('password', '')
                }
              }, [errors])

              return (
                <Form noValidate={true} className="sign-in-card__form">
                  <FormInput
                    name="email"
                    type="email"
                    label="Email"
                    onInput={() => {
                      if (errors.email) {
                        setFieldError('email', '')
                        if (!(errors.password === yupMessages.password.required)) {
                          setFieldError('password', '')
                        }
                      }
                    }}
                  />
                  {errors.email === yupMessages.email.required && (
                    <p className="validation-message text-sm text-red-500">{errors.email}</p>
                  )}

                  <FormInput
                    name="password"
                    type="password"
                    label="Пароль"
                    onInput={() => {
                      if (errors.password) {
                        setFieldError('password', '')
                        if (!(errors.email === yupMessages.email.required)) {
                          setFieldError('email', '')
                        }
                      }
                    }}
                  />
                  {errors.password === yupMessages.password.required && (
                    <p className="validation-message text-sm text-red-500">{errors.password}</p>
                  )}

                  <button
                    type="submit"
                    className="sign-in-card__button w-full mt-6 mb-4 bg-[#701437] text-white py-3 rounded-lg shadow-lg text-lg"
                  >
                    Войти
                  </button>

                  {(error || errors.email || errors.password || (data?.signIn && !data.signIn.success)) &&
                    !(errors.email === yupMessages.email.required) &&
                    !(errors.password === yupMessages.password.required) && (
                      <p className="validation-message text-sm text-red-500">
                        {error?.message || errors.email || errors.password || data?.signIn.message}
                      </p>
                    )}

                  <div className="sign-in-card-reset flex justify-between text-sm mt-2">
                    <Link href="/reset" className="sign-in-card-reset__link">
                      Забыли пароль?
                    </Link>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>

        <div className="sign-in-card__image hidden md:block">
          <img
            src="https://ik.imagekit.io/x3xxjzs9x/sign-in/form-image.jpg"
            alt="Sign in image"
            className="sign-in-card__picture w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default SignIn
