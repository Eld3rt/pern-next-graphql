export const setPurchasedCoursesFilters = (userId: number, tags?: string[], query?: string) => {
  const where: any = {
    AND: [
      {
        userId: userId,
      },
    ],
  }

  if (tags && tags.length > 0) {
    where.AND.push({
      course: {
        tags: {
          some: {
            name: {
              in: tags,
            },
          },
        },
      },
    })
  }

  if (query) {
    where.AND.push({
      course: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    })
  }

  return where
}
