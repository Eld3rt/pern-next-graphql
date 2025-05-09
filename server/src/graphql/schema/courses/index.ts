import gql from 'graphql-tag'
import { Resolvers } from '../../types/resolvers-types'
import { getPurchasedCourseData } from '../../../prisma/functions/getPurchasedCourseData'
import { purchaseCourse } from '../../../prisma/functions/purchaseCourse'
import { getCourses } from '../../../prisma/functions/getCourses'
import { getCourseData } from '../../../prisma/functions/getCourseData'
import { getPurchasedCourses } from '../../../prisma/functions/getPurchasedCourses'
import { hasCourse } from '../../../prisma/functions/hasCourse'
import { getVideosByProjectId } from '../../../kinescope/getVideos'
import { createLesson } from '../../../prisma/functions/createLesson'
import { getProjects } from '../../../kinescope/getProjects'
import { createLessons } from '../../../prisma/functions/createLessons'
import { getTags } from '../../../prisma/functions/getTags'
import { GraphQLScalarType, Kind } from 'graphql'

export const typeDefs = gql`
  extend type Query {
    getCourses(tags: [String!], query: String, sort: SortInput, first: PositiveInt, after: Int): GetCoursesResponse!
    getTags(first: PositiveInt, after: Int): GetTagsResponse!
    getCourseData(slug: String!): Course
    getPurchasedCourses: [Course!]!
    getPurchasedCourseData(slug: String!): Course
    hasCourseAccess(slug: String!): Boolean!
    getKinescopeProjects: [KinescopeProject]!
    getKinescopeVideos(projectId: String!): [KinescopeVideo]!
  }

  extend type Mutation {
    purchaseCourse(slug: String!): PurchaseCourseResponse!
    addLesson(name: String!, videoId: String!, courseId: Int!): AddLessonResponse!
    addLessons(projectId: String!, courseId: Int!): AddLessonsResponse!
  }

  type PurchaseCourseResponse {
    success: Boolean!
    message: String!
    developerMessage: String
    course: Course
  }

  type AddLessonResponse {
    success: Boolean!
    message: String!
    developerMessage: String
    lesson: Lesson
    course: Course
  }

  type AddLessonsResponse {
    success: Boolean!
    message: String!
    developerMessage: String
    lessons: [Lesson!]
    course: Course
  }

  type GetCoursesResponse {
    edges: [CourseEdge!]!
    pageInfo: PageInfo!
  }

  type GetTagsResponse {
    edges: [TagEdge!]!
    pageInfo: PageInfo!
  }

  type CourseEdge {
    node: Course!
  }

  type TagEdge {
    node: Tag!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: Int
  }

  type Course {
    id: Int!
    name: String!
    description: String!
    imageURL: String!
    duration: Int!
    price: Float!
    reducedPrice: Float!
    level: String
    prerequisites: String
    offerMessage: String
    discountValue: Int!
    slug: String!
    tags: [Tag!]!
    topics: [Topic!]!
    lessons: [Lesson!]!
  }

  type Lesson {
    id: Int!
    name: String!
    videoId: String!
    videoDuration: Int!
  }

  type KinescopeVideo {
    id: String!
  }

  type KinescopeProject {
    id: String!
    name: String!
  }

  type Tag {
    id: Int!
    name: String!
  }

  type Topic {
    id: Int!
    name: String!
    lessons: [Lesson!]!
  }

  input SortInput {
    field: String!
    order: String!
  }
`

export const resolvers: Resolvers = {
  PositiveInt: new GraphQLScalarType({
    name: 'PositiveInt',
    description: 'An integer greater than zero',
    serialize(value: unknown): number {
      if (typeof value !== 'number' || value <= 0) {
        throw new Error('PositiveInt must be an integer greater than zero.')
      }
      return value
    },

    parseValue(value: unknown): number {
      if (typeof value !== 'number' || value <= 0) {
        throw new Error('PositiveInt must be an integer greater than zero.')
      }
      return value
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        const value = parseInt(ast.value, 10)
        if (value > 0) {
          return value
        }
      }
      throw new Error('Value must be greater than zero')
    },
  }),
  Query: {
    getCourses: async (_, args, __) => {
      const { first } = args

      const courses = await getCourses(args)

      const edges = courses.map(course => ({
        node: course,
      }))

      const hasNextPage = first ? courses.length > first : false

      if (hasNextPage) edges.pop()

      const endCursor = courses.at(-1)?.id

      return {
        edges,
        pageInfo: { hasNextPage, endCursor },
      }
    },
    getTags: async (_, args, ___) => {
      const { first } = args

      const tags = await getTags(args)

      const edges = tags.map(tag => ({
        node: tag,
      }))

      const hasNextPage = first ? tags.length > first : false
      if (hasNextPage) edges.pop()

      const endCursor = tags.at(-1)?.id

      return {
        edges,
        pageInfo: { hasNextPage, endCursor },
      }
    },
    getCourseData: async (_, args, __) => {
      const course = await getCourseData(args)

      return course
    },
    getPurchasedCourses: async (_, __, context) => {
      const { currentUser } = context

      if (!currentUser) return []

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

      if (!currentUser) return false

      const isPurchased = await hasCourse(args, currentUser)

      return isPurchased
    },
    getKinescopeProjects: async (_, __, ___) => {
      const projects = await getProjects()

      return projects
    },
    getKinescopeVideos: async (_, args, ___) => {
      const { projectId } = args
      const videos = await getVideosByProjectId(projectId)

      return videos
    },
  },
  Mutation: {
    purchaseCourse: async (_, args, context) => {
      const { currentUser } = context

      if (!currentUser)
        return {
          success: false,
          message: 'Необходимо войти в аккаунт',
          developerMessage: 'Authentication error',
        }
      try {
        const isPurchased = await hasCourse(args, currentUser)
        if (isPurchased)
          return {
            success: false,
            message: 'Вы уже успешно приобрели этот курс',
            developerMessage: 'The course has already been purchased.',
          }

        const purchasedCourse = await purchaseCourse(args, currentUser)
        return {
          success: true,
          message: 'Курс успешно приобретен',
          course: purchasedCourse,
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Ошибка при приобретении курса',
          developerMessage: error.message,
        }
      }
    },
    addLesson: async (_, args, __) => {
      try {
        const { lesson, course } = await createLesson(args)
        return {
          success: true,
          message: 'Урок успешно добавлен!',
          lesson: lesson,
          course: course,
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Ошибка при добавлении урока',
          developerMessage: error.message,
        }
      }
    },
    addLessons: async (_, args, ___) => {
      try {
        const { lessons, course } = await createLessons(args)
        return {
          success: true,
          message: 'Уроки успешно добавлены!',
          lessons: lessons,
          course: course,
        }
      } catch (error: any) {
        return {
          success: false,
          message: 'Ошибка при добавлении урока',
          developerMessage: error.message,
        }
      }
    },
  },
}
