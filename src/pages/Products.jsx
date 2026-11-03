
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const API = "http://localhost:5000/api/products";

function ProductFeatures({ features = [] }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
                <div
                    key={`${feature.title}-${index}`}
                    className="prod-feature bg-white rounded-2xl p-6 border border-gm-teal/8"
                    data-prod-feat
                >
                    {feature.title && (
                        <h4 className="font-bold text-gm-deep text-sm mb-1">
                            {feature.title}
                        </h4>
                    )}
                    {feature.description && (
                        <p className="text-xs text-gm-muted">
                            {feature.description}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}

function ProductStats({ stats = [] }) {
    return (
        <div
            className="grid grid-cols-2 gap-4"
            aria-label="Product key statistics"
        >
            {stats.map((stat, index) => (
                <div
                    key={`${stat.label}-${index}`}
                    className="prod-stat bg-gm-ghost rounded-2xl p-6 border border-gm-teal/8 text-center"
                    data-prod-feat
                >
                    {stat.value && (
                        <div className="text-2xl font-extrabold text-gm-deep">
                            {stat.value}
                        </div>
                    )}
                    {stat.label && (
                        <div className="text-xs text-gm-muted mt-1">
                            {stat.label}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default function Products() {
    const root = useRef(null);
    const [content, setContent] = useState(null);

    useEffect(() => {
        let active = true;

        async function loadProducts() {
            try {
                const response = await fetch(API);

                if (!response.ok) {
                    throw new Error("Failed to load Products");
                }

                const data = await response.json();

                if (active) {
                    setContent(data.content || data);
                }
            } catch (error) {
                console.error("Products load error:", error);
            }
        }

        loadProducts();

        return () => {
            active = false;
        };
    }, []);

    const products = content?.products || [];
    const hero = content?.hero || {};
    const cta = content?.cta || {};

    useLayoutEffect(() => {
        if (!content) return;

        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray("[data-prod]");

            sections.forEach((section) => {
                const left = section.querySelector('[data-prod-side="left"]');
                const right = section.querySelector('[data-prod-side="right"]');
                const mark = section.querySelector(".prod-watermark");

                if (left) {
                    gsap.from(left, {
                        opacity: 0,
                        x: -50,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        },
                    });
                }

                if (right) {
                    gsap.from(right.querySelectorAll("[data-prod-feat]"), {
                        opacity: 0,
                        x: 50,
                        duration: 0.9,
                        stagger: 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        },
                    });
                }

                if (mark) {
                    gsap.fromTo(
                        mark,
                        { y: 60 },
                        {
                            y: -60,
                            ease: "none",
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        }
                    );
                }
            });

            const heroElements = gsap.utils.toArray(
                ".products-hero .reveal"
            );

            gsap.fromTo(
                heroElements,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.12,
                    delay: 0.1,
                    ease: "power3.out",
                    clearProps: "transform",
                }
            );
        }, root);

        return () => {
            ctx.revert();
        };
    }, [content]);

    if (!content) {
        return null;
    }

    return (
        <main ref={root}>
            {/* HERO */}
            <section
                className="products-hero relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
                aria-label="Page hero"
            >
                <div className="absolute inset-0 hero-mesh" />
                <div className="orb w-[500px] h-[500px] bg-gm-teal/10 top-[-100px] right-[-100px]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-3xl">
                        {hero.label && (
                            <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-6">
                                {hero.label}
                            </span>
                        )}

                        {(hero.headingLine1 || hero.headingLine2) && (
                            <h1 className="reveal text-5xl lg:text-6xl font-extrabold text-gm-deep leading-[1.08] tracking-tight">
                                {hero.headingLine1}
                                {hero.headingLine1 && hero.headingLine2 && <br />}
                                {hero.headingLine2 && (
                                    <span className="bg-gradient-to-r from-gm-teal via-gm-blue to-gm-green bg-clip-text text-transparent">
                                        {hero.headingLine2}
                                    </span>
                                )}
                            </h1>
                        )}

                        {hero.description && (
                            <p className="reveal text-lg text-gm-muted mt-6 max-w-2xl leading-relaxed">
                                {hero.description}
                            </p>
                        )}

                        {hero.buttonText && (
                            <div className="reveal flex flex-wrap gap-4 mt-10">
                                <Link
                                    to={hero.buttonUrl?.trim() ? hero.buttonUrl : "#"}
                                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gm-teal to-gm-green text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-gm-teal/20 transition-all"
                                >
                                    {hero.buttonText}
                                    <span className="transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* PRODUCT SECTIONS */}
            {products.map((product, index) => (
                <section
                    key={product.num || product._id || index}
                    className={`prod-section py-20 lg:py-28 ${index % 2 === 0 ? "bg-gm-ghost" : ""
                        }`}
                    data-prod
                    data-prod-num={product.num}
                    aria-label={product.name || `Product ${index + 1}`}
                >
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                        {product.num && (
                            <span
                                className={`prod-watermark ${index === 1 ? "prod-watermark--right" : ""
                                    }`}
                                aria-hidden="true"
                            >
                                {product.num}
                            </span>
                        )}

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div
                                data-prod-side="left"
                                className={index === 1 ? "order-1 lg:order-2" : ""}
                            >
                                {product.productLabel && (
                                    <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-6">
                                        {product.productLabel}
                                    </span>
                                )}

                                {product.name && (
                                    <h2 className="prod-title text-4xl font-extrabold text-gm-deep mb-4">
                                        {product.name}
                                    </h2>
                                )}

                                {product.description && (
                                    <p className="text-gm-muted leading-relaxed mb-6">
                                        {product.description}
                                    </p>
                                )}

                                {product.price && (
                                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gm-teal/10 rounded-2xl mb-6">
                                        <span className="text-2xl font-extrabold text-gm-teal">
                                            {product.price}
                                        </span>
                                        {product.priceNote && (
                                            <span className="text-sm text-gm-muted">
                                                {product.priceNote}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {product.buttonText && (
                                    <Link
                                        to={product.buttonUrl?.trim() ? product.buttonUrl : "#"}
                                        className="block w-fit group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gm-teal to-gm-green text-white font-semibold rounded-full hover:shadow-lg transition-all"
                                    >
                                        {product.buttonText}
                                        <span className="transition-transform group-hover:translate-x-1">
                                            →
                                        </span>
                                    </Link>
                                )}
                            </div>

                            <div
                                data-prod-side="right"
                                className={index === 1 ? "order-2 lg:order-1" : ""}
                            >
                                {product.features?.length > 0 && (
                                    <ProductFeatures features={product.features} />
                                )}

                                {product.stats?.length > 0 && (
                                    <ProductStats stats={product.stats} />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* CTA */}
            <section className="page-cta" aria-label="Call to action">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
                    {cta.label && (
                        <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">
                            {cta.label}
                        </span>
                    )}

                    {(cta.headingLine1 || cta.headingLine2) && (
                        <h2 className="reveal page-cta__title">
                            {cta.headingLine1}
                            {cta.headingLine1 && cta.headingLine2 && <br />}
                            {cta.headingLine2 && <em>{cta.headingLine2}</em>}
                        </h2>
                    )}

                    {cta.description && (
                        <p className="reveal page-cta__body">
                            {cta.description}
                        </p>
                    )}

                    {cta.buttonText && (
                        <div className="page-magnet-wrap">
                            <Link
                                to={cta.buttonUrl?.trim() ? cta.buttonUrl : "#"}
                                className="page-magnet-btn"
                            >
                                {cta.buttonText} →
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
