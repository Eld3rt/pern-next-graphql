import { redis } from '../redis.js'
import { QueryConfirmAccountArgs, RequireFields } from '../../graphql/types/resolvers-types'

export const getCachedUser = async (args: RequireFields<QueryConfirmAccountArgs, 'key'>) => {
  const { key } = args

  const redisResult = await redis.multi().hgetall(key).exec()

  if (!redisResult) {
    return null
  }

  if (redisResult[0][0]) {
    throw redisResult[0][0]
  }

  const cachedUser = redisResult[0][1] as {
    name?: string
    email: string
    passhash: string
    path: string
  }

  if (!cachedUser.email || !cachedUser.passhash) {
    return null
  }

  await redis.del(key)

  return cachedUser
}
