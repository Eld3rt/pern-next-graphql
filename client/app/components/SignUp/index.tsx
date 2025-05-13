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
    <section className="sign-up min-h-screen flex items-center justify-center p-4">
      <div className="sign-up-card bg-white w-full max-w-5xl rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:p-10">
        <div className="sign-up-card__text p-8 md:p-12 flex flex-col justify-center">
          <div className="sign-up-card__text-login mb-6 text-sm flex gap-2">
            <p className="sign-up-card__text-login__description text-gray-500">Уже есть аккаунт?</p>
            <Link className="sign-up-card__link" href={course_slug ? `/login?course_slug=${course_slug}` : '/login'}>
              Войти
            </Link>
          </div>
          <h2 className="sign-up-card__title text-xl sm:text-3xl font-semibold mb-8">Зарегистрироваться</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              name: Yup.string().max(5, yupMessages.name.max),
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
              <Form className="sign-up-card__form" noValidate={true}>
                <div className="sign-up-card__inputs grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="sign-up-card__input">
                    <FormInput
                      name="name"
                      type="text"
                      label="Имя"
                      onInput={e => {
                        if (errors.name == yupMessages.name.max) {
                          if (Yup.string().max(5).isValidSync(e.currentTarget.value)) {
                            setFieldError('name', '')
                          }
                        }
                      }}
                    />
                    {errors.name && <p className="validation-message text-red-500 text-sm">{errors.name}</p>}
                  </div>
                  <div className="sign-up-card__input">
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
                    {errors.email && <p className="validation-message text-red-500 text-sm">{errors.email}</p>}
                  </div>
                </div>

                <div className="sign-up-card__input">
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
                  {errors.password && <p className="validation-message text-red-500 text-sm">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  className="sign-up-card__button w-full mt-6 mb-4 bg-[#701437] text-white py-3 rounded-lg shadow-lg text-lg"
                >
                  Зарегистрироваться
                </button>

                {data?.signUp.success && (
                  <p className="validation-message text-green-600 text-sm">{data.signUp.message}</p>
                )}
                {(error || (data?.signUp && !data.signUp.success)) && (
                  <p className="validation-message text-red-500 text-sm">{error?.message || data?.signUp.message}</p>
                )}
              </Form>
            )}
          </Formik>
        </div>

        <div className="sign-up-card__image hidden md:block">
          <img
            src="https://ik.imagekit.io/x3xxjzs9x/sign-up/form-image.png"
            alt="Sign up image"
            className="sign-up-card__picture w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default SignUp
