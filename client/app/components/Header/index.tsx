import React from 'react'
import Link from 'next/link'
import { getCurrentUser } from '@/utils/getCurrentUser'
import SignOutButton from '../buttons/SignOutButton'

interface Props {}

const Header: React.FC<Props> = async () => {
  const currentUser = await getCurrentUser()

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link href="/">Главная</Link>
          </li>
          <li>
            <Link href="/courses">Курсы</Link>
          </li>
          <li>
            <Link href="/register">Регистрация</Link>
          </li>
          <li>
            <Link href="/user/dashboard">Личный кабинет</Link>
          </li>
          <li>{!currentUser ? <Link href="/login">Вход</Link> : <SignOutButton />}</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
