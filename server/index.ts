import express, { json } from 'express'
import cors from 'cors'
import { server } from './src/apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

const PORT = process.env.PORT || 5050
const app = express()

const corsOptions = {
  origin: process.env.BASE_URL,
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

await server.start()

app.use('/graphql', cors(corsOptions), json(), expressMiddleware(server))

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
