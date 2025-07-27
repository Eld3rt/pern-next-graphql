import { getVideosByProjectId } from './getVideos'

export const getEmbedLinks = async (projectId: string): Promise<string[]> => {
  const videoData = await getVideosByProjectId(projectId)
  const embedLinks = videoData.map(video => video.embed_link)
  return embedLinks
}
