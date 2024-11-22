import { NextRequest, NextResponse } from 'next/server'
import { ConfirmAccountQuery, ConfirmAccountDocument } from '@/graphql/generated'
import { getClient } from '@/apollo/ApolloClient'

export const GET = async (req: NextRequest) => {
  const key = req.nextUrl.searchParams.get('key')

  const { data } = await getClient().query<ConfirmAccountQuery>({
    query: ConfirmAccountDocument,
    variables: { key },
  })

  const path = data.confirmAccount?.path

  return NextResponse.redirect(`${path ? `http://localhost:4000/${path}` : 'http://localhost:4000'}`)
}
