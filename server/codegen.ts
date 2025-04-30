import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/graphql/schema/*/index.ts',
  generates: {
    './src/graphql/types/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        inputMaybeValue: 'undefined | T',
        emitLegacyCommonJSImports: false,
        contextType: '../../apollo/server#MyContext',
        mappers: {
          User: '.prisma/client#User as UserModel',
          Course: '.prisma/client#Course as CourseModel',
          Lesson: '.prisma/client#Lesson as LessonModel',
        },
        scalars: {
          PositiveInt: 'number',
        },
      },
    },
  },
}
export default config
