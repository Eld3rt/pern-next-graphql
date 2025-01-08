import gql from 'graphql-tag'
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'
import { compare } from 'bcrypt'
import * as Yup from 'yup'
import { Resolvers } from '../../types/resolvers-types.js'
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
    confirmAccount(key: String!): ConfirmAccountResponse!
    confirmEmail(key: String!): ConfirmEmailResponse!
  }

  extend type Mutation {
    signUp(name: String, email: String!, password: String!, path: String): SignUpResponse!
    signIn(email: String!, password: String!): SignInResponse!
    signOut: SignOutResponse!
    updateUserName(newName: String!): UpdateUserNameResponse!
    updateEmail(email: String!): UpdateEmailResponse!
    updatePassword(oldPassword: String!, newPassword: String!): UpdatePasswordResponse!
    resetPassword(email: String!): ResetPasswordResponse!
    confirmPassword(key: String!, password: String!): ConfirmPasswordResponse
  }

  type User {
    id: Int!
    name: String
    email: String!
  }

  type SignUpResponse {
    success: Boolean!
    message: String!
    developerMessage: String
  }

  type ConfirmAccountResponse {
    success: Boolean!
    message: String!
    developerMessage: String
    user: User
    path: String
    sessionToken: String
  }

  type SignInResponse {
    success: Boolean!
    message: String!
    developerMessage: String
    existingUser: User
  }

  type SignOutResponse {
    success: Boolean!
    message: String!
    developerMessage: String
  }

  type UpdateUserNameResponse {
    success: Boolean!
    message: String!
    developerMessage: String
    user: User
  }

  type UpdateEmailResponse {
    success: Boolean!
    message: String!
    developerMessage: String
  }

  type ConfirmEmailResponse {
    success: Boolean!
    message: String!
    developerMessage: String
    user: User
  }

  type UpdatePasswordResponse {
    success: Boolean!
    message: String!
    developerMessage: String
  }

  type ResetPasswordResponse {
    success: Boolean!
    message: String!
    developerMessage: String
  }

  type ConfirmPasswordResponse {
    success: Boolean!
    message: String!
    developerMessage: String
  }
