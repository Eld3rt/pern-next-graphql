import { redis } from '../redis'

export const createCachedEmail = async (args: { email: string }, key: string, userId: number) => {
  const updateObj = {
    email: args.email,
    id: userId,
  }
  await redis
    .multi()
    .hmset(key, updateObj)
    .expire(key, 60 * 60 * 24) // One day
    .exec()
}
