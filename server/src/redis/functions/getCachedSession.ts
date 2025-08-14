import { redis } from '../redis.js'

export const getCachedSession = async (key: string) => {
  const userId = await redis.get(key)
  if (!userId) {
    return null
  }
  return parseInt(userId)
}
