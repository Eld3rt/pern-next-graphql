'use client'

import { useEffect, useState } from 'react'
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

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const yupMessages = {
    oldPassword: {
      required: 'Требуется указать старый пароль',
      min: 'Неверно указан старый пароль',
      max: 'Неверно указан старый пароль',
    },
    newPassword: {
      required: 'Требуется указать новый пароль',
      min: 'Требуется указать пароль от 6 символов',
      max: 'Пароль слишком длинный',
    },
  }

  const clearStates = () => {
    setMessage('')
    setError('')
  }

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const { oldPassword, newPassword } = { ...values }
    actions.resetForm()
    clearStates()
    try {
      const { data } = await updatePassword({
        variables: {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      })

      if (!data?.updatePassword) {
        throw new Error('Возникла ошибка при изменении пароля. Попробуйте снова через некоторое время.')
      }

      if (data.updatePassword.success) {
        setMessage(data.updatePassword.message)
      } else {
        setError(data.updatePassword.message)
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
        oldPassword: Yup.string()
          .required(yupMessages.oldPassword.required)
          .min(6, yupMessages.oldPassword.min)
          .max(200, yupMessages.oldPassword.max),
        newPassword: Yup.string()
          .required(yupMessages.newPassword.required)
          .min(6, yupMessages.newPassword.min)
          .max(200, yupMessages.newPassword.max),
      })}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, setFieldValue, setFieldError }) => {
        useEffect(() => {
          if (
            errors.oldPassword &&
            !(errors.oldPassword == yupMessages.oldPassword.required) &&
            !(errors.newPassword == yupMessages.newPassword.required) &&
            !(errors.newPassword == yupMessages.newPassword.min) &&
            !(errors.newPassword == yupMessages.newPassword.max)
          ) {
            setFieldValue('oldPassword', '')
            setFieldValue('newPassword', '')
          }
        }, [errors])

        return (
          <div className="loginForm">
            <Form noValidate={true}>
              <FormInput
                name="oldPassword"
                type="password"
                label="Старый пароль"
                onInput={() => {
                  if (errors.oldPassword) {
                    setFieldError('oldPassword', '')
                  }
                }}
              />
              {errors.oldPassword == yupMessages.oldPassword.required && (
                <p className="text-error text-red-500">{errors.oldPassword}</p>
              )}
              <FormInput
                name="newPassword"
                type="password"
                label="Новый пароль"
                onInput={e => {
                  if (errors.newPassword == yupMessages.newPassword.required) {
                    setFieldError('newPassword', '')
                    if (!(errors.oldPassword == yupMessages.oldPassword.required)) {
                      setFieldError('oldPassword', '')
                    }
                  }

                  if (errors.newPassword == yupMessages.newPassword.min) {
                    if (Yup.string().min(6).isValidSync(e.currentTarget.value) && e.currentTarget.value) {
                      setFieldError('newPassword', '')
                    }
                    if (!(errors.oldPassword == yupMessages.oldPassword.required)) {
                      setFieldError('oldPassword', '')
                    }
                  }

                  if (errors.newPassword == yupMessages.newPassword.max) {
                    if (Yup.string().max(200).isValidSync(e.currentTarget.value)) {
                      setFieldError('newPassword', '')
                    }
                    if (!(errors.oldPassword == yupMessages.oldPassword.required)) {
                      setFieldError('oldPassword', '')
                    }
                  }
                }}
              />
              {errors.newPassword && <p className="text-error text-red-500">{errors.newPassword}</p>}
              <button className="btn" type="submit" onClick={clearStates}>
                Сохранить
              </button>
              {message && <p className="text-success">{message}</p>}
              {(error || errors.oldPassword) &&
                !(errors.oldPassword == yupMessages.oldPassword.required) &&
                !(errors.newPassword == yupMessages.newPassword.required) &&
                !(errors.newPassword == yupMessages.newPassword.min) &&
                !(errors.newPassword == yupMessages.newPassword.max) && (
                  <p className="text-error text-red-500">{error || errors.oldPassword}</p>
                )}
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export default UpdatePassword
