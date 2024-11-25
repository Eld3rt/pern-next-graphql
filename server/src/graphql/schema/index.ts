import pkg from 'lodash'
import * as baseModule from './base'
import * as usersModule from './users'
import * as coursesModule from './courses'

const { merge } = pkg

export const typeDefs = [baseModule.typeDefs, usersModule.typeDefs, coursesModule.typeDefs]

export const resolvers = merge({}, usersModule.resolvers, coursesModule.resolvers)
