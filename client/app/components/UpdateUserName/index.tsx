'use client'

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
  const [updateUserName, { data, error }] = useUpdateUserNameMutation({
    notifyOnNetworkStatusChange: true,
  })

  const yupMessages = {
    name: {
      max: 'Имя слишком длинное',
    },
  }

  const handleSubmit = async (values: FormikValues) => {
    const { name } = { ...values }
    await updateUserName({
      variables: {
        newName: name,
      },
    })
  }

  return (
    <Formik
      initialValues={{ name: currentName || '' }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(200, 'Имя слишком длинное')
          .test(() => {
            if (data?.updateUserName) {
              data.updateUserName.message = ''
            }
            if (error) {
              error.message = ''
            }
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

            <button className="btn" type="submit">
              Сохранить
            </button>
            {data?.updateUserName.success && <p className="text-success">{data.updateUserName.message}</p>}
            {(error || errors.name || (data?.updateUserName && !data.updateUserName.success)) && (
              <p className="text-error text-red-500">{error?.message || errors.name || data?.updateUserName.message}</p>
            )}
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default UpdateUserName
