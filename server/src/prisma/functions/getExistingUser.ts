import { User } from '@prisma/client'
import { prisma } from '../prisma.js'

export const getExistingUser = async (args: { email: string }): Promise<User | null> => {
  const { email } = args
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  })

  return existingUser
}
