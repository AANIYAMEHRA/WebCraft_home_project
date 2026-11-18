import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";
import useCareersPage from "../hooks/useCareersPage";

export default function Careers() {
    useReveal();

    const cms = useCareersPage();
    const page = cms?.page;
    const jobs = cms?.jobs || [];
    const stats = page?.stats || [];
    const values = page?.values?.items || [];

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formMessage, setFormMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // Scrolls smoothly to the application form instead of opening the email app.
    const scrollToApplication = (event) => {
        event.preventDefault();

        const form = document.getElementById("apply");
        if (!form) return;

        form.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", "#apply");
    };

    const handleApplicationSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const resume = formData.get("resume");

        if (!resume || !resume.name) {
            setMessageType("error");
            setFormMessage("Please upload your resume.");
            return;
        }

        if (resume.size > 5 * 1024 * 1024) {
            setMessageType("error");
            setFormMessage("Resume size must be 5 MB or less.");
            return;
        }

        setIsSubmitting(true);
        setFormMessage("");

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 30000);

        try {
            const response = await fetch("/api/careers", {
                method: "POST",
                body: formData,
                signal: controller.signal,
            });

            const result = await response.json().catch(() => ({
                message: "Server did not return a valid response. Check that the backend is running.",
            }));

            if (!response.ok) {
                throw new Error(result.message || "Application submission failed.");
            }

            setMessageType("success");
            setFormMessage(result.message || "Your application has been submitted successfully.");
            form.reset();
        } catch (error) {
            setMessageType("error");
            setFormMessage(
                error.name === "AbortError"
                    ? "Request timed out. Please try again."
                    : error.message || "Something went wrong."
            );
        } finally {
            clearTimeout(timer);
            setIsSubmitting(false);
        }
    };

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
                            {page?.hero?.chip ?? "Careers at Webcraft"}
                        </span>

                        <h1 className="reveal text-5xl md:text-6xl lg:text-7xl font-extrabold text-gm-deep leading-[1.08] tracking-tight">
                            {page?.hero?.titleLine1 ?? "Build what's next."}
                            <br />
                            <span className="bg-gradient-to-r from-gm-teal via-gm-blue to-gm-green bg-clip-text text-transparent">
                                {page?.hero?.titleLine2 ?? "Build it with us."}
                            </span>
                        </h1>

                        <p className="reveal text-lg md:text-xl text-gm-muted mt-8 max-w-2xl leading-relaxed">
                            {page?.hero?.description ??
                                "Be part of work that brings research, technology, and thoughtful engineering together to solve real-world challenges."}
                        </p>

                        <div className="reveal flex flex-wrap gap-4 mt-10">
                            <a
                                href="#openPositions"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-gm-teal to-gm-green text-white px-7 py-4 rounded-full font-bold text-sm hover:shadow-xl hover:shadow-gm-teal/20 transition-all duration-300"
                            >
                                {page?.hero?.primaryButtonText ?? "Explore Opportunities"}
                                <span aria-hidden="true">↓</span>
                            </a>

                            <a
                                href="#apply"
                                onClick={scrollToApplication}
                                className="inline-flex items-center gap-2 border border-gm-teal/20 text-gm-deep px-7 py-4 rounded-full font-bold text-sm hover:border-gm-teal hover:text-gm-teal transition-all duration-300"
                            >
                                {page?.hero?.secondaryButtonText ?? "Get in Touch"}
                                <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </div>

                    <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-gm-teal/10">
                        {stats.map((s) => (
                            <div key={s.label}>
                                <div className="text-3xl md:text-4xl font-extrabold text-gm-deep">
                                    {s.value}
                                </div>
                                <div className="text-sm text-gm-muted mt-2">
                                    {s.label}
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
                                {page?.whyWebcraft?.label ?? "The Work We Do"}
                            </span>

                            <h2 className="reveal text-4xl md:text-5xl font-bold text-gm-deep leading-tight">
                                {page?.whyWebcraft?.heading ?? "Technology with"}
                                <span className="text-gm-teal"> {page?.whyWebcraft?.headingHighlight ?? "purpose."}</span>
                            </h2>
                        </div>

                        <div className="reveal">
                            <p className="text-gm-muted text-lg leading-relaxed">
                                {page?.whyWebcraft?.paragraph1 ??
                                    "Webcraft has grown from a web development startup into a research-led, AI-enabled digital transformation partner."}
                            </p>
                            <p className="text-gm-muted leading-relaxed mt-5">
                                {page?.whyWebcraft?.paragraph2 ??
                                    "Our work spans research, practical AI and automation, software engineering, cloud solutions, and long-term product support. We believe in understanding problems before building solutions and delivering work that creates lasting value."}
                            </p>
                            <Link
                                to={page?.whyWebcraft?.linkUrl ?? "/about"}
                                className="inline-flex items-center gap-2 text-gm-teal font-bold text-sm mt-7 hover:gap-4 transition-all"
                            >
                                {page?.whyWebcraft?.linkText ?? "Discover Webcraft"} <span>→</span>
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
                            {page?.values?.label ?? "What We Believe In"}
                        </span>

                        <h2 className="reveal text-4xl md:text-5xl font-bold text-gm-deep">
                            {page?.values?.heading ?? "Principles behind"}
                            <span className="text-gm-teal"> {page?.values?.headingHighlight ?? "our work."}</span>
                        </h2>

                        <p className="reveal text-gm-muted mt-5 leading-relaxed">
                            {page?.values?.description ??
                                "These values guide how we think, collaborate, make decisions, and deliver for our clients."}
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
                            {page?.openPositions?.label ?? "Opportunities"}
                        </span>

                        <h2 className="reveal text-4xl md:text-5xl font-bold text-gm-deep">
                            {page?.openPositions?.heading ?? "Open Positions"}
                        </h2>

                        <p className="reveal text-gm-muted mt-5 max-w-xl mx-auto leading-relaxed">
                            {page?.openPositions?.description ??
                                "Explore opportunities to become part of the Webcraft journey."}
                        </p>
                    </div>

                    {jobs.length === 0 ? (
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
                                {page?.openPositions?.emptyTitle ?? "No open positions currently"}
                            </h3>

                            <p className="text-gm-muted leading-relaxed max-w-lg mx-auto mt-4">
                                {page?.openPositions?.emptyDescription ??
                                    "There are no listed openings at the moment. Please check back later for future opportunities."}
                            </p>

                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 mt-8 text-gm-teal font-bold text-sm hover:gap-4 transition-all"
                            >
                                {page?.openPositions?.contactText ?? "Contact our team"} <span>→</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-5">
                            {jobs.map((job) => (
                                <article
                                    key={job._id}
                                    className="reveal bg-gm-ghost rounded-3xl border border-gm-teal/10 p-8"
                                >
                                    <div className="text-xs font-mono font-bold text-gm-teal uppercase tracking-wider">
                                        {[job.department, job.location, job.type].filter(Boolean).join(" · ")}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gm-deep mt-2">
                                        {job.title}
                                    </h3>
                                    {job.description && (
                                        <p className="text-gm-muted leading-relaxed mt-4 whitespace-pre-line">
                                            {job.description}
                                        </p>
                                    )}
                                    <a
                                        href="#apply"
                                        onClick={scrollToApplication}
                                        className="inline-flex items-center gap-2 mt-6 text-gm-teal font-bold text-sm hover:gap-4 transition-all"
                                    >
                                        Apply now <span>→</span>
                                    </a>
                                </article>
                            ))}
                        </div>
                    )}
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
                        {page?.cta?.label ?? "Stay Connected"}
                    </span>

                    <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        {page?.cta?.heading ?? "Your next chapter"}
                        <br />
                        <span className="text-gm-mint">{page?.cta?.headingHighlight ?? "could start here."}</span>
                    </h2>

                    <p className="reveal text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mt-7">
                        {page?.cta?.description ??
                            "Interested in working with Webcraft? Share your details and resume with our HR team."}
                    </p>

                    <form
                        id="apply"
                        onSubmit={handleApplicationSubmit}
                        className="reveal scroll-mt-32 mt-12 max-w-2xl mx-auto text-left bg-white rounded-3xl p-6 md:p-10 shadow-2xl"
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gm-deep mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gm-deep focus:outline-none focus:ring-2 focus:ring-gm-teal"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gm-deep mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gm-deep focus:outline-none focus:ring-2 focus:ring-gm-teal"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-semibold text-gm-deep mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter your phone number (optional)"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gm-deep focus:outline-none focus:ring-2 focus:ring-gm-teal"
                            />
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-semibold text-gm-deep mb-2">
                                Upload Resume *
                            </label>
                            <input
                                type="file"
                                name="resume"
                                required
                                accept=".pdf,.doc,.docx"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gm-deep text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gm-teal file:text-white file:font-semibold"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Accepted formats: PDF, DOC, DOCX. Maximum size: 5 MB.
                            </p>
                        </div>

                        {formMessage && (
                            <p
                                role="status"
                                className={`mt-5 text-sm font-medium ${messageType === "success"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {formMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-8 bg-gradient-to-r from-gm-teal to-gm-green text-white px-8 py-4 rounded-full font-bold text-sm hover:shadow-xl hover:shadow-gm-teal/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </button>
                    </form>
                </div>
            </section>

        </main>
    );
}