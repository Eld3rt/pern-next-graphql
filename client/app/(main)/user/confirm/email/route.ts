import { NextRequest, NextResponse } from 'next/server'
import { ConfirmEmailQuery, ConfirmEmailDocument } from '@/graphql/generated'
import { query } from '@/apollo/ApolloClient'

export const GET = async (req: NextRequest) => {
  const key = req.nextUrl.searchParams.get('key')

  await query<ConfirmEmailQuery>({
    query: ConfirmEmailDocument,
    variables: { key },
  })

  return NextResponse.redirect('http://localhost:4000/user/settings')
}
