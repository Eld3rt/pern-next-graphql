import { User, Prisma } from '@prisma/client'
import { prisma } from '../prisma'
import { QueryGetPurchasedCoursesArgs } from '../../graphql/types/resolvers-types'
import { setPurchasedCoursesFilters } from '../../utils/setPurchasedCoursesFilters'

const CourseProgress = Prisma.validator()({
  include: {
    course: {
      include: {
        tags: true,
        topics: {
          include: {
            lessons: {
              include: {
                lessonProgress: true,
              },
            },
          },
        },
        courseProgress: {
          include: {
            lessonProgress: {
              include: {
                lesson: true,
              },
            },
          },
        },
      },
    },
  },
})

type CourseProgress = Prisma.CourseProgressGetPayload<typeof CourseProgress>

export const getPurchasedCourses = async (
  currentUser: User,
  args: Partial<QueryGetPurchasedCoursesArgs>
): Promise<CourseProgress[]> => {
  const userId = currentUser.id
  const { tags, query, sort, first, after } = args

  const orderBy: any = sort
    ? sort.field === 'progress'
      ? [{ lessonProgress: { _count: sort.order as 'asc' | 'desc' } }, { id: 'asc' }]
      : sort.field === 'duration'
      ? [{ course: { duration: sort.order as 'asc' | 'desc' } }, { id: 'asc' }]
      : sort.field === 'purchasedAt'
      ? { createdAt: sort.order as 'asc' | 'desc' }
      : [{ [sort.field]: sort.order as 'asc' | 'desc' }, { id: 'asc' }]
    : { createdAt: 'desc' }

  const where = setPurchasedCoursesFilters(userId, tags, query)

  const take = first && first + 1
  const cursor = after
    ? {
        id: after,
      }
    : undefined

  const courseProgresses = await prisma.courseProgress.findMany({
    where,
    orderBy,
    take,
    cursor,
    include: {
      course: {
        include: {
          tags: true,
          topics: {
            include: {
              lessons: {
                include: {
                  lessonProgress: true,
                },
              },
            },
          },
          courseProgress: {
            include: {
              lessonProgress: {
                include: {
                  lesson: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return courseProgresses
}
