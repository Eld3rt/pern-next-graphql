import pkg from 'lodash'
import * as baseModule from './base'
import * as usersModule from './users'

const { merge } = pkg

export const typeDefs = [baseModule.typeDefs, usersModule.typeDefs]

export const resolvers = merge({}, usersModule.resolvers)
