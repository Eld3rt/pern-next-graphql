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
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const yupMessages = {
    email: {
      required: 'Требуется указать email',
      email: 'Некорректный email',
      max: 'Email слишком длинный',
    },
  }

  const clearStates = () => {
    setMessage('')
    setError('')
  }

  const handleSubmit = async (values: FormikValues) => {
    const { email } = { ...values }
    clearStates()
    try {
      const { data } = await updateEmail({
        variables: {
          email: email,
        },
      })

      if (!data?.updateEmail) {
        throw new Error('Возникла ошибка при изменении данных. Попробуйте снова через некоторое время.')
      }

      if (data.updateEmail.success) {
        setMessage(data.updateEmail.message)
      } else {
        setError(data.updateEmail.message)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Formik
      initialValues={{ email: currentEmail }}
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
      {({ errors, setFieldError }) => (
        <div className="updateEmailForm">
          <Form noValidate={true}>
            <FormInput
              name="email"
              type="text"
              label="Email:"
              onInput={e => {
                if (errors.email == yupMessages.email.required) {
                  setFieldError('email', '')
                }
                if (errors.email == yupMessages.email.email) {
                  if (Yup.string().email().isValidSync(e.currentTarget.value) && e.currentTarget.value) {
                    setFieldError('email', '')
                  }
                }
                if (errors.email == yupMessages.email.max) {
                  if (Yup.string().max(200).isValidSync(e.currentTarget.value)) {
                    setFieldError('email', '')
                  }
                }
              }}
            />
            <button className="btn" type="submit" onClick={clearStates}>
              Сохранить
            </button>
            {message && <p className="text-success">{message}</p>}
            {(error || errors.email) && <p className="text-error text-red-500">{error || errors.email}</p>}
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default UpdateEmail
