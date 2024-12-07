'use client'

import { useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useUpdatePasswordMutation } from '@/graphql/generated'
import FormInput from '../forms/FormInput'

interface Props {}
interface FormikValues {
  oldPassword: string
  newPassword: string
}

const UpdatePassword: React.FC<Props> = () => {
  const [updatePassword] = useUpdatePasswordMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [isUpdated, setIsUpdated] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const { oldPassword, newPassword } = { ...values }
    actions.resetForm()
    try {
      if (isUpdated) {
        setIsUpdated(false)
      }
      const { data } = await updatePassword({
        variables: {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      })

      if (data?.updatePassword?.message) {
        setIsUpdated(true)
        setMessage(data?.updatePassword?.message)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
      }}
      validationSchema={Yup.object({
        newPassword: Yup.string().min(6, 'Требуется указать пароль от 6 символов').max(200, 'Пароль слишком длинный'),
      })}
      onSubmit={handleSubmit}
    >
      <div className="loginForm">
        <Form>
          <FormInput name="oldPassword" type="password" label="Старый пароль" />
          <FormInput name="newPassword" type="password" label="Новый пароль" />

          <button className="btn" type="submit">
            Сохранить
          </button>
          {isUpdated ? <p className="text-success">{message}</p> : <p className="text-error">{error}</p>}
        </Form>
      </div>
    </Formik>
  )
}

export default UpdatePassword
