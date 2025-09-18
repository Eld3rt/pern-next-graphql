import type { Metadata } from 'next'
import type { Viewport } from 'next'
import { ApolloWrapper } from '../../apollo/ApolloWrapper'
import '../globals.css'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'PERN | Next | GraphQL',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
      <body className="bg-gradient-to-br from-[#fbfaf8] to-[#f8efdd]">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  )
}

export default RootLayout
