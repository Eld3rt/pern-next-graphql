import express, { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { server } from './src/apollo/server'
import { prisma } from './src/prisma/prisma'
import { expressMiddleware } from '@apollo/server/express4'
import { getCachedSession } from './src/redis/functions/getCachedSession'

const PORT = process.env.PORT || 5050
const app = express()

const corsOptions = {
  origin: process.env.BASE_URL,
  credentials: true,
}

app.use(cookieParser())

await server.start()

app.use(
  '/graphql',
  cors(corsOptions),
  json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const authToken: string = req.cookies.sid || ''

      let currentUser = null
      if (authToken) {
        const userId = await getCachedSession(authToken)

        if (userId) {
          currentUser = await prisma.user.findFirst({
            where: { id: userId },
          })
        }
      }
      return { currentUser, res, authToken }
    },
  })
)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
