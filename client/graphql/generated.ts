import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ConfirmAccountResponse = {
  __typename?: 'ConfirmAccountResponse';
  path?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signUp?: Maybe<SignUpResponse>;
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  confirmAccount?: Maybe<ConfirmAccountResponse>;
};


export type QueryConfirmAccountArgs = {
  key: Scalars['String']['input'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  message: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type ConfirmAccountQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type ConfirmAccountQuery = { __typename?: 'Query', confirmAccount?: { __typename?: 'ConfirmAccountResponse', path?: string | null, user?: { __typename?: 'User', email: string } | null } | null };


export const ConfirmAccountDocument = gql`
    query ConfirmAccount($key: String!) {
  confirmAccount(key: $key) {
    user {
      email
    }
    path
  }
}
    `;

/**
 * __useConfirmAccountQuery__
 *
 * To run a query within a React component, call `useConfirmAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useConfirmAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConfirmAccountQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useConfirmAccountQuery(baseOptions: Apollo.QueryHookOptions<ConfirmAccountQuery, ConfirmAccountQueryVariables> & ({ variables: ConfirmAccountQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConfirmAccountQuery, ConfirmAccountQueryVariables>(ConfirmAccountDocument, options);
      }
export function useConfirmAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConfirmAccountQuery, ConfirmAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConfirmAccountQuery, ConfirmAccountQueryVariables>(ConfirmAccountDocument, options);
        }
export function useConfirmAccountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ConfirmAccountQuery, ConfirmAccountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ConfirmAccountQuery, ConfirmAccountQueryVariables>(ConfirmAccountDocument, options);
        }
export type ConfirmAccountQueryHookResult = ReturnType<typeof useConfirmAccountQuery>;
export type ConfirmAccountLazyQueryHookResult = ReturnType<typeof useConfirmAccountLazyQuery>;
export type ConfirmAccountSuspenseQueryHookResult = ReturnType<typeof useConfirmAccountSuspenseQuery>;
export type ConfirmAccountQueryResult = Apollo.QueryResult<ConfirmAccountQuery, ConfirmAccountQueryVariables>;