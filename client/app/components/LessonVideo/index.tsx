interface Props {
  videoURL?: string
}

const LessonVideo: React.FC<Props> = ({ videoURL }) => {
  return (
    <iframe
      src={videoURL}
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
      allowFullScreen
      className="lesson-video__iframe lg:p-[3rem] mx-auto w-full h-[300px] 2xl:w-[75%] lg:h-[550px]"
    ></iframe>
  )
}

export default LessonVideo
