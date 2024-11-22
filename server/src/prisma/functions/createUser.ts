import { User } from '@prisma/client'
import { prisma } from '../prisma'

export const createUser = async (cachedUser: { name?: string; email: string; passhash: string }): Promise<User> => {
  const { name, email, passhash } = cachedUser

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passhash,
    },
  })

  return user
}
