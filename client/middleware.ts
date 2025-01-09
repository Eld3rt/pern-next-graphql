import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export const middleware = async (request: NextRequest) => {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('sid')?.value
  const pathname = request.nextUrl.pathname
  const isOnUserPath = pathname.endsWith('/user')
  const isOnLoginPath = pathname.endsWith('/login')
  const isOnRegisterPath = pathname.endsWith('/register')
  const isOnCoursePath = (pathname: string) => {
    const coursePagePattern = /^\/user\/courses\/[a-z0-9]+(?:-[a-z0-9]+)*$/
    return coursePagePattern.test(pathname)
  }
  const isOnResetPath = pathname.startsWith('/user/confirm/reset')

  if (!authToken && !isOnLoginPath && !isOnRegisterPath && !isOnResetPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isOnResetPath) {
    const key = request.nextUrl.searchParams.get('key')
    console.log(key)
    const res = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        Cookie: `${`sid=${authToken}`}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'query HasCachedKey($key: String!) { hasCachedKey(key: $key) }',
        variables: { key: key },
      }),
    })

    const {
      data: { hasCachedKey },
    } = await res.json()

    console.log(hasCachedKey)

    if (hasCachedKey) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/404', request.url))
  }

  const res = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      Cookie: `${`sid=${authToken}`}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: 'query Me { me { id }}',
    }),
  })

  const {
    data: { me },
  } = await res.json()

  const isLoggedIn = !!me

  if (isLoggedIn) {
    if (isOnUserPath || isOnLoginPath || isOnRegisterPath) {
      return NextResponse.redirect(new URL('/user/dashboard', request.url))
    }

    if (isOnCoursePath(pathname)) {
      const courseSlug = pathname.split('/')[3]

      const res = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          Cookie: `${`sid=${authToken}`}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'query HasCourseAccess($slug: String!) { hasCourseAccess(slug: $slug) }',
          variables: { slug: courseSlug },
        }),
      })

      const {
        data: { hasCourseAccess },
      } = await res.json()

      if (hasCourseAccess) {
        return NextResponse.next()
      }

      return NextResponse.redirect(new URL(`/courses/${courseSlug}`, request.url))
    }
    return NextResponse.next()
  }
  if (isOnLoginPath || isOnRegisterPath) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: [
    '/user',
    '/user/confirm/reset',
    '/user/courses/:path*',
    '/user/dashboard',
    '/user/settings/:path*',
    '/login',
    '/register',
  ],
}
