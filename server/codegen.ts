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
        mappers: {},
      },
    },
  },
}
export default config
