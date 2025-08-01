import Catalog from '@/app/components/Catalog'

interface Props {}

const Page: React.FC<Props> = () => {
  return (
    <main className="catalog flex-1 col-span-1 md:col-span-5 mb-8 md:mb-16 pt-10">
      <section className="catalog__head">
        <div className="course-catalog__inner custom-container custom-container--wide">
          <h1 className="catalog__title text-2xl text-center md:text-3xl md:text-left font-bold">Каталог курсов</h1>
        </div>
      </section>
      <Catalog />
    </main>
  )
}

export default Page
