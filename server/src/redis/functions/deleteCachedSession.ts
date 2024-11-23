import { redis } from '../redis'

export const deleteCachedSession = async (id: number, authToken: string) => {
  await redis
    .multi()
    .del(authToken)
    .srem(id as unknown as string, authToken)
    .exec()
}
