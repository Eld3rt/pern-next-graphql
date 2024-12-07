import { redis } from '../redis'

export const createCachedReset = async (key: string, userId: number) => {
  await redis
    .multi()
    .set(key, userId)
    .expire(key, 60 * 60 * 24) // One day
    .exec()
}
