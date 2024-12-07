'use client'

import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useUpdateEmailMutation } from '@/graphql/generated'
import FormInput from '../forms/FormInput'

interface Props {
  currentEmail: string
}
interface FormikValues {
  email: string
}

const UpdateEmail: React.FC<Props> = ({ currentEmail }) => {
  const [updateEmail] = useUpdateEmailMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [isUpdated, setIsUpdated] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (values: FormikValues) => {
    const { email } = { ...values }
    try {
      const { data } = await updateEmail({
        variables: {
          email: email,
        },
      })
      if (data?.updateEmail?.message) {
        setIsUpdated(true)
        setMessage(data.updateEmail.message)
      } else throw new Error('Ошибка изменения данных')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Formik
      initialValues={{ email: currentEmail }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Требуется указать email')
          .email('Некорректный email')
          .max(200, 'Email слишком длинный'),
      })}
      onSubmit={handleSubmit}
    >
      <div className="updateEmailForm">
        <Form>
          <FormInput name="email" type="text" label="Email:" />
          <button className="btn" type="submit">
            Сохранить
          </button>
          {isUpdated ? <p className="text-success">{message}</p> : <p className="text-error">{error}</p>}
        </Form>
      </div>
    </Formik>
  )
}

export default UpdateEmail
