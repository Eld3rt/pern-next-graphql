import { HttpLink } from '@apollo/client'
import { InMemoryCache, ApolloClient } from '@apollo/experimental-nextjs-app-support'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3000/graphql',
    }),
  })
})
