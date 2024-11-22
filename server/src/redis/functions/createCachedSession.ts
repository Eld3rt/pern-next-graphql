import { redis } from '../redis'

export const createCachedSession = async (userId: number, sessionToken: string) => {
  await redis
    .multi()
    .set(sessionToken, userId)
    .sadd(userId as unknown as string, sessionToken)
    .expire(sessionToken, 60 * 60 * 24 * 7) // One week
    .exec()
}
