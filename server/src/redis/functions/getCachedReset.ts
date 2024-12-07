import { redis } from '../redis'

export const getCachedReset = async (key: string) => {
  const userId = await redis.get(key)

  if (!userId) {
    return null
  }

  await redis.del(key)

  return parseInt(userId)
}
