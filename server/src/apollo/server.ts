import { ApolloServer } from '@apollo/server'
import { User } from '@prisma/client'
import { Response } from 'express'
import { typeDefs, resolvers } from '../graphql/schema/index.js'

export interface MyContext {
  res: Response
  authToken: string
  currentUser: User | null
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
})

export { server }
