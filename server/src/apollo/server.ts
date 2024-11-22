import { ApolloServer } from '@apollo/server'
import { typeDefs, resolvers } from '../graphql/schema/index'

export interface MyContext {}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
})

export { server }
