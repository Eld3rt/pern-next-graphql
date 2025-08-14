import { redis } from '../redis.js'

export const hasKey = async (key: string) => {
  const isCached = await redis.exists(key)

  return isCached
}
