import axios from 'axios'

const KINESCOPE_API_KEY = process.env.KINESCOPE_API_KEY

type LessonVideo = {
  duration: number
}

export const getVideo = async (videoId: string): Promise<LessonVideo> => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.kinescope.io/v1/videos/${videoId}`,
      headers: { Authorization: `Bearer ${KINESCOPE_API_KEY}` },
    })
    return response.data.data
  } catch (error: any) {
    throw Error(error.message)
  }
}
