'use client'

import { useEffect, useRef, useState } from 'react'
import * as iframeApiLoader from '@kinescope/player-iframe-api-loader'
import { useMarkLessonCompleteMutation } from '@/graphql/generated'
import LessonVideoSkeleton from './LessonVideoSkeleton'

interface Props {
  videoURL: string
  lessonId: number
  courseSlug: string
  isComplete: boolean
}

const LessonVideo: React.FC<Props> = ({ videoURL, lessonId, courseSlug, isComplete }) => {
  const playerRef = useRef<Kinescope.IframePlayer.Player | null>(null)
  const [isPlayerReady, setIsPlayerReady] = useState(false)

  const [markComplete] = useMarkLessonCompleteMutation({
    variables: {
      lessonId,
      courseSlug,
    },
  })
  useEffect(() => {
    let active = true

    iframeApiLoader.load().then(factory => {
      if (!active) return
      factory
        .create('lesson-video-iframe', { url: videoURL })
        .then(player => {
          setIsPlayerReady(true)
          if (!active) {
            player.destroy()
            return
          }
          player.on(player.Events.Playing, () => {
            if (!isComplete) {
              markComplete()
            }
          })
          playerRef.current = player
        })
        .catch(console.error)
    })

    return () => {
      active = false
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [videoURL])

  return (
    <div id="lesson-video-container">
      {!isPlayerReady && <LessonVideoSkeleton />}
      <iframe
        id="lesson-video-iframe"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
        allowFullScreen
        className="lesson-video__iframe lg:p-[3rem] mx-auto w-full h-[300px] 2xl:w-[75%] lg:h-[550px]"
      ></iframe>
    </div>
  )
}

export default LessonVideo
