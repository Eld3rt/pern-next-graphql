'use client'

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
  const [updateEmail, { data, error }] = useUpdateEmailMutation({
    notifyOnNetworkStatusChange: true,
  })

  const yupMessages = {
    email: {
      required: 'Требуется указать email',
      email: 'Некорректный email',
      max: 'Email слишком длинный',
    },
  }

  const handleSubmit = async (values: FormikValues) => {
    const { email } = { ...values }

    await updateEmail({
      variables: {
        email: email,
      },
    })
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
            <button className="btn" type="submit">
              Сохранить
            </button>
            {data?.updateEmail.success && <p className="text-success">{data.updateEmail.message}</p>}
            {(error || errors.email || (data?.updateEmail && !data.updateEmail.success)) && (
              <p className="text-error text-red-500">{error?.message || errors.email || data?.updateEmail.message}</p>
            )}
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default UpdateEmail
