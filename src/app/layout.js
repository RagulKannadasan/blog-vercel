import './globals.css'
import Navbar from '@/components/Navbar'
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
        <Navbar />
        
        {/* Abstract Background Elements */}
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>

        <div className="container">
          {children}
          <footer>
            <p>&copy; {new Date().getFullYear()} My Personal Blog. Built with ❤️ and Next.js.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
