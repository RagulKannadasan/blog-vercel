'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();

  const isBlogActive = pathname === '/' || pathname.startsWith('/post/');
  const isProfileActive = pathname === '/profile';
  const isEditorActive = pathname === '/editor';

  return (
    <nav className="top-navbar">
      <Link href="/" className="navbar-brand">Ragul's Blog</Link>
      <div className="navbar-links">
        <Link href="/" className={`nav-link ${isBlogActive ? 'active' : ''}`}>Blog</Link>
        <Link href="/profile" className={`nav-link ${isProfileActive ? 'active' : ''}`}>Profile</Link>
        <Link href="/editor" className={`nav-link ${isEditorActive ? 'active' : ''}`} style={{ opacity: 0.5, fontSize: '0.8rem' }}>Editor</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
