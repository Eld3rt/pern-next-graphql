import HomeSearch from '../HomeSearch'

type Props = {}

const HomeIntro: React.FC<Props> = () => {
  return (
    <section className="home-intro pt-16">
      <div className="home-intro__inner custom-container grid justify-items-center gap-y-8 lg:gap-y-14">
        <div className="home-intro__text grid justify-items-center max-w-3xl">
          <h3 className="home-intro__subtitle text-center text-base mb-2 md:text-xl border-2 rounded-full py-1 px-3">
            Время познавать что-то новое!
          </h3>
          <h1 className="home-intro__title text-center text-4xl md:text-5xl lg:text-6xl">
            Обучающие курсы, которые сделают процесс получения знаний приятным
          </h1>
          <p className="home-intro__description text-center text-base">
            Подбери подходящий для себя курс и получи уникальный обучающий контент. Все курсы доступны внутри удобного
            личного пространства нашей платформы!
          </p>
        </div>
        <div className="home-intro__search w-full flex justify-center">
          <HomeSearch />
        </div>
      </div>
    </section>
  )
}

export default HomeIntro
