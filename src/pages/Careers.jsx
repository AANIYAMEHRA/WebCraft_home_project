
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";

const values = [
    {
        number: "01",
        title: "Clarity First",
        description:
            "We prioritize understanding over assumptions. Every recommendation is backed by evidence and honest assessment.",
    },
    {
        number: "02",
        title: "Delivery Realism",
        description:
            "We commit to what we can deliver — and then deliver it. No inflated timelines, no scope surprises.",
    },
    {
        number: "03",
        title: "Client Partnership",
        description:
            "We build with our clients, not just for them — shared ownership, collaboration, and shared success.",
    },
    {
        number: "04",
        title: "Continuous Learning",
        description:
            "Technology evolves constantly. We invest in staying current and exploring better ways to solve problems.",
    },
];

export default function Careers() {
    useReveal();

    useEffect(() => {
        const previousTitle = document.title;
        document.title = "Careers — Webcraft | Build What's Next";

        return () => {
            document.title = previousTitle;
        };
    }, []);

    return (
        <main className="overflow-hidden bg-white">

            {/* HERO */}
            <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 hero-mesh" />
                <div className="orb w-[450px] h-[450px] bg-gm-teal/10 top-[-120px] right-[-100px]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">
                            Careers at Webcraft
                        </span>

                        <h1 className="reveal text-5xl md:text-6xl lg:text-7xl font-extrabold text-gm-deep leading-[1.08] tracking-tight">
                            Build what's next.
                            <br />
                            <span className="bg-gradient-to-r from-gm-teal via-gm-blue to-gm-green bg-clip-text text-transparent">
                                Build it with us.
                            </span>
                        </h1>

                        <p className="reveal text-lg md:text-xl text-gm-muted mt-8 max-w-2xl leading-relaxed">
                            Be part of work that brings research, technology, and
                            thoughtful engineering together to solve real-world
                            challenges.
                        </p>

                        <div className="reveal flex flex-wrap gap-4 mt-10">
                            <a
                                href="#openPositions"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-gm-teal to-gm-green text-white px-7 py-4 rounded-full font-bold text-sm hover:shadow-xl hover:shadow-gm-teal/20 transition-all duration-300"
                            >
                                Explore Opportunities
                                <span aria-hidden="true">↓</span>
                            </a>

                            <a
                                href="mailto:hr@webcraftit.com"
                                className="inline-flex items-center gap-2 border border-gm-teal/20 text-gm-deep px-7 py-4 rounded-full font-bold text-sm hover:border-gm-teal hover:text-gm-teal transition-all duration-300"
                            >
                                Get in Touch
                                <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </div>

                    <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-gm-teal/10">
                        {[
                            ["2006", "Founded"],
                            ["3000+", "Clients served"],
                            ["230+", "Professionals"],
                            ["96%", "Client retention"],
                        ].map(([number, label]) => (
                            <div key={label}>
                                <div className="text-3xl md:text-4xl font-extrabold text-gm-deep">
                                    {number}
                                </div>
                                <div className="text-sm text-gm-muted mt-2">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY WEBCRAFT */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-6">
                                The Work We Do
                            </span>

                            <h2 className="reveal text-4xl md:text-5xl font-bold text-gm-deep leading-tight">
                                Technology with
                                <span className="text-gm-teal"> purpose.</span>
                            </h2>
                        </div>

                        <div className="reveal">
                            <p className="text-gm-muted text-lg leading-relaxed">
                                Webcraft has grown from a web development startup
                                into a research-led, AI-enabled digital
                                transformation partner.
                            </p>
                            <p className="text-gm-muted leading-relaxed mt-5">
                                Our work spans research, practical AI and
                                automation, software engineering, cloud
                                solutions, and long-term product support. We
                                believe in understanding problems before
                                building solutions and delivering work that
                                creates lasting value.
                            </p>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 text-gm-teal font-bold text-sm mt-7 hover:gap-4 transition-all"
                            >
                                Discover Webcraft <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUES */}
            <section className="py-20 lg:py-28 bg-gm-ghost">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-6">
                            What We Believe In
                        </span>

                        <h2 className="reveal text-4xl md:text-5xl font-bold text-gm-deep">
                            Principles behind
                            <span className="text-gm-teal"> our work.</span>
                        </h2>

                        <p className="reveal text-gm-muted mt-5 leading-relaxed">
                            These values guide how we think, collaborate,
                            make decisions, and deliver for our clients.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {values.map((item) => (
                            <article
                                key={item.number}
                                className="reveal bg-white rounded-3xl p-8 border border-gm-teal/10 hover:border-gm-teal/40 hover:-translate-y-1 transition-all duration-300"
                            >
                                <span className="text-sm font-mono font-bold text-gm-teal">
                                    {item.number}
                                </span>

                                <h3 className="text-xl font-bold text-gm-deep mt-8 mb-4">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-gm-muted leading-relaxed">
                                    {item.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* OPEN POSITIONS */}
            <section
                id="openPositions"
                className="py-20 lg:py-28 bg-white"
            >
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-6">
                            Opportunities
                        </span>

                        <h2 className="reveal text-4xl md:text-5xl font-bold text-gm-deep">
                            Open Positions
                        </h2>

                        <p className="reveal text-gm-muted mt-5 max-w-xl mx-auto leading-relaxed">
                            Explore opportunities to become part of the
                            Webcraft journey.
                        </p>
                    </div>

                    <div className="reveal bg-gm-ghost rounded-3xl border border-gm-teal/10 p-10 md:p-16 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gm-teal/10 flex items-center justify-center mx-auto mb-7">
                            <svg
                                className="w-8 h-8 text-gm-teal"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <rect x="3" y="7" width="18" height="13" rx="2" />
                                <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18M10 12v2h4v-2" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-gm-deep">
                            No open positions currently
                        </h3>

                        <p className="text-gm-muted leading-relaxed max-w-lg mx-auto mt-4">
                            There are no listed openings at the moment.
                            Please check back later for future opportunities.
                        </p>

                        <a
                            href="mailto:hr@webcraftit.com?subject=General%20Career%20Enquiry"
                            className="inline-flex items-center gap-2 mt-8 text-gm-teal font-bold text-sm hover:gap-4 transition-all"
                        >
                            Contact our team <span>→</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* GENERAL APPLICATION CTA */}
            <section className="relative py-20 lg:py-28 overflow-hidden bg-gm-deep">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute w-96 h-96 rounded-full bg-gm-teal blur-3xl -top-40 -right-20" />
                    <div className="absolute w-80 h-80 rounded-full bg-gm-blue blur-3xl -bottom-40 -left-20" />
                </div>

                <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <span className="reveal inline-block text-xs font-mono uppercase tracking-widest text-gm-mint mb-6">
                        Stay Connected
                    </span>

                    <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        Your next chapter
                        <br />
                        <span className="text-gm-mint">could start here.</span>
                    </h2>

                    <p className="reveal text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mt-7">
                        Interested in working with Webcraft? Reach out to our
                        team and introduce yourself.
                    </p>

                    <a
                        href="mailto:hr@webcraftit.com?subject=Career%20Enquiry"
                        className="reveal inline-flex items-center gap-3 mt-10 bg-gradient-to-r from-gm-teal to-gm-green text-white px-8 py-4 rounded-full font-bold text-sm hover:shadow-xl hover:shadow-gm-teal/30 transition-all duration-300"
                    >
                        Connect with HR <span>↗</span>
                    </a>
                </div>
            </section>

        </main>
    );
}
