import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NavBar = () => {
  return (
    <header className='px-3 py-1.5 bg-amber-50 '>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <Image src='/logo.png' alt="Logo" width={50} height={50} />
        </Link>

      </nav>

    </header>
  )
}

export default NavBar
