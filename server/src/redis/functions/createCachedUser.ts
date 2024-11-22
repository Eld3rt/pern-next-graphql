import { hash } from 'bcrypt'
import { redis } from '../redis'

export const createCachedUser = async (
  args: { name?: string; email: string; password: string; path?: string },
  key: string
) => {
  const { name, email, password, path } = args

  const passhash = await hash(password, 7)

  const userObj = {
    name: name,
    email: email,
    passhash,
    path: path,
  }

  await redis
    .multi()
    .hmset(key, userObj)
    .expire(key, 60 * 60 * 24 * 7) // One week
    .exec()
}
