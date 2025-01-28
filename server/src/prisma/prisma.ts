import { Prisma, PrismaClient } from '@prisma/client'
import axios from 'axios'

const KINESCOPE_API_KEY = process.env.KINESCOPE_API_KEY

const getVideoDuration = async (videoId: string | Prisma.StringFieldUpdateOperationsInput): Promise<number> => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.kinescope.io/v1/videos/${videoId}`,
      headers: { Authorization: `Bearer ${KINESCOPE_API_KEY}` },
    })
    return response.data.duration
  } catch (error) {
    console.error('Error fetching video duration:', error)
    return 0
  }
}

const prisma = new PrismaClient().$extends({
  model: {
    $allModels: {
      async exists<T>(this: T, where: Prisma.Args<T, 'findFirst'>['where']): Promise<boolean> {
        const context = Prisma.getExtensionContext(this)

        const result = await (context as any).findFirst({ where })
        return result !== null
      },
    },
  },
  query: {
    lesson: {
      async create({ args, query }) {
        if (args.data.videoId) {
          args.data.videoDuration = await getVideoDuration(args.data.videoId)
        }
        return query(args)
      },
      async update({ args, query }) {
        if (args.data.videoId) {
          args.data.videoDuration = await getVideoDuration(args.data.videoId)
        }
        return query(args)
      },
    },
  },
})

export { prisma }
