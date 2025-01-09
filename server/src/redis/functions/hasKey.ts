import { redis } from '../redis'

export const hasKey = async (key: string) => {
  const isCached = await redis.exists(key)

  return isCached
}
