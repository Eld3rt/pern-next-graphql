import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ApolloWrapper } from '../../apollo/ApolloWrapper'
import '../globals.css'
import SessionProvider from '../providers/SessionProvider'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'PERN | Next | GraphQL',
}

const inter = localFont({
  display: 'swap',
  style: 'normal',
  weight: 'normal',
  src: '../../fonts/Inter-Medium.woff',
  variable: '--font-inter',
})

const lorenzo = localFont({
  display: 'swap',
  style: 'normal',
  weight: 'normal',
  src: '../../fonts/Lorenzo-Sans-Medium.woff',
  variable: '--font-lorenzo',
})

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = async ({ children }) => {
  return (
    <html lang="en" className={`${inter.variable} ${lorenzo.variable}`}>
      <body>
        <ApolloWrapper>
          <SessionProvider>
            <Header />
            {children}
            <Footer />
          </SessionProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}

export default RootLayout
