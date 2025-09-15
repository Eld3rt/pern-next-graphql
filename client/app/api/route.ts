import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const headers = new Headers(req.headers)

  const sid = req.cookies.get('sid')?.value
  if (sid) headers.set('cookie', `sid=${sid}`)

  const upstream = await fetch(process.env.BACKEND_URL!, {
    method: 'POST',
    headers,
    body: await req.text(),
  })

  const body = await upstream.text()
  const res = new NextResponse(body, { status: upstream.status })

  const setCookie = upstream.headers.get('set-cookie')
  if (setCookie?.includes('sid=')) {
    const match = /sid=([^;]+)/.exec(setCookie)
    if (match) {
      res.cookies.set('sid', match[1], {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 * 1000, // One week
      })
    }
  }
  return res
}
