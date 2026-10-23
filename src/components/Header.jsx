import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
const defaultLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/ai-solutions', label: 'AI Solutions' },
  { to: '/research', label: 'Research' },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
]
const Arrow = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const [headerData, setHeaderData] = useState({
    logoUrl: '/logo.svg',
    links: defaultLinks,
    contactText: 'Contact Us',
    contactUrl: '/contact',
  })
  const { pathname } = useLocation()
  // Fetch header content from the backend API
  useEffect(() => {
    let cancelled = false
    async function fetchHeader() {
      try {
        const response = await fetch('http://localhost:5000/api/header')
        if (!response.ok) {
          throw new Error('Failed to fetch header content')
        }
        const data = await response.json()
        if (!cancelled) {
          setHeaderData({
            logoUrl: data.logoUrl || '/logo.svg',
            links:
              Array.isArray(data.links) && data.links.length > 0
                ? data.links
                : defaultLinks,
            contactText: data.contactText || 'Contact Us',
            contactUrl: data.contactUrl || '/contact',
          })
        }
      } catch (error) {
        console.error('Header API error:', error)
        // Keep the default header visible if the API is unavailable
      }
    }
    fetchHeader()
    return () => {
      cancelled = true
    }
  }, [])
  // Add the white blurred background when scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  // Close mobile menu when the route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])
  // Prevent background scrolling while the mobile menu is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])
  const desktopLink = ({ isActive }) =>
    `nav-link px-4 py-2 text-sm font-medium ${isActive ? 'text-gm-teal' : 'text-gm-slate hover:text-gm-teal'
    }`
  const mobileLink = ({ isActive }) =>
    `text-2xl font-semibold transition ${isActive ? 'text-gm-teal' : 'text-gm-deep hover:text-gm-teal'
    }`
  return (
    <header
      id="navbar"
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gm-teal/5'
          : ''
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center gap-2 z-50"
            aria-label="Webcraft Home"
          >
            <img
              src={headerData.logoUrl}
              alt="Webcraft IT"
              className="h-10 w-auto"
            />
          </Link>
          {/* Desktop navigation */}
<nav
className="hidden lg:flex items-center gap-1"
aria-label="Main navigation"
>
{headerData.links.map((link) => (
<NavLink
key={`${link.to}-${link.label}`}
to={link.to}
end={link.to === '/'}
className={desktopLink}
>
{link.label}
</NavLink>
))}
<Link
to={headerData.contactUrl}
className="ml-4 inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gm-teal to-gm-green text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-gm-teal/25 transition-all"
>
{headerData.contactText}
<Arrow />
</Link>
</nav>
{/* Mobile hamburger button */}
<button
ref={menuButtonRef}
type="button"
onClick={() => setMenuOpen((open) => !open)}
className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
aria-expanded={menuOpen}
aria-controls="mobile-navigation"
aria-label="Toggle navigation menu"
>
<span
className="block w-6 h-0.5 bg-gm-deep transition-all duration-300 origin-center"
style={{
transform: menuOpen
? 'rotate(45deg) translate(4px,4px)'
: '',
}}
/>
<span
className="block w-6 h-0.5 bg-gm-deep transition-all duration-300"
style={{ opacity: menuOpen ? 0 : 1 }}
/>
<span
className="block h-0.5 bg-gm-deep transition-all duration-300 origin-center"
style={{
width: menuOpen ? '1.5rem' : '1rem',
transform: menuOpen
? 'rotate(-45deg) translate(4px,-4px)'
: '',
}}
/>
</button>
</div>
</div>
{/* Mobile navigation */}
<div
className={`mobile-menu ${menuOpen ? 'open' : ''} fixed inset-0 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden`}
id="mobile-navigation"
role="navigation"
aria-label="Mobile navigation"
aria-hidden={!menuOpen}
>
{headerData.links.map((link) => (
<NavLink
key={`${link.to}-${link.label}`}
to={link.to}
end={link.to === '/'}
className={mobileLink}
tabIndex={menuOpen ? undefined : -1}
>
{link.label}
</NavLink>
))}
<Link
to={headerData.contactUrl}
className="mt-4 px-8 py-3 bg-gradient-to-r from-gm-teal to-gm-green text-white font-semibold rounded-full"
tabIndex={menuOpen ? undefined : -1}
>
{headerData.contactText}
</Link>
</div>
</header>
)
}