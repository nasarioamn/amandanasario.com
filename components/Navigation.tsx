'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/about', label: 'About' },
  { href: '/articles', label: 'Articles' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-stone-900 hover:text-accent transition-colors">
          Amanda Nasario
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm transition-colors ${
                  pathname.startsWith(href)
                    ? 'text-accent font-medium'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/about#contact"
              className="text-sm bg-accent text-white px-4 py-2 rounded-full hover:bg-accent-dark transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-stone-600 hover:text-stone-900"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 px-6 py-4 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm ${
                pathname.startsWith(href) ? 'text-accent font-medium' : 'text-stone-700'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/about#contact"
            className="text-sm text-accent font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}
