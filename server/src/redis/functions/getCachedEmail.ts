import { redis } from '../redis.js'
import { QueryConfirmAccountArgs, RequireFields } from '../../graphql/types/resolvers-types.js'

export const getCachedEmail = async (args: RequireFields<QueryConfirmAccountArgs, 'key'>) => {
  const { key } = args

  const updateObj = (await redis.hgetall(key)) as { email: string; id: string }

  if (!updateObj) {
    return null
  }

  if (!updateObj.email || !updateObj.id) {
    return null
  }

  await redis.del(key)

  return {
    email: updateObj.email,
    id: parseInt(updateObj.id),
  }
}
