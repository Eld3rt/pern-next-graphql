'use client'

import { useEffect, useState } from 'react'
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
  const [resetPassword] = useResetPasswordMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const yupMessages = {
    email: {
      required: 'Требуется указать email',
      email: 'Неверный email',
      max: 'Неверный email',
    },
  }

  const clearStates = () => {
    setMessage('')
    setError('')
  }

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const { email } = { ...values }
    actions.resetForm()
    clearStates()
    try {
      const { data } = await resetPassword({
        variables: {
          email: email,
        },
      })

      if (!data?.resetPassword) {
        throw new Error('Возникла ошибка при сбросе пароля. Попробуйте снова через некоторое время.')
      }

      if (data.resetPassword.success) {
        setMessage(data.resetPassword.message)
      } else {
        setError(data.resetPassword.message)
      }
    } catch (err: any) {
      setError(err.message)
    }
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
              <button className="btn" type="submit" onClick={clearStates}>
                Сбросить пароль
              </button>
              {message && <p className="text-success">{message}</p>}
              {(error || errors.email) && !(errors.email == yupMessages.email.required) && (
                <p className="text-error text-red-500">{error || errors.email}</p>
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
