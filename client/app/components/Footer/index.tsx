import Link from 'next/link'

type Props = {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className="border-t mt-16 mb-[3rem] pt-[3rem]">
      <div className="footer__inner custom-container custom-container--wide grid justify-center items-center sm:flex sm:justify-between">
        <h3 className="footer-company mb-[1.5rem] text-xl md:text-2xl">Удобная платформа для обучения</h3>
        <nav className="footer__nav sm:flex sm:w-[50%] sm:gap-x-[3rem] sm:justify-center">
          <ul className="footer__nav-list text-center grid place-items-center gap-y-[1rem]">
            <li className="footer__nav-item">
              <h4 className="footer__nav-item-title text-lg md:text-xl">Навигация</h4>
            </li>
            <li className="footer__nav-item">
              <Link href="/courses" className="footer__nav-item-link">
                Курсы
              </Link>
            </li>
            <li className="footer__nav-item">
              <Link href="/user/dashboard" className="footer__nav-item-link">
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
