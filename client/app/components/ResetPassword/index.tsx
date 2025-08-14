'use client'

import { useEffect } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { useResetPasswordMutation } from '@/graphql/generated'
import FormInput from '../forms/FormInput'

interface Props {}
interface FormikValues {
  email: string
}

const ResetPassword: React.FC<Props> = () => {
  const [resetPassword, { data, error }] = useResetPasswordMutation({
    notifyOnNetworkStatusChange: true,
  })

  const yupMessages = {
    email: {
      required: 'Требуется указать email',
      email: 'Неверный email',
      max: 'Неверный email',
    },
  }

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const { email } = values
    actions.resetForm()
    await resetPassword({ variables: { email } })
  }

  return (
    <section className="reset-password min-h-screen flex items-center justify-center p-4">
      <div className="reset-password-card bg-white w-full max-w-5xl rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:p-10">
        <div className="reset-password__text p-8 md:p-12 flex flex-col justify-center">
          <h2 className="reset-password__title text-3xl font-bold mb-2">Сбросить пароль</h2>
          <p className="reset-password__description text-sm mb-6">
            Введите свой email, и мы отправим на него ссылку для сброса пароля.
          </p>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .required(yupMessages.email.required)
                .email(yupMessages.email.email)
                .max(200, yupMessages.email.max),
            })}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ errors, setFieldValue, setFieldError }) => {
              useEffect(() => {
                if (errors.email && errors.email !== yupMessages.email.required) {
                  setFieldValue('email', '')
                }
              }, [errors])

              return (
                <Form noValidate={true} className="reset-password__form">
                  <FormInput
                    name="email"
                    type="email"
                    label="Email"
                    onInput={() => {
                      if (errors.email) setFieldError('email', '')
                    }}
                  />

                  {errors.email === yupMessages.email.required && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}

                  <button
                    type="submit"
                    className="reset-password__button w-full mt-6 mb-4 bg-[#701437] text-white py-3 rounded-lg shadow-lg text-lg"
                  >
                    Сбросить пароль
                  </button>

                  {data?.resetPassword.success && (
                    <p className="validation-message text-sm text-green-600">{data.resetPassword.message}</p>
                  )}

                  {(error || errors.email || (data?.resetPassword && !data.resetPassword.success)) &&
                    errors.email !== yupMessages.email.required && (
                      <p className="validation-message text-sm text-red-500">
                        {error?.message || errors.email || data?.resetPassword.message}
                      </p>
                    )}
                  <div className="reset-password-login flex justify-between text-sm mt-2">
                    <Link href="/login" className="reset-password-login__link">
                      Вернуться на страницу входа
                    </Link>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>

        <div className="reset-password__image hidden md:block">
          <img
            src="https://lh3.googleusercontent.com/pw/AP1GczMGPdfwv1hmyd-5CowA0mwUUikc1oJlsTSG18HvpgwBtvnoGx8OYKLvrGqPAnXJRNyCaMd0iltnb66X7MlAMkklVr3W5ju-IkPE_TvnaUS-s49rJf_zr6PtYgSxm-sPzYXsK09LkRFScCv-JYiA_OUA=w945-h945-s-no-gm"
            alt="Reset password image"
            className="reset-password__picture w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default ResetPassword
