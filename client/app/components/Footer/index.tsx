import Link from 'next/link'

type Props = {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className="col-span-1 md:col-span-5 p-4 md:p-8 border-t mt-auto mb-[2rem] md:mb-[3rem] pt-[2rem] md:pt-[3rem]">
      <div className="footer__inner custom-container custom-container--wide grid justify-center items-center sm:flex sm:justify-between">
        <h3 className="footer-company mb-[1.5rem] text-center text-lg md:text-xl lg:text-2xl">
          Удобная платформа для обучения
        </h3>
        <nav className="footer__nav sm:flex sm:w-[50%] sm:gap-x-[3rem] sm:justify-center">
          <ul className="footer__nav-list text-center grid place-items-center gap-y-[1rem]">
            <li className="footer__nav-item">
              <h4 className="footer__nav-item-title text-base md:text-lg lg:text-xl">Навигация</h4>
            </li>
            <li className="footer__nav-item">
              <Link href="/courses" className="footer__nav-item-link hover:text-gray-600">
                Курсы
              </Link>
            </li>
            <li className="footer__nav-item">
              <Link href="/user/dashboard" className="footer__nav-item-link hover:text-gray-600">
                Личный кабинет
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
