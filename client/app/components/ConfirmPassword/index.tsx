'use client'

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
  const [confirmPassword, { data, error }] = useConfirmPasswordMutation({
    notifyOnNetworkStatusChange: true,
  })

  const yupMessages = {
    password: {
      required: 'Требуется указать новый пароль',
      min: 'Требуется указать пароль от 6 символов',
      max: 'Пароль слишком длинный',
    },
  }

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const { password } = { ...values }
    actions.resetForm()
    if (!key) throw new Error('Возникла ошибка при восстановлении пароля. Попробуйте снова через некоторое время.')
    await confirmPassword({
      variables: {
        key: key,
        password: password,
      },
    })
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
            {!data?.confirmPassword && (
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
                    if (Yup.string().max(200).isValidSync(e.currentTarget.value)) {
                      setFieldError('password', '')
                    }
                  }
                }}
              />
            )}
            {errors.password && <p className="text-error text-red-500">{errors.password}</p>}
            {!data?.confirmPassword && (
              <button className="btn" type="submit">
                Сохранить
              </button>
            )}
            {data?.confirmPassword.success && <p className="text-success">{data.confirmPassword.message}</p>}
            {(error || (data?.confirmPassword && !data.confirmPassword.success)) && (
              <p className="text-error text-red-500">{error?.message || data?.confirmPassword.message}</p>
            )}
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default ConfirmPassword
