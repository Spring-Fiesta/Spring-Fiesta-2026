'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const menuBtnHandler = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Event Schedule' },
    { href: '/core-team', label: 'Core Members' },
    { href: '/sponsors', label: 'Sponsors' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/corporate-crime', label: 'Corporate Crime' },
  ]

  return (
    <motion.div 
      className="nav-main"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeIn", duration: 0.6 }}
    >
      <div className="nav-logo">
        <Link href="/">
          <img src="/images/Spring.png" alt="Spring" />
        </Link>
      </div>
      <ul className={`nav-ul ${isMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.href} className="nav-li">
            <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </Link>
            {pathname === link.href && <div className="border-cross"></div>}
          </li>
        ))}
      </ul>
      <div 
        className={`menu-btn ${isMenuOpen ? 'open' : ''}`} 
        onClick={menuBtnHandler}
      >
        <div className="menu-btn__burger"></div>
      </div>
    </motion.div>
  )
}

export default Navbar
