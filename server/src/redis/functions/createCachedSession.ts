import { redis } from '../redis.js'

export const createCachedSession = async (userId: number, sessionToken: string) => {
  await redis
    .multi()
    .set(sessionToken, userId)
    .expire(sessionToken, 60 * 60 * 24 * 7) // One week
    .exec()
}
