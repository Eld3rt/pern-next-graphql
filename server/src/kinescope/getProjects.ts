import axios from 'axios'

const KINESCOPE_API_KEY = process.env.KINESCOPE_API_KEY

type Project = {
  id: string
}

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.kinescope.io/v1/projects?&per_page=1000`,
      headers: { Authorization: `Bearer ${KINESCOPE_API_KEY}` },
    })
    return response.data.data
  } catch (error: any) {
    throw Error(error.message)
  }
}
