'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SignOutButton from '../buttons/SignOutButton'

type Props = {}

const UserSidebar: React.FC<Props> = () => {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <aside className="user-sidebar fixed bottom-0 left-0 right-0 lg:max-w-[300px] lg:relative lg:col-span-1 lg:row-span-2 bg-[#81123d] text-[lightgoldenrodyellow]">
      <div className="user-sidebar__inner grid grid-cols-5 py-3 lg:flex lg:flex-col lg:min-h-screen lg:py-10">
        <Link
          href="/"
          className="user-sidebar__logo block col-span-1 hover:text-[gold] text-xs text-center font-bold sm:text-base lg:text-xl lg:text-left lg:mx-10 lg:block"
        >
          Главная
        </Link>

        <nav className="user-sidebar__nav col-span-3 lg:mt-16">
          <ul className="user-sidebar__nav-list flex justify-around text-xs sm:text-base lg:flex-col lg:gap-y-6 lg:mb-10">
            <li
              className={`user-sidebar__nav-list__item flex-1 lg:flex lg:py-2${
                isActive('/user/dashboard')
                  ? ' lg:relative lg:before:content-[ ] lg:before:border-l-4 lg:before:border-[gold] lg:before:my-[-0.5rem] lg:after:content-[ ] lg:after:absolute lg:after:inset-0 lg:after:bg-gradient-to-r lg:after:from-[gold]/30 lg:after:to-transparent text-[gold]'
                  : ''
              }`}
            >
              <Link
                href={'/user/dashboard'}
                className={`user-sidebar__link flex flex-col items-center justify-center h-full lg:px-10 dashboard-icon-desktop ${
                  isActive('/user/dashboard') ? 'lg:mx-[calc(2.5rem-4px)]' : 'lg:mx-10 hover:text-[gold]'
                }`}
              >
                Дашборд
              </Link>
            </li>
            <li
              className={`user-sidebar__nav-list__item flex-1 lg:flex lg:py-2${
                isActive('/user/courses')
                  ? ' lg:relative lg:before:content-[ ] lg:before:border-l-4 lg:before:border-[gold] lg:before:my-[-0.5rem] lg:after:content-[ ] lg:after:absolute lg:after:inset-0 lg:after:bg-gradient-to-r lg:after:from-[gold]/30 lg:after:to-transparent text-[gold]'
                  : ''
              }`}
            >
              <Link
                href={'/user/courses'}
                className={`user-sidebar__link flex flex-col items-center justify-center h-full lg:px-10 courses-icon-desktop ${
                  isActive('/user/courses') ? 'lg:mx-[calc(2.5rem-4px)]' : 'lg:mx-10 hover:text-[gold]'
                }`}
              >
                Курсы
              </Link>
            </li>
            <li
              className={`user-sidebar__nav-list__item flex-1 lg:flex lg:py-2${
                isActive('/user/settings')
                  ? ' lg:relative lg:before:content-[ ] lg:before:border-l-4 lg:before:border-[gold] lg:before:my-[-0.5rem] lg:after:content-[ ] lg:after:absolute lg:after:inset-0 lg:after:bg-gradient-to-r lg:after:from-[gold]/30 lg:after:to-transparent text-[gold]'
                  : ''
              }`}
            >
              <Link
                href={'/user/settings'}
                className={`user-sidebar__link flex flex-col items-center justify-center h-full lg:px-10 settings-icon-desktop ${
                  isActive('/user/settings') ? 'lg:mx-[calc(2.5rem-4px)]' : 'lg:mx-10 hover:text-[gold]'
                }`}
              >
                Настройки
              </Link>
            </li>
          </ul>
        </nav>

        <div className="user-sidebar-promo hidden bg-[gold] text-gray-900 p-4 mt-auto mb-8 rounded-3xl mx-10 lg:block">
          <h3 className="user-sidebar-promo__title text-lg font-semibold mb-4">
            Продолжай учиться, двигайся вперед...
          </h3>
          <img
            src="https://ik.imagekit.io/x3xxjzs9x/user/sidebar-promo.png?updatedAt=1748707388634"
            alt="Promo Image"
          />
          <p className="user-sidebar-promo__description text-sm text-center my-4">
            Подбери для себя новые курсы из нашего каталога
          </p>
          <Link
            href="/courses"
            className="user-sidebar-promo__link grid w-full place-self-center bg-gray-900 text-white px-4 py-3 rounded-lg text-sm text-center"
          >
            Выбрать курсы
          </Link>
        </div>

        <SignOutButton className="col-span-1 text-xs hover:text-[gold] sm:text-base lg:mx-10" />
      </div>
    </aside>
  )
}

export default UserSidebar
