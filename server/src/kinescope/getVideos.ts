import axios from 'axios'

const KINESCOPE_API_KEY = process.env.KINESCOPE_API_KEY

type LessonVideo = {
  id: string
  embed_link: string
  duration: number
}

export const getVideosByProjectId = async (projectId: string): Promise<LessonVideo[]> => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.kinescope.io/v1/videos?&per_page=1000&project_id=${projectId}`,
      headers: { Authorization: `Bearer ${KINESCOPE_API_KEY}` },
    })
    return response.data.data
  } catch (error: any) {
    throw Error(error.message)
  }
}
