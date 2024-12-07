'use client'

import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useUpdateUserNameMutation } from '@/graphql/generated'
import FormInput from '../forms/FormInput'

interface Props {
  currentName?: string | null
}
interface FormikValues {
  name: string
}

const UpdateUserName: React.FC<Props> = ({ currentName }) => {
  const [updateUserName] = useUpdateUserNameMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [isUpdated, setIsUpdated] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (values: FormikValues) => {
    const { name } = { ...values }
    try {
      const { data } = await updateUserName({
        variables: {
          newName: name,
        },
      })
      if (data?.updateUserName?.message) {
        setIsUpdated(true)
        setMessage(data?.updateUserName?.message)
      } else throw new Error('Ошибка изменения данных')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Formik
      initialValues={{ name: currentName || '' }}
      validationSchema={Yup.object({ name: Yup.string().max(200, 'Имя слишком длинное') })}
      onSubmit={handleSubmit}
    >
      <div className="loginForm">
        <Form>
          <FormInput name="name" type="text" label="Имя пользователя:" />

          <button className="btn" type="submit">
            Сохранить
          </button>
          {isUpdated ? <p className="text-success">{message}</p> : <p className="text-error">{error}</p>}
        </Form>
      </div>
    </Formik>
  )
}

export default UpdateUserName
