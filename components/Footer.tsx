import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-stone-500">
          © {year} Amanda Nasario. All rights reserved.
        </p>
        <nav className="flex gap-6">
          {[
            { href: '/about', label: 'About' },
            { href: '/articles', label: 'Articles' },
            { href: '/services', label: 'Services' },
            { href: '/portfolio', label: 'Portfolio' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
