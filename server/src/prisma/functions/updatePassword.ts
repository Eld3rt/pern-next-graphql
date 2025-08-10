import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { prisma } from '../prisma.js'

export const updatePassword = async (newPassword: string, userId: number): Promise<User> => {
  const newPasshash = await hash(newPassword, 7)

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      passhash: newPasshash,
    },
  })

  return user
}
