import { NextRequest, NextResponse } from 'next/server'
import { ConfirmEmailQuery, ConfirmEmailDocument } from '@/graphql/generated'
import { query } from '@/apollo/ApolloClient'

export const GET = async (req: NextRequest) => {
  try {
    const key = req.nextUrl.searchParams.get('key')

    const { data } = await query<ConfirmEmailQuery>({
      query: ConfirmEmailDocument,
      variables: { key },
    })

    if (!data?.confirmEmail) {
      throw new Error('Возникла проблема при изменении email. Пожалуйста, попробуйте снова.')
    }

    if (data.confirmEmail.success) {
      return NextResponse.redirect(`${process.env.BASE_URL}/user/settings`)
    } else {
      return NextResponse.json(data.confirmEmail.message)
    }
  } catch (err: any) {
    return NextResponse.json(err.message)
  }
}
