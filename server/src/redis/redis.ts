import { Redis } from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: (process.env.REDIS_PORT as unknown as number) || 5012,
})

export { redis }
