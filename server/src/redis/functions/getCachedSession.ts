import { redis } from '../redis'

export const getCachedSession = async (key: string) => {
  const userId = await redis.get(key)
  if (!userId) {
    return null
  }
  return parseInt(userId)
}
