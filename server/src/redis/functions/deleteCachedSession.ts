import { redis } from '../redis.js'

export const deleteCachedSession = async (id: number, authToken: string) => {
  await redis
    .multi()
    .del(authToken)
    .srem(id as unknown as string, authToken)
    .exec()
}
