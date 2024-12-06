import gql from 'graphql-tag'
import { Resolvers } from '../../types/resolvers-types'
import { getPurchasedCourseData } from '../../../prisma/functions/getPurchasedCourseData'
import { purchaseCourse } from '../../../prisma/functions/purchaseCourse'
import { getCourses } from '../../../prisma/functions/getCourses'
import { getCourseData } from '../../../prisma/functions/getCourseData'
import { getPurchasedCourses } from '../../../prisma/functions/getPurchasedCourses'
import { hasCourse } from '../../../prisma/functions/hasCourse'

export const typeDefs = gql`
  extend type Query {
    getCourses: [Course!]!
    getCourseData(slug: String!): Course
    getPurchasedCourses: [Course!]
    getPurchasedCourseData(slug: String!): Course
    hasCourseAccess(slug: String!): Boolean
  }

  extend type Mutation {
    purchaseCourse(slug: String!): PurchaseCourseResponse
  }

  type PurchaseCourseResponse {
    message: String!
  }

  type Course {
    id: Int!
    name: String!
    slug: String
    lessons: [Lesson!]
  }

  type Lesson {
    id: Int!
    name: String!
    videoURL: String!
  }
`

export const resolvers: Resolvers = {
  Query: {
    getCourses: async (_, __, ___) => {
      const courses = await getCourses()

      return courses
    },
    getCourseData: async (_, args, __) => {
      const course = await getCourseData(args)

      return course
    },
    getPurchasedCourses: async (_, __, context) => {
      const { currentUser } = context

      if (!currentUser) return null

      const purchasedCourses = await getPurchasedCourses(currentUser)

      return purchasedCourses
    },
    getPurchasedCourseData: async (_, args, context) => {
      const { currentUser } = context

      if (!currentUser) return null

      const purchasedCourse = await getPurchasedCourseData(args, currentUser)

      return purchasedCourse
    },
    hasCourseAccess: async (_, args, context) => {
      const { currentUser } = context

      if (!currentUser) return null

      const isPurchased = await hasCourse(args, currentUser)

      return isPurchased
    },
  },
  Mutation: {
    purchaseCourse: async (_, args, context) => {
      const { currentUser } = context

      if (!currentUser) return null

      const isPurchased = await hasCourse(args, currentUser)
      if (isPurchased) throw new Error('Вы уже успешно приобрели этот курс')

      await purchaseCourse(args, currentUser)

      return {
        message: 'Курс успешно приобретен!',
      }
    },
  },
}
