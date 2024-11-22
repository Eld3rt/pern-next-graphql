import * as Yup from 'yup'

export const authValidation = Yup.object({
  name: Yup.string().max(200, 'Name too long'),
  email: Yup.string().required('Email is required').email('Invalid email').max(200, 'Email too long'),
  password: Yup.string().required('Password is required').min(6, 'Password too short').max(200, 'Password too long'),
})
