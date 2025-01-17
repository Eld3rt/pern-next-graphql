'use client'

import { Form, Formik, FormikHelpers } from 'formik'
import { useSignUpMutation } from '@/graphql/generated'
import * as Yup from 'yup'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import FormInput from '../forms/FormInput'

interface Props {}
interface FormikValues {
  name: string
  email: string
  password: string
}

const SignUp: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const course_slug = searchParams.get('course_slug')
  const [signUp, { data, error }] = useSignUpMutation({
    notifyOnNetworkStatusChange: true,
  })

  const yupMessages = {
    name: {
      max: 'Имя слишком длинное',
    },
    email: {
      required: 'Требуется указать email',
      email: 'Некорректный email',
      max: 'Email слишком длинный',
    },
    password: {
      required: 'Требуется указать пароль',
      min: 'Требуется указать пароль от 6 символов',
      max: 'Пароль слишком длинный',
    },
  }

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const creds = { ...values }
    actions.resetForm()
    await signUp({
      variables: {
        name: creds.name,
        email: creds.email,
        password: creds.password,
        path: course_slug,
      },
    })
  }
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().max(200, yupMessages.name.max),
        email: Yup.string()
          .required(yupMessages.email.required)
          .email(yupMessages.email.email)
          .max(200, yupMessages.email.max),
        password: Yup.string()
          .required(yupMessages.password.required)
          .min(6, yupMessages.password.min)
          .max(200, yupMessages.password.max),
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
              label="Ваше имя"
              onInput={e => {
                if (errors.name == yupMessages.name.max) {
                  if (Yup.string().max(200).isValidSync(e.currentTarget.value)) {
                    setFieldError('name', '')
                  }
                }
              }}
            />
            {errors.name && <p className="text-error text-red-500">{errors.name}</p>}
            <FormInput
              name="email"
              type="email"
              label="Email"
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
            {errors.email && <p className="text-error text-red-500">{errors.email}</p>}
            <FormInput
              name="password"
              type="password"
              label="Пароль"
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
            {errors.password && <p className="text-error text-red-500">{errors.password}</p>}
            <button className="btn" type="submit">
              Зарегистрироваться
            </button>
            {data?.signUp.success && <p className="text-success">{data.signUp.message}</p>}
            {(error || (data?.signUp && !data.signUp.success)) && (
              <p className="text-error text-red-500">{error?.message || data?.signUp.message}</p>
            )}
            <Link href={course_slug ? `/login?course_slug=${course_slug}` : '/login'}>Войти</Link>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default SignUp
