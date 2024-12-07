'use client'

import { useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useSearchParams } from 'next/navigation'
import { useConfirmPasswordMutation } from '@/graphql/generated'
import FormInput from '../forms/FormInput'

interface Props {}
interface FormikValues {
  password: string
}

const ConfirmPassword: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const key = searchParams.get('key')
  const [confirmPassword] = useConfirmPasswordMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [isUpdated, setIsUpdated] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const { password } = { ...values }
    actions.resetForm()
    try {
      if (!key) return null
      const { data } = await confirmPassword({
        variables: {
          key: key,
          password: password,
        },
      })
      if (data?.confirmPassword?.message) {
        setIsUpdated(true)
        setMessage(data?.confirmPassword?.message)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Formik
      initialValues={{
        password: '',
      }}
      validationSchema={Yup.object({
        password: Yup.string().min(6, 'Требуется указать пароль от 6 символов').max(200, 'Пароль слишком длинный'),
      })}
      onSubmit={handleSubmit}
    >
      <div className="confirmPasswordForm">
        <Form>
          <FormInput name="password" type="password" label="Новый пароль" />

          <button className="btn" type="submit">
            Сохранить
          </button>
          {isUpdated ? <p className="text-success">{message}</p> : <p className="text-error">{error}</p>}
        </Form>
      </div>
    </Formik>
  )
}

export default ConfirmPassword
