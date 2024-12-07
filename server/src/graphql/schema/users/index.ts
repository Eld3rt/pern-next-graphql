import gql from 'graphql-tag'
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'
import { compare } from 'bcrypt'
import * as Yup from 'yup'
import { Resolvers } from '../../types/resolvers-types.js'
import { authValidation } from '../../../utils/authValidation.js'
import { createCachedUser } from '../../../redis/functions/createCachedUser.js'
import { createUser } from '../../../prisma/functions/createUser.js'
import { getCachedUser } from '../../../redis/functions/getCachedUser.js'
import { getExistingUser } from '../../../prisma/functions/getExistingUser.js'
import { getTransport } from '../../../nodemailer/transport.js'
import { verifyAccount } from '../../../nodemailer/verifyAccount.js'
import { createCachedSession } from '../../../redis/functions/createCachedSession.js'
import { deleteCachedSession } from '../../../redis/functions/deleteCachedSession.js'
import { updateUserName } from '../../../prisma/functions/updateUserName.js'
import { verifyEmail } from '../../../nodemailer/verifyEmail.js'
import { createCachedEmail } from '../../../redis/functions/createCachedEmail.js'
import { getCachedEmail } from '../../../redis/functions/getCachedEmail.js'
import { updateEmail } from '../../../prisma/functions/updateEmail.js'
import { updatePassword } from '../../../prisma/functions/updatePassword.js'
import { createCachedReset } from '../../../redis/functions/createCachedReset.js'
import { verifyPassword } from '../../../nodemailer/verifyPassword.js'
import { getCachedReset } from '../../../redis/functions/getCachedReset.js'

const crypto = await import('node:crypto')

