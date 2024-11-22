import { HttpLink } from '@apollo/client'
import { InMemoryCache, ApolloClient } from '@apollo/experimental-nextjs-app-support'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'
import { cookies } from 'next/headers'

export const { getClient, query } = registerApolloClient(async () => {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('sid')?.value

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3000/graphql',
      headers: { Cookie: `${authToken ? `sid=${authToken}` : ''}` },
    }),
  })
})
