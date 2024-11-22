import React from 'react'
import Link from 'next/link'

interface Props {}

const Header: React.FC<Props> = async () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/register">Sign Up</Link>
          </li>
          <li>
            <Link href="/login">Sign In</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
