import gql from 'graphql-tag'
import { Resolvers } from '../../types/resolvers-types'
import { getPurchasedCourse } from '../../../prisma/functions/getPurchasedCourse'
import { purchaseCourse } from '../../../prisma/functions/purchaseCourse'
import { getCourses } from '../../../prisma/functions/getCourses'
import { getCourseData } from '../../../prisma/functions/getCourseData'
import { getPurchasedCourses } from '../../../prisma/functions/getPurchasedCourses'

export const typeDefs = gql`
  extend type Query {
    getCourses: [Course!]!
    getCourseData(slug: String!): Course
    getPurchasedCourses: [Course!]
  }

  extend type Mutation {
    purchaseCourse(courseId: Int!): PurchaseCourseResponse
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
  },
  Mutation: {
    purchaseCourse: async (_, args, context) => {
      const { currentUser } = context

      if (!currentUser) return null

      const existingPurchasedCourse = await getPurchasedCourse(args, currentUser)
      if (existingPurchasedCourse) throw new Error('Вы уже успешно приобрели этот курс')

      await purchaseCourse(args, currentUser)

      return {
        message: 'Курс успешно приобретен!',
      }
    },
  },
}
