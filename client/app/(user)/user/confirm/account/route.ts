import { NextRequest, NextResponse } from 'next/server'
import { ConfirmAccountQuery, ConfirmAccountDocument } from '@/graphql/generated'
import { query } from '@/apollo/ApolloClient'
import { cookies } from 'next/headers'

export const GET = async (req: NextRequest) => {
  try {
    const key = req.nextUrl.searchParams.get('key')

    const { data } = await query<ConfirmAccountQuery>({
      query: ConfirmAccountDocument,
      variables: { key },
    })

    if (!data?.confirmAccount) {
      throw new Error('Возникла проблема при подтверждении email. Пожалуйста, попробуйте снова.')
    }

    if (data.confirmAccount.success && data.confirmAccount.sessionToken) {
      const authToken = data.confirmAccount.sessionToken
      const cookieStore = await cookies()

      cookieStore.set('sid', authToken, {
        maxAge: 60 * 60 * 24 * 7, // One week
      })
    } else {
      return NextResponse.json(data.confirmAccount.message)
    }

    const path = data.confirmAccount.path
    return NextResponse.redirect(path ? `http://localhost:4000/courses/${path}` : 'http://localhost:4000')
  } catch (err: any) {
    return NextResponse.json(err.message)
  }
}
