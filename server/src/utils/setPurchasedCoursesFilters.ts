export const setPurchasedCoursesFilters = (userId: number, tags?: string[], query?: string) => {
  const where: any = {
    AND: [
      {
        courseProgress: {
          some: {
            userId: userId,
          },
        },
      },
    ],
  }

  if (tags && tags.length > 0) {
    where.AND.push({
      tags: {
        some: {
          name: {
            in: tags,
          },
        },
      },
    })
  }

  if (query) {
    where.AND.push({
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    })
  }

  return where
}
