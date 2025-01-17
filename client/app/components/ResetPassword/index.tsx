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
    const { email } = { ...values }
    actions.resetForm()
    await resetPassword({
      variables: {
        email: email,
      },
    })
  }
  return (
    <Formik
      initialValues={{
        email: '',
      }}
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
          if (errors.email && !(errors.email == yupMessages.email.required)) {
            setFieldValue('email', '')
          }
        }, [errors])

        return (
          <div className="resetPasswordForm">
            <Form noValidate={true}>
              <FormInput
                name="email"
                type="email"
                label="Email"
                onInput={() => {
                  if (errors.email) {
                    setFieldError('email', '')
                  }
                }}
              />
              {errors.email == yupMessages.email.required && <p className="text-error text-red-500">{errors.email}</p>}
              <button className="btn" type="submit">
                Сбросить пароль
              </button>
              {data?.resetPassword.success && <p className="text-success">{data.resetPassword.message}</p>}
              {(error || errors.email || (data?.resetPassword && !data.resetPassword.success)) &&
                !(errors.email == yupMessages.email.required) && (
                  <p className="text-error text-red-500">
                    {error?.message || errors.email || data?.resetPassword.message}
                  </p>
                )}
              <Link href={'/login'}>Вернуться на страницу входа</Link>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export default ResetPassword