`
export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, context) => {
      const { currentUser } = context
      return currentUser || null
    },
    confirmAccount: async (_, args, __) => {
      try {
        const cachedUser = await getCachedUser(args)

        if (!cachedUser) {
          return {
            success: false,
            message: 'Ошибка в подтверждении email',
            developerMessage: 'Error getting cached user',
          }
        }

        const user = await createUser(cachedUser)

        const sessionToken = crypto.randomBytes(32).toString('base64')

        const userId = user.id

        await createCachedSession(userId, sessionToken)

        const path = cachedUser.path

        return {
          success: true,
          message: 'Аккаунт подтвержден',
          user,
          path,
          sessionToken,
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Ошибка в подтверждении email',
          developerMessage: error.message,
        }
      }
    },
    confirmEmail: async (_, args, __) => {
      try {
        const updateObj = await getCachedEmail(args)

        if (!updateObj) {
          return {
            success: false,
            message: 'Ошибка в изменении email',
            developerMessage: 'Error getting cached email',
          }
        }

        const user = await updateEmail(updateObj)

        return {
          success: true,
          message: 'Email успешно изменен',
          user,
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Ошибка в изменении email',
          developerMessage: error.message,
        }
      }
    },
  },
  Mutation: {
    signUp: async (_, args, __) => {
      const { name, email } = args

      try {
        await Yup.object({
          name: Yup.string().max(200),
          email: Yup.string().required().email().max(200),
          password: Yup.string().required().min(6).max(200),
        }).validate(args)

        const existingUser = await getExistingUser(args)
        if (existingUser !== null) {
          return {
            success: false,
            message: 'Пользователь с таким email уже существует.',
            developerMessage: 'existingUser is not null',
          }
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
          success: true,
          message:
            'Спасибо за регистрацию! Для завершения процедуры, перейдите по ссылке в письме, отправленном на указанный email.',
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Возникла ошибка при регистрации. Попробуйте снова через некоторое время.',
          developerMessage: error.message,
        }
      }
    },
    signIn: async (_, args, context) => {
      const { password } = args
      const { res } = context

      try {
        await Yup.object({
          email: Yup.string().required().email().max(200),
          password: Yup.string().required().min(6).max(200),
        }).validate(args)

        const existingUser = await getExistingUser(args)
        if (!existingUser) {
          return {
            success: false,
            message: 'Неверный email или пароль',
            developerMessage: 'existingUser is null',
          }
        }

        const passwordMatch = await compare(password, (existingUser?.passhash as string) || '')
        if (!passwordMatch) {
          return {
            success: false,
            message: 'Неверный email или пароль',
            developerMessage: 'Password is not match',
          }
        }

        const sessionToken = crypto.randomBytes(32).toString('base64')

        const userId = existingUser.id

        await createCachedSession(userId, sessionToken)

        res.cookie('sid', sessionToken, {
          maxAge: 60 * 60 * 24 * 7 * 1000, // One week
        })

        return {
          success: true,
          message: 'Вход выполнен успешно',
          existingUser,
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Возникла ошибка при входе в аккаунт. Попробуйте снова через некоторое время.',
          developerMessage: error.message,
        }
      }
    },
    signOut: async (_, __, context) => {
      const { currentUser, authToken } = context

      if (!currentUser)
        return {
          success: false,
          message: 'Необходимо войти в аккаунт',
          developerMessage: 'Authentication error',
        }

      const { id } = currentUser

      try {
        await deleteCachedSession(id, authToken)

        return {
          success: true,
          message: 'Выход успешно произведен.',
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Возникла ошибка при выходе из аккаунта. Пожалуйста, попробуйте снова.',
          developerMessage: error.message,
        }
      }
    },
    updateUserName: async (_, args, context) => {
      const { currentUser } = context

      if (!currentUser)
        return {
          success: false,
          message: 'Необходимо войти в аккаунт',
          developerMessage: 'Authentication error',
        }

      try {
        await Yup.object({
          newName: Yup.string().max(200),
        }).validate(args)

        const updatedUser = await updateUserName(args, currentUser)
        return {
          success: true,
          message: 'Имя успешно изменено!',
          user: updatedUser,
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Возникла ошибка при изменении имени пользователя. Попробуйте снова',
          developerMessage: error.message,
        }
      }
    },
    updateEmail: async (_, args, context) => {
      const { email } = args
      const { currentUser } = context

      if (!currentUser)
        return {
          success: false,
          message: 'Необходимо войти в аккаунт',
          developerMessage: 'Authentication error',
        }

      try {
        await Yup.object({
          email: Yup.string().required().email().max(200),
        }).validate(args)

        const existingUser = await getExistingUser(args)

        if (existingUser !== null)
          return {
            success: false,
            message: 'Email уже занят другим пользователем',
            developerMessage: 'existingUser is not null',
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
          success: true,
          message: `Мы отправили на Ваш email ${email} письмо для подтверждения изменения данных Вашего профиля.`,
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Возникла ошибка при изменении email. Попробуйте снова',
          developerMessage: error.message,
        }
      }
    },
    updatePassword: async (_, args, context) => {
      const { oldPassword, newPassword } = args
      const { currentUser } = context

      if (!currentUser)
        return {
          success: false,
          message: 'Необходимо войти в аккаунт',
          developerMessage: 'Authentication error',
        }

      try {
        await Yup.object({
          oldPassword: Yup.string().required().min(6).max(200),
          newPassword: Yup.string().required().min(6).max(200),
        }).validate(args)

        const passwordMatch = await compare(oldPassword, (currentUser.passhash as string) || '')

        if (!passwordMatch) {
          return {
            success: false,
            message: 'Неверно указан старый пароль',
            developerMessage: 'Old password is not match',
          }
        }
        const userId = currentUser.id
        await updatePassword(newPassword, userId)

        return {
          success: true,
          message: 'Пароль успешно изменен!',
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Возникла ошибка при изменении пароля. Попробуйте снова',
          developerMessage: error.message,
        }
      }
    },
    resetPassword: async (_, args, __) => {
      try {
        await Yup.object({
          email: Yup.string().required().email(),
        }).validate(args)

        const existingUser = await getExistingUser(args)

        if (!existingUser) {
          return {
            success: false,
            message: 'Пользователя с таким email не существует',
            developerMessage: 'existingUser is null',
          }
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
          success: true,
          message: `Мы отправили на указанный email письмо для сброса пароля.`,
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Возникла ошибка при сбросе пароля. Попробуйте снова',
          developerMessage: error.message,
        }
      }
    },
    confirmPassword: async (_, args, __) => {
      const { key, password } = args
      try {
        await Yup.object({
          password: Yup.string().required().min(6).max(200),
        }).validate(args)

        const userId = await getCachedReset(key)

        if (!userId)
          return {
            success: false,
            message: 'Ошибка при восстановлении пароля',
            developerMessage: 'Error getting cached user id',
          }

        await updatePassword(password, userId)

        return {
          success: true,
          message: 'Новый пароль успешно сохранен!',
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Возникла ошибка при восстановлении пароля. Попробуйте снова',
          developerMessage: error.message,
        }
      }
    },
  },
}
