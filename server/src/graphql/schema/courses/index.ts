import gql from 'graphql-tag'
import { Resolvers } from '../../types/resolvers-types'
import { getPurchasedCourseData } from '../../../prisma/functions/getPurchasedCourseData'
import { purchaseCourse } from '../../../prisma/functions/purchaseCourse'
import { getCourses } from '../../../prisma/functions/getCourses'
import { getCourseData } from '../../../prisma/functions/getCourseData'
import { getPurchasedCourses } from '../../../prisma/functions/getPurchasedCourses'
import { hasCourse } from '../../../prisma/functions/hasCourse'
import { getSearchedCourses } from '../../../prisma/functions/getSearchedCourses'
import { getVideosByProjectId } from '../../../kinescope/getVideos'
import { createLesson } from '../../../prisma/functions/createLesson'
import { getProjects } from '../../../kinescope/getProjects'
import { createLessons } from '../../../prisma/functions/createLessons'

export const typeDefs = gql`
  extend type Query {
    getCourses: [Course!]!
    getCourseData(slug: String!): Course
    getPurchasedCourses: [Course!]!
    getPurchasedCourseData(slug: String!): Course
    hasCourseAccess(slug: String!): Boolean!
    getCoursesByString(query: String!): [Course!]!
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

  type Course {
    id: Int!
    name: String!
    description: String!
    imageURL: String!
    duration: Int!
    price: Float!
    reducedPrice: Float
    discountValue: Int
    tags: [Tag!]!
    slug: String!
    lessons: [Lesson!]!
  }

  type Lesson {
    id: Int!
    name: String!
    videoId: String!
    videoDuration: Int!
    courseId: Int!
  }

  type KinescopeVideo {
    id: String!
  }

  type KinescopeProject {
    id: String!
  }

  type Tag {
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
    getCoursesByString: async (_, args, __) => {
      const courses = await getSearchedCourses(args)

      return courses
    },
    getKinescopeProjects: async (_, args, ___) => {
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
