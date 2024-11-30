import type { Metadata } from 'next'
import { ApolloWrapper } from '../../apollo/ApolloWrapper'
import '../globals.css'
import SessionProvider from '../providers/SessionProvider'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'PERN | Next | GraphQL',
}

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = async ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <SessionProvider>
            <Header />
            {children}
          </SessionProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}

export default RootLayout
