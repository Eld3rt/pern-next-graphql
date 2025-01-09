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
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const yupMessages = {
    password: {
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
    const { password } = { ...values }
    actions.resetForm()
    clearStates()
    try {
      if (!key) throw new Error('Возникла ошибка при восстановлении пароля. Попробуйте снова через некоторое время.')
      const { data } = await confirmPassword({
        variables: {
          key: key,
          password: password,
        },
      })

      if (!data?.confirmPassword) {
        throw new Error('Возникла ошибка при восстановлении пароля. Попробуйте снова через некоторое время.')
      }
      if (data.confirmPassword.success) {
        setMessage(data.confirmPassword.message)
      } else {
        setError(data.confirmPassword.message)
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
        password: Yup.string()
          .required(yupMessages.password.required)
          .min(6, yupMessages.password.min)
          .max(8, yupMessages.password.max),
      })}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, setFieldError }) => (
        <div className="confirmPasswordForm">
          <Form>
            {!message && (
              <FormInput
                name="password"
                type="password"
                label="Новый пароль"
                onInput={e => {
                  if (errors.password == yupMessages.password.required) {
                    setFieldError('password', '')
                  }
                  if (errors.password == yupMessages.password.min) {
                    if (Yup.string().min(6).isValidSync(e.currentTarget.value) && e.currentTarget.value) {
                      setFieldError('password', '')
                    }
                  }
                  if (errors.password == yupMessages.password.max) {
                    if (Yup.string().max(8).isValidSync(e.currentTarget.value)) {
                      setFieldError('password', '')
                    }
                  }
                }}
              />
            )}
            {!message && errors.password && <p className="text-error text-red-500">{errors.password}</p>}
            {!message && (
              <button className="btn" type="submit" onClick={clearStates}>
                Сохранить
              </button>
            )}
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-error text-red-500">{error}</p>}
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default ConfirmPassword
