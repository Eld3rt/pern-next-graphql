import pkg from 'graphql-tag'
const gql = pkg.default

export const typeDefs = gql`
  scalar PositiveInt
  type Query
  type Mutation
`
