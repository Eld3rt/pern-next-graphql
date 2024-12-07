'use client'

import { useState } from 'react'
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
  const [isUpdated, setIsUpdated] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const { email } = { ...values }
    actions.resetForm()
    try {
      if (isUpdated) {
        setIsUpdated(false)
      }
      const { data } = await resetPassword({
        variables: {
          email: email,
        },
      })
      if (data?.resetPassword?.message) {
        setIsUpdated(true)
        setMessage(data?.resetPassword?.message)
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
        email: Yup.string().email('Некорректный email'),
      })}
      onSubmit={handleSubmit}
    >
      <div className="resetPasswordForm">
        <Form>
          <FormInput name="email" type="email" label="Email" />

          <button className="btn" type="submit">
            Сбросить пароль
          </button>
          {isUpdated ? <p className="text-success">{message}</p> : <p className="text-error">{error}</p>}
          <Link href={'/login'}>Вернуться на страницу входа</Link>
        </Form>
      </div>
    </Formik>
  )
}

export default ResetPassword
