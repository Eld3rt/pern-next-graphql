'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import {
  ApolloNextAppProvider,
  InMemoryCache,
  ApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support'

function makeClient() {
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
            httpLink,
          ])
        : httpLink,
    credentials: 'include',
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
