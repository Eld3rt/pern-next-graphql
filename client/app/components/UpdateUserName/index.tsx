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
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const yupMessages = {
    name: {
      max: 'Имя слишком длинное',
    },
  }

  const clearStates = () => {
    setMessage('')
    setError('')
  }

  const handleSubmit = async (values: FormikValues) => {
    const { name } = { ...values }
    clearStates()
    try {
      const { data } = await updateUserName({
        variables: {
          newName: name,
        },
      })

      if (!data?.updateUserName) {
        throw new Error('Возникла ошибка при изменении данных. Попробуйте снова через некоторое время.')
      }

      if (data.updateUserName.success) {
        setMessage(data.updateUserName.message)
      } else {
        setError(data.updateUserName.message)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Formik
      initialValues={{ name: currentName || '' }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(200, 'Имя слишком длинное')
          .test(() => {
            clearStates()
            return true
          }),
      })}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, setFieldError }) => (
        <div className="loginForm">
          <Form noValidate={true}>
            <FormInput
              name="name"
              type="text"
              label="Имя пользователя:"
              onInput={e => {
                if (errors.name == yupMessages.name.max) {
                  if (Yup.string().max(200).isValidSync(e.currentTarget.value)) {
                    setFieldError('name', '')
                  }
                }
              }}
            />

            <button className="btn" type="submit" onClick={clearStates}>
              Сохранить
            </button>
            {message && <p className="text-success">{message}</p>}
            {(error || errors.name) && <p className="text-error text-red-500">{error || errors.name}</p>}
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default UpdateUserName
