'use client'

import Link from 'next/link'
import React, { useState, useContext } from 'react'
import { IoClose } from 'react-icons/io5'
import { GiHamburgerMenu } from 'react-icons/gi'
import { SessionContext } from '@/app/providers/SessionProvider'
import SignOutButton from '../buttons/SignOutButton'

type Props = {}

const Header: React.FC<Props> = () => {
  const { currentUser } = useContext(SessionContext)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  return (
    <header className="relative pt-6">
      <div className="header__inner custom-container custom-container--wide flex justify-between items-center">
        <div className="logo">
          <Link href="/">Главная</Link>
        </div>
        <nav className={` ${isMobileMenuOpen ? 'header__nav header__nav--active' : 'header__nav'}`}>
          <div className="logo">
            <Link href="/">Главная</Link>
          </div>
          <div className="flex">
            <ul className="header__list">
              <li className="flex">
                <Link href="/courses" className="header__nav-link">
                  Курсы
                </Link>
              </li>

              {!currentUser ? (
                <>
                  <li className="flex">
                    <Link href="/register" className="header__nav-link">
                      Регистрация
                    </Link>
                  </li>
                  <li className="flex">
                    <Link href="/login" className="header__nav-link">
                      Вход
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex">
                    <Link href="/user/dashboard" className="header__nav-link">
                      Личный кабинет
                    </Link>
                  </li>
                  <li className="flex">
                    <SignOutButton />
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <button className="header__mobile-menu" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <IoClose className="w-8 h-8" /> : <GiHamburgerMenu className="w-8 h-8" />}
        </button>
      </div>
    </header>
  )
}

export default Header
