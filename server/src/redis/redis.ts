import { Redis } from 'ioredis'

const redis = new Redis(
  'redis://default:zPyvHcpQvpCSTKgkz8Y1xLHrWnkeP6QO@redis-18337.c53.west-us.azure.redns.redis-cloud.com:18337'
)

export { redis }
