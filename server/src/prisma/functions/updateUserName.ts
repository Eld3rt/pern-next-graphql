import { User } from '@prisma/client'
import { MutationUpdateUserNameArgs, RequireFields } from '../../graphql/types/resolvers-types.js'
import { prisma } from '../prisma.js'

export const updateUserName = async (
  args: RequireFields<MutationUpdateUserNameArgs, 'newName'>,
  currentUser: User
): Promise<User> => {
  const { newName } = args
  const { id } = currentUser

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: newName,
    },
  })

  return user
}
