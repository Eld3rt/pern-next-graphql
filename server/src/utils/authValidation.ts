import * as Yup from 'yup'

export const authValidation = Yup.object({
  name: Yup.string().max(200, 'Имя слишком длинное'),
  email: Yup.string().required('Требуется указать email').email('Некорректный email').max(200, 'Email слишком длинный'),
  password: Yup.string()
    .required('Требуется указать пароль')
    .min(6, 'Требуется указать пароль от 6 символов')
    .max(200, 'Пароль слишком длинный'),
})
