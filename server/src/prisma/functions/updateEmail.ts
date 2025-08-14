import { User } from '@prisma/client'
import { prisma } from '../prisma.js'

export const updateEmail = async (updateObj: { email: string; id: number }): Promise<User> => {
  const { email, id } = updateObj
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email: email,
    },
  })

  return user
}
