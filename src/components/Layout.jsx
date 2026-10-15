import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import useReveal from '../hooks/useReveal.js'

// Route change pe page ko top par scroll karta hai (HTML multi-page me ye automatic tha)
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  useReveal()
  return (
    <>
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gm-teal focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
