import type { Metadata } from 'next'
import { ApolloWrapper } from '@/apollo/ApolloWrapper'
import '../../globals.css'
import localFont from 'next/font/local'
import { cookies } from 'next/headers'
import SessionProvider from '@/app/providers/SessionProvider'
import UserSidebar from '@/app/components/UserSidebar'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'PERN | Next | GraphQL',
}

const inter = localFont({
  display: 'swap',
  style: 'normal',
  weight: 'normal',
  src: '../../../fonts/Inter-Medium.woff',
  variable: '--font-inter',
})

const lorenzo = localFont({
  display: 'swap',
  style: 'normal',
  weight: 'normal',
  src: '../../../fonts/Lorenzo-Sans-Medium.woff',
  variable: '--font-lorenzo',
})

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = async ({ children }) => {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('sid')?.value

  return (
    <html lang="en" className={`${inter.variable} ${lorenzo.variable}`}>
      <body className="grid grid-cols-1 lg:grid-cols-[minmax(0px,_300px)_1fr_1fr_1fr_1fr_1fr]">
        <ApolloWrapper authToken={authToken}>
          <SessionProvider>
            <UserSidebar />
            {children}
            <Footer />
          </SessionProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}

export default RootLayout
