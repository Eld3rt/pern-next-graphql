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

  if (!authToken && !isOnLoginPath && !isOnRegisterPath) {
    return NextResponse.redirect(new URL('/login', request.url))
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
  matcher: ['/((?!api|_next/static|_next/image|reset|favicon.ico|robots.txt|courses|user/confirm|$).*)'],
}
