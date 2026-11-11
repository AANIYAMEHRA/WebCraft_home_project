
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const defaultSocials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/webcraft-it/',
    d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/webcraftitcompany/',
    d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/webcraftit/',
    d: 'M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z',
  },
]

const defaultColumns = [
  {
    title: 'Explore',
    items: [
      { to: '/ai-solutions', label: 'AI Solutions' },
      { to: '/research', label: 'Research' },
      { to: '/services', label: 'Services' },
      { to: '/products', label: 'Products' },
    ],
  },
  {
    title: 'Products',
    items: [
      { to: '/products', label: 'Webcraft HRMS' },
      { to: '/products', label: 'TutorWand' },
      { to: '/products', label: 'WCSchool ERP' },
    ],
  },
  {
    title: 'Company',
    items: [
      { to: '/about', label: 'About us' },
      { to: '/contact', label: 'Contact' },
    ],
  },
]

export default function Footer() {
  const [footer, setFooter] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchFooter() {
      try {
        const response = await fetch('http://localhost:5000/api/footer')

        if (!response.ok) {
          throw new Error('Failed to fetch footer')
        }

        const data = await response.json()

        if (!cancelled) {
          setFooter(data)
        }
      } catch (error) {
        console.error('Footer API error:', error)
      }
    }

    fetchFooter()

    return () => {
      cancelled = true
    }
  }, [])

  const socials = defaultSocials.map((defaultSocial) => {
    const savedSocial = footer?.socials?.find(
      (social) => social.label === defaultSocial.label,
    )

    return {
      ...defaultSocial,
      href: savedSocial?.href || defaultSocial.href,
    }
  })

  const columns = footer?.columns?.length
    ? footer.columns
    : defaultColumns

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__bg" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="site-footer__mark-wrap">
          <p className="site-footer__kicker">
            {footer?.kicker || 'Say Hello'}
          </p>

          <h2 className="site-footer__mark">
            {footer?.heading || 'Think first.'}{' '}
            <em>{footer?.headingEmphasis || 'Ship well.'}</em>
          </h2>

          <a
            href={`mailto:${footer?.email || 'admin@webcraft.co.in'}`}
            className="site-footer__email"
          >
            {footer?.email || 'admin@webcraft.co.in'}
            <span className="site-footer__email-arrow">→</span>
          </a>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo" aria-label="Webcraft Home">
              <img src="/logo.svg" alt="Webcraft IT" />
            </Link>

            <p className="site-footer__tag">
              {footer?.brandTagline ||
                'Research-led, AI-enabled digital transformation for teams that ship.'}
            </p>

            <div className="site-footer__socials">
              <span className="site-footer__socials-label">
                Follow along
              </span>

              <div className="site-footer__socials-row">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__social"
                    aria-label={social.label}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.d} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {columns.map((column) => (
            <div className="site-footer__col" key={column._id || column.title}>
              <span className="site-footer__col-label">
                <span className="site-footer__col-dot" aria-hidden="true" />
                {column.title}
              </span>

              {column.items.map((item) => (
                <Link
                  key={item._id || item.label}
                  to={item.to}
                  className="site-footer__link"
                >
                  <span>{item.label}</span>
                  <span className="site-footer__arrow">→</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            &copy; {new Date().getFullYear()} Webcraft IT Services. All rights reserved.
          </p>

          <p className="site-footer__meta">
            {footer?.bottomText || 'Research · AI · Engineering'}
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="site-footer__top"
            aria-label="Back to top"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
