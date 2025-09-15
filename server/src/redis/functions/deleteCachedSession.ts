import { redis } from '../redis.js'

export const deleteCachedSession = async (authToken: string) => {
  await redis.multi().del(authToken).exec()
}
