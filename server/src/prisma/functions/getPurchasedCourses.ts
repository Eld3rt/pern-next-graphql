import { User, Course } from '@prisma/client'
import { prisma } from '../prisma'
import { QueryGetPurchasedCoursesArgs } from '../../graphql/types/resolvers-types'
import { setPurchasedCoursesFilters } from '../../utils/setPurchasedCoursesFilters'

export const getPurchasedCourses = async (
  currentUser: User,
  args: Partial<QueryGetPurchasedCoursesArgs>
): Promise<Course[]> => {
  const userId = currentUser.id
  const { tags, query, sort, first, after } = args

  const orderBy: any =
    sort && !(sort.field === 'progress') ? [{ [sort.field]: sort.order as 'asc' | 'desc' }, { id: 'asc' }] : undefined

  const where = setPurchasedCoursesFilters(userId, tags, query)

  const take = first && first + 1
  const cursor = after
    ? {
        id: after,
      }
    : undefined

  const purchasedCourses = await prisma.course.findMany({
    where,
    orderBy,
    take,
    cursor,
    include: {
      tags: true,
      topics: {
        include: {
          lessons: true,
        },
      },
      courseProgress: {
        where: {
          userId: userId,
        },
        include: {
          lessonProgress: {
            include: {
              lesson: true,
            },
          },
        },
      },
    },
  })

  const sortByProgressDesc = (courses: typeof purchasedCourses) =>
    courses.sort((a, b) => b.courseProgress[0].lessonProgress.length - a.courseProgress[0].lessonProgress.length)

  const sortByProgressAsc = (courses: typeof purchasedCourses) =>
    courses.sort((a, b) => a.courseProgress[0].lessonProgress.length - b.courseProgress[0].lessonProgress.length)

  const sortByDate = (courses: typeof purchasedCourses) =>
    courses.sort((a, b) => b.courseProgress[0].createdAt.getTime() - a.courseProgress[0].createdAt.getTime())

  if (sort?.field === 'progress' && sort?.order === 'desc') {
    sortByProgressDesc(purchasedCourses)
  } else if (sort?.field === 'progress' && sort?.order === 'asc') {
    sortByProgressAsc(purchasedCourses)
  } else if (!sort) {
    sortByDate(purchasedCourses)
  }

  return purchasedCourses
}
