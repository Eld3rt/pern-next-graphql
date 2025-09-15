import { HttpLink } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { InMemoryCache, ApolloClient } from '@apollo/experimental-nextjs-app-support'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'
import { cookies } from 'next/headers'

export const { getClient, query } = registerApolloClient(async () => {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('sid')?.value

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getCourses: relayStylePagination(['tags', 'query', 'sort']),
            getPurchasedCourses: relayStylePagination(['tags', 'query', 'sort']),
            getTags: relayStylePagination(),
          },
        },
      },
    }),
    link: new HttpLink({
      uri: `${process.env.BASE_URL}/api`,
      credentials: 'include',
      headers: { Cookie: `${authToken ? `sid=${authToken}` : ''}` },
    }),
  })
})