export const typeDefs = gql`
  extend type Query {
    me: User
    confirmAccount(key: String!): ConfirmAccountResponse
    confirmEmail(key: String!): ConfirmEmailResponse
  }

  extend type Mutation {
    signUp(name: String!, email: String!, password: String!, path: String): SignUpResponse
    signIn(email: String!, password: String!): SignInResponse
    signOut: SignOutResponse
    updateUserName(newName: String!): UpdateUserNameResponse
    updateEmail(email: String!): UpdateEmailResponse
    updatePassword(oldPassword: String!, newPassword: String!): UpdatePasswordResponse
    resetPassword(email: String!): ResetPasswordResponse
    confirmPassword(key: String!, password: String!): ConfirmPasswordResponse
  }

  type User {
    id: Int!
    name: String
    email: String!
  }

  type SignUpResponse {
    message: String!
  }

  type ConfirmAccountResponse {
    user: User
    path: String
    sessionToken: String
  }

  type SignInResponse {
    existingUser: User
  }

  type SignOutResponse {
    message: String!
  }

  type UpdateUserNameResponse {
    message: String!
  }

  type UpdateEmailResponse {
    message: String!
  }

  type ConfirmEmailResponse {
    user: User
    message: String!
  }

  type UpdatePasswordResponse {
    message: String!
  }

  type ResetPasswordResponse {
    message: String!
  }

  type ConfirmPasswordResponse {
    message: String!
  }
`
export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, context) => {
      const { currentUser } = context
      return currentUser || null
    },
    confirmAccount: async (_, args, __) => {
      const cachedUser = await getCachedUser(args)

      if (!cachedUser) {
        throw new Error('Ошибка в подтверждении email')
      }

      const user = await createUser(cachedUser)

      const sessionToken = crypto.randomBytes(32).toString('base64')

      const userId = user.id

      await createCachedSession(userId, sessionToken)

      const path = cachedUser.path

      return { user, path, sessionToken }
    },
    confirmEmail: async (_, args, __) => {
      const updateObj = await getCachedEmail(args)

      if (!updateObj) {
        throw new Error('Error getting cached user')
      }

      const user = await updateEmail(updateObj)

      return { user, message: 'Email successfully updated!' }
    },
  },
  Mutation: {
    signUp: async (_, args, __) => {
      const { name, email } = args

      await authValidation.validate(args)

      const existingUser = await getExistingUser(args)
      if (existingUser !== null) {
        throw new Error('Пользователь с таким email уже существует.')
      }

      const key = uuidv4()

      await createCachedUser(args, key)

      const transport = await getTransport()
      const mailOptions = verifyAccount({
        name: name,
        email: email,
        uuid: key,
      })
      transport.sendMail(mailOptions).then(info => {
        console.log(`Message id: ${info.messageId}`)
        console.log(`URL: ${nodemailer.getTestMessageUrl(info)}`)
      })

      return {
        message:
          'Спасибо за регистрацию! Для завершения процедуры, перейдите по ссылке в письме, отправленном на указанный email.',
      }
    },
    signIn: async (_, args, context) => {
      const { password } = args
      const { res } = context

      await authValidation.validate(args)

      const existingUser = await getExistingUser(args)

      const passwordMatch = await compare(password, (existingUser?.passhash as string) || '')

      if (!existingUser || !passwordMatch) {
        throw new Error('Неверный email или пароль')
      }

      const sessionToken = crypto.randomBytes(32).toString('base64')

      const userId = existingUser.id

      await createCachedSession(userId, sessionToken)

      res.cookie('sid', sessionToken, {
        maxAge: 60 * 60 * 24 * 7 * 1000, // One week
      })

      return { existingUser }
    },
    signOut: async (_, __, context) => {
      const { currentUser, authToken } = context

      if (!currentUser) {
        return null
      }

      const { id } = currentUser

      await deleteCachedSession(id, authToken)

      return { message: 'Выход успешно произведен.' }
    },
    updateUserName: async (_, args, context) => {
      const { currentUser } = context

      if (!currentUser) return null

      await Yup.object({
        newName: Yup.string().max(200, 'Имя слишком длинное'),
      }).validate(args)

      await updateUserName(args, currentUser)

      return { message: 'Имя успешно изменено!' }
    },
    updateEmail: async (_, args, context) => {
      const { email } = args
      const { currentUser } = context

      if (!currentUser) return null

      await Yup.object({
        email: Yup.string().email('Некорректный email').max(200, 'Email слишком длинный'),
      }).validate(args)

      const existingUser = await getExistingUser(args)

      if (existingUser !== null) {
        throw new Error('Email уже занят другим пользователем')
      }

      const key = uuidv4()

      const userId = currentUser.id

      await createCachedEmail(args, key, userId)

      const transport = await getTransport()
      const mailOptions = verifyEmail({
        name: currentUser.name,
        email: email,
        uuid: key,
      })
      transport.sendMail(mailOptions).then(info => {
        console.log(`Message id: ${info.messageId}`)
        console.log(`URL: ${nodemailer.getTestMessageUrl(info)}`)
      })

      return {
        message: `Мы отправили на Ваш email ${email} письмо для подтверждения изменения данных Вашего профиля.`,
      }
    },
    updatePassword: async (_, args, context) => {
      const { oldPassword, newPassword } = args
      const { currentUser } = context

      if (!currentUser) return null

      await Yup.object({
        newPassword: Yup.string().min(6, 'Требуется указать пароль от 6 символов').max(200, 'Пароль слишком длинный'),
      }).validate(args)

      const passwordMatch = await compare(oldPassword, (currentUser.passhash as string) || '')

      if (!passwordMatch) {
        throw new Error('Неверно указан старый пароль')
      }
      const userId = currentUser.id
      await updatePassword(newPassword, userId)

      return {
        message: 'Пароль успешно изменен!',
      }
    },
    resetPassword: async (_, args, __) => {
      await Yup.object({
        email: Yup.string().email('Некорректный email'),
      }).validate(args)

      const existingUser = await getExistingUser(args)

      if (!existingUser) {
        throw new Error('Пользователя с таким email не существует')
      }

      const userId = existingUser.id

      const key = uuidv4()

      await createCachedReset(key, userId)

      const transport = await getTransport()
      const mailOptions = verifyPassword({
        name: existingUser.name,
        email: existingUser.email,
        uuid: key,
      })
      transport.sendMail(mailOptions).then(info => {
        console.log(`Message id: ${info.messageId}`)
        console.log(`URL: ${nodemailer.getTestMessageUrl(info)}`)
      })
      return {
        message: `Мы отправили на указанный email письмо для сброса пароля.`,
      }
    },
    confirmPassword: async (_, args, __) => {
      const { key, password } = args
      await Yup.object({
        password: Yup.string().min(6, 'Требуется указать пароль от 6 символов').max(200, 'Пароль слишком длинный'),
      }).validate(args)

      const userId = await getCachedReset(key)

      if (!userId) return null

      await updatePassword(password, userId)

      return {
        message: 'Новый пароль успешно сохранен!',
      }
    },
  },
}
