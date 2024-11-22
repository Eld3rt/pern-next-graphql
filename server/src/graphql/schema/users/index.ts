import gql from 'graphql-tag'
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'
import { Resolvers } from '../../types/resolvers-types.js'
import { authValidation } from '../../../utils/authValidation.js'
import { createCachedUser } from '../../../redis/functions/createCachedUser.js'
import { createUser } from '../../../prisma/functions/createUser.js'
import { getCachedUser } from '../../../redis/functions/getCachedUser.js'
import { getExistingUser } from '../../../prisma/functions/getExistingUser.js'
import { getTransport } from '../../../nodemailer/transport.js'
import { verifyAccount } from '../../../nodemailer/verifyAccount.js'

export const typeDefs = gql`
  extend type Query {
    confirmAccount(key: String!): ConfirmAccountResponse
  }

  extend type Mutation {
    signUp(name: String!, email: String!, password: String!, path: String): SignUpResponse
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
  }
`
export const resolvers: Resolvers = {
  Query: {
    confirmAccount: async (_, args, __) => {
      const cachedUser = await getCachedUser(args)

      if (!cachedUser) {
        throw new Error('Ошибка в подтверждении email')
      }

      const user = await createUser(cachedUser)

      const path = cachedUser.path

      return { user, path }
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
  },
}
