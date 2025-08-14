import pkg from 'lodash'
import * as baseModule from './base/index.js'
import * as usersModule from './users/index.js'
import * as coursesModule from './courses/index.js'

const { merge } = pkg

export const typeDefs = [baseModule.typeDefs, usersModule.typeDefs, coursesModule.typeDefs]

export const resolvers = merge({}, usersModule.resolvers, coursesModule.resolvers)
