import { Tag } from '@prisma/client'
import { prisma } from '../prisma'
import { QueryGetTagsArgs } from '../../graphql/types/resolvers-types'

export const getTags = async (args: Partial<QueryGetTagsArgs>): Promise<Tag[]> => {
  const { first, after } = args

  const take = first && first + 1
  const cursor = after
    ? {
        id: after,
      }
    : undefined

  const tags = await prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    },
    take,
    cursor,
  })

  return tags
}
