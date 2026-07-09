import './globals.css'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import NextTopLoader from 'nextjs-toploader'

export const metadata = {
  title: 'My Personal Blog',
  description: 'A personal blog containing my thoughts and tutorials.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NextTopLoader color="var(--accent)" height={4} showSpinner={false} />
        {/* Top Navbar */}
        <nav className="top-navbar">
          <Link href="/" className="navbar-brand">Ragul's Blog</Link>
          <div className="navbar-links">
            <Link href="/" className="nav-link">Blog</Link>
            <Link href="/profile" className="nav-link">Profile</Link>
            <Link href="/editor" className="nav-link" style={{ opacity: 0.5, fontSize: '0.8rem' }}>Editor</Link>
            <ThemeToggle />
          </div>
        </nav>
        
        {/* Abstract Background Elements */}
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>

        <div className="container">
          {children}
        </div>
      </body>
    </html>
  )
}
