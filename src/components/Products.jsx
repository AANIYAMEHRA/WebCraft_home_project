
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const API = 'http://localhost:5000/api/home'

const DEFAULT_PRODUCTS = {
    label: 'Our Products',
    headingLine1: 'Platforms Built From',
    headingLine2: 'Real Experience.',
    items: [
        {
            num: 'Product 001',
            nameLine1: 'Webcraft',
            nameLine2: 'HRMS.',
            summary: 'Complete HR management — attendance, leave, payroll, self-service portal, and role-based security. Flat ₹2,999/mo server cost, no per-user fees. Built for mid-size teams who need enterprise features without enterprise budgets.',
            meta: [
                { label: 'Category', value: 'Enterprise HR' },
                { label: 'Users', value: '500+ companies' },
                { label: 'Pricing', value: '₹2,999/mo flat' },
            ],
            buttonText: 'Learn more →',
            buttonUrl: '/products',
        },
        {
            num: 'Product 002',
            nameLine1: 'Tutor',
            nameLine2: 'Wand.',
            summary: "AI-powered adaptive test prep for SAT, GRE, and more. 40K+ students, 2.7K+ teachers, 5000+ questions, and white-label options for institutes. The AI adjusts difficulty in real-time to each learner's pace.",
            meta: [
                { label: 'Category', value: 'Ed-Tech · AI' },
                { label: 'Reach', value: '40K+ students' },
                { label: 'Questions', value: '5,000+ bank' },
            ],
            buttonText: 'Learn more →',
            buttonUrl: '/products',
        },
        {
            num: 'Product 003',
            nameLine1: 'WCSchool',
            nameLine2: 'ERP.',
            summary: 'School management platform — fees, schedules, exams, parent monitoring, and seamless communication between schools, parents, and students. One dashboard for the entire institution.',
            meta: [
                { label: 'Category', value: 'School Mgmt' },
                { label: 'Modules', value: '12+ integrated' },
                { label: 'Users', value: 'Schools · Parents' },
            ],
            buttonText: 'Learn more →',
            buttonUrl: '/products',
        },
    ],
}

export default function Products() {
    const root = useRef(null)
    const [content, setContent] = useState(DEFAULT_PRODUCTS)

    useEffect(() => {
        let cancelled = false

        async function loadProducts() {
            try {
                const response = await fetch(API)
                if (!response.ok) throw new Error('Failed to load products')

                const data = await response.json()
                const products = data.products

                if (!cancelled && products) {
                    setContent({
                        ...DEFAULT_PRODUCTS,
                        ...products,
                        items:
                            Array.isArray(products.items) && products.items.length > 0
                                ? products.items
                                : DEFAULT_PRODUCTS.items,
                    })
                }
            } catch (error) {
                console.error('Products fetch error:', error)
            }
        }

        loadProducts()

        return () => {
            cancelled = true
        }
    }, [])

    useLayoutEffect(() => {
        if (window.innerWidth <= 768) return

        const ctx = gsap.context(() => {
            const track = root.current?.querySelector('#prodPanelsTrack')
            if (!track) return

            const getScrollDistance = () =>
                Math.max(0, track.scrollWidth - window.innerWidth)

            const tween = gsap.to(track, {
                x: () => -getScrollDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: '#prodPanelsContainer',
                    pin: true,
                    scrub: 1,
                    end: () => '+=' + getScrollDistance(),
                    invalidateOnRefresh: true,
                },
            })

            return () => tween.scrollTrigger?.kill()
        }, root)

        return () => ctx.revert()
    }, [content.items])

    return (
        <div ref={root}>
            <section className="prod-intro bg-gm-ghost" aria-label="Products intro">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">
                        {content.label ?? 'Our Products'}
                    </span>

                    <h2 className="reveal prod-intro__heading" style={{ transitionDelay: '0.08s' }}>
                        {content.headingLine1}
                        <br />
                        <em>{content.headingLine2}</em>
                    </h2>
                </div>
            </section>

            <section className="prod-panels-container bg-gm-ghost" id="prodPanelsContainer">
                <div className="prod-panels-track" id="prodPanelsTrack">
                    {content.items.map((product, index) => (
                        <article
                            className={`prod-panel prod-panel--${index + 1}`}
                            key={`${product.num}-${index}`}
                        >
                            <div className="prod-panel__inner">
                                <div className="prod-panel__num" aria-hidden="true">
                                    {product.num}
                                </div>

                                <h3 className="prod-panel__title">
                                    {product.nameLine1}
                                    <br />
                                    <em>{product.nameLine2}</em>
                                </h3>

                                <p className="prod-panel__summary">{product.summary}</p>

                                <div className="prod-panel__meta">
                                    {(product.meta || []).map((item, metaIndex) => (
                                        <div key={`${item.label}-${metaIndex}`}>
                                            {item.label}
                                            <span>{item.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link to={product.buttonUrl || '/products'} className="prod-panel__cta">
                                    {product.buttonText || 'Learn more →'}
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    )
}
