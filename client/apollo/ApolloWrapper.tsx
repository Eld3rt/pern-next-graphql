'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import {
  ApolloNextAppProvider,
  InMemoryCache,
  ApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support'

interface Props {
  children: React.ReactNode
  authToken?: string | undefined
}

function makeClient(authToken: string | undefined) {
  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
    fetchOptions: { cache: 'no-store' },
    credentials: 'include',
  })

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
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            new HttpLink({
              uri: 'http://localhost:3000/graphql',
              credentials: 'include',
              headers: { Cookie: `${authToken ? `sid=${authToken}` : ''}` },
            }),
          ])
        : httpLink,
  })
}

export const ApolloWrapper: React.FC<Props> = ({ children, authToken }) => {
  return <ApolloNextAppProvider makeClient={() => makeClient(authToken)}>{children}</ApolloNextAppProvider>
}
