import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const API = "http://localhost:5000/api/contact-enquiries";

const contactMethods = [
    {
        kicker: "Sales & General",
        value: "admin@webcraft.co.in",
        note: "New projects, partnerships, general enquiries.",
        href: "mailto:admin@webcraft.co.in",
    },
    {
        kicker: "Careers",
        value: "hr@webcraftit.com",
        note: "Open roles, internships, applications.",
        href: "mailto:hr@webcraftit.com",
    },
    {
        kicker: "LinkedIn",
        value: "linkedin.com/company/webcraft-it",
        note: "Follow for research & case notes.",
        href: "https://www.linkedin.com/company/webcraft-it/",
    },
    {
        kicker: "Instagram",
        value: "instagram.com/webcraftitcompany",
        note: "Behind-the-scenes, culture & team.",
        href: "https://www.instagram.com/webcraftitcompany/",
    },
    {
        kicker: "Facebook",
        value: "facebook.com/webcraftit",
        note: "Updates, events & community.",
        href: "https://www.facebook.com/webcraftit/",
    },
    {
        kicker: "Pinterest",
        value: "pinterest.com/webcraftit0045",
        note: "Design inspiration & mood boards.",
        href: "https://in.pinterest.com/webcraftit0045/",
    },
];

const interestOptions = [
    "AI Solutions",
    "Research & Advisory",
    "Product Demo (HRMS / TutorWand / WCSchool)",
    "Custom Product Development",
    "Digital Transformation",
    "Cloud & Data Engineering",
    "Engineering Services",
    "General Inquiry",
];

const steps = [
    {
        number: "01",
        title: "You write.",
        description:
            "As much or as little as you like. A single paragraph is enough to start - we'll ask the rest over a call.",
    },
    {
        number: "02",
        title: "We reply.",
        description:
            "Within one business day - usually sooner. From a real person, not an automated acknowledgement.",
    },
    {
        number: "03",
        title: "We talk.",
        description:
            "A 45-minute first call, free, off the record. No presentation. No commitment. Just clarity for both of us.",
    },
];

const initialForm = {
    fullName: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
};

export default function Contact() {
    const pageRef = useRef(null);

    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal contact form and contact methods
            gsap.from(".contact-reveal", {
                y: 25,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-content",
                    start: "top 80%",
                    once: true,
                },
            });

            // What happens next animation
            const circles = gsap.utils.toArray(".ct-proc-circle");
            const cards = gsap.utils.toArray(".ct-proc-card");
            const line = document.querySelector("#ct-process-line");

            if (circles.length && cards.length && line) {
                gsap.set(line, {
                    scaleX: 0,
                    transformOrigin: "left center",
                });

                gsap.set(cards, { opacity: 0, y: 22 });

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#process",
                        start: "top 70%",
                        once: true,
                    },
                    defaults: { ease: "power2.out" },
                });

                timeline
                    .call(() => circles[0].classList.add("active"))
                    .to(cards[0], {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                    })
                    .to(
                        line,
                        {
                            scaleX: 0.5,
                            duration: 0.7,
                            ease: "power2.inOut",
                        },
                        "+=0.1"
                    )
                    .call(() => circles[1].classList.add("active"))
                    .to(
                        cards[1],
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                        },
                        "-=0.1"
                    )
                    .to(
                        line,
                        {
                            scaleX: 1,
                            duration: 0.7,
                            ease: "power2.inOut",
                        },
                        "+=0.1"
                    )
                    .call(() => circles[2].classList.add("active"))
                    .to(
                        cards[2],
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                        },
                        "-=0.1"
                    );
            }
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setSubmitted(false);
        setSubmitMessage("");
    };

    // Submit Contact enquiry to backend
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (submitting) return;

        setSubmitting(true);
        setSubmitted(false);
        setSubmitMessage("");

        try {
            const response = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: form.fullName.trim(),
                    workEmail: form.email.trim(),
                    phoneNumber: form.phone.trim(),
                    companyName: form.company.trim(),
                    interest: form.interest,
                    message: form.message.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to submit your enquiry."
                );
            }

            setSubmitted(true);
            setSubmitMessage(
                data.message ||
                "Your enquiry has been submitted successfully."
            );

            setForm({ ...initialForm });
        } catch (error) {
            console.error("Contact form submission error:", error);

            setSubmitted(false);
            setSubmitMessage(
                error.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();

        event.currentTarget.style.setProperty(
            "--mx",
            `${event.clientX - rect.left}px`
        );

        event.currentTarget.style.setProperty(
            "--my",
            `${event.clientY - rect.top}px`
        );
    };

    return (
        <div ref={pageRef}>
            {/* CONTACT HERO */}
            <section
                className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden"
                aria-label="Contact hero"
            >
                <div className="absolute inset-0 hero-mesh"></div>

                <div className="orb w-[500px] h-[500px] bg-gm-teal/10 top-[-100px] right-[-100px]"></div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-gm-deep leading-[1.08] tracking-tight mb-6">
                            Let's{" "}
                            <span className="bg-gradient-to-r from-gm-teal via-gm-blue to-gm-green bg-clip-text text-transparent">
                                Talk
                            </span>
                        </h1>

                        <p className="text-lg text-gm-muted leading-relaxed">
                            Whether you're exploring AI adoption, need
                            research to inform a decision, want a product
                            demo, or are planning a digital initiative -
                            we'd like to hear about it.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTACT FORM + DIRECT CONTACT */}
            <section
                className="py-12 lg:py-20"
                aria-label="Contact form"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="contact-content grid lg:grid-cols-5 gap-12 lg:gap-16">
                        {/* FORM */}
                        <div className="lg:col-span-3 contact-reveal">
                            <div className="bg-white border border-gm-teal/10 rounded-3xl p-8 lg:p-10 shadow-sm">
                                <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-5">
                                    Send a Note
                                </span>

                                <h2 className="form-heading mb-4">
                                    Tell us what's
                                    <br />
                                    <em>on your mind.</em>
                                </h2>

                                <p className="form-sub text-gm-muted mb-8">
                                    A sentence about the problem, a sentence
                                    about your timeline, a sentence about you.
                                    That's enough to start. We'll reply with
                                    questions, not a pitch.
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        {/* NAME + EMAIL */}
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div>
                                                <label
                                                    htmlFor="full-name"
                                                    className="block text-sm font-semibold text-gm-deep mb-2"
                                                >
                                                    Full Name{" "}
                                                    <span className="text-red-500">*</span>
                                                </label>

                                                <input
                                                    type="text"
                                                    id="full-name"
                                                    name="fullName"
                                                    required
                                                    autoComplete="name"
                                                    placeholder="Your full name"
                                                    className="form-input w-full px-4 py-3 rounded-xl border border-gm-deep/10 text-sm"
                                                    value={form.fullName}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="work-email"
                                                    className="block text-sm font-semibold text-gm-deep mb-2"
                                                >
                                                    Work Email{" "}
                                                    <span className="text-red-500">*</span>
                                                </label>

                                                <input
                                                    type="email"
                                                    id="work-email"
                                                    name="email"
                                                    required
                                                    autoComplete="email"
                                                    placeholder="you@company.com"
                                                    className="form-input w-full px-4 py-3 rounded-xl border border-gm-deep/10 text-sm"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        {/* PHONE + COMPANY */}
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div>
                                                <label
                                                    htmlFor="phone"
                                                    className="block text-sm font-semibold text-gm-deep mb-2"
                                                >
                                                    Phone Number
                                                </label>

                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    autoComplete="tel"
                                                    placeholder="+91 98765 43210"
                                                    className="form-input w-full px-4 py-3 rounded-xl border border-gm-deep/10 text-sm"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="company"
                                                    className="block text-sm font-semibold text-gm-deep mb-2"
                                                >
                                                    Company Name
                                                </label>

                                                <input
                                                    type="text"
                                                    id="company"
                                                    name="company"
                                                    autoComplete="organization"
                                                    placeholder="Your company"
                                                    className="form-input w-full px-4 py-3 rounded-xl border border-gm-deep/10 text-sm"
                                                    value={form.company}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        {/* INTEREST */}
                                        <div>
                                            <label
                                                htmlFor="interest"
                                                className="block text-sm font-semibold text-gm-deep mb-2"
                                            >
                                                What Are You Interested In?{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <select
                                                id="interest"
                                                name="interest"
                                                required
                                                className="form-input w-full px-4 py-3 rounded-xl border border-gm-deep/10 text-sm bg-white"
                                                value={form.interest}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>
                                                    Select an area of interest
                                                </option>

                                                {interestOptions.map((option) => (
                                                    <option
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* MESSAGE */}
                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="block text-sm font-semibold text-gm-deep mb-2"
                                            >
                                                Message{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                placeholder="Tell us about your project, challenge, or question..."
                                                className="form-input w-full px-4 py-3 rounded-xl border border-gm-deep/10 text-sm resize-y"
                                                value={form.message}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* SUBMIT */}
                                        <div
                                            className="submit-magnet"
                                            id="submit-magnet"
                                        >
                                            <button
                                                type="submit"
                                                id="submit-btn"
                                                className="submit-btn"
                                                disabled={submitting}
                                            >
                                                {submitting
                                                    ? "Sending..."
                                                    : "Send Message"}

                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* SUCCESS / ERROR MESSAGE */}
                                        {submitMessage && (
                                            <p
                                                className={`text-sm ${submitted
                                                        ? "text-gm-teal"
                                                        : "text-red-600"
                                                    }`}
                                                role="status"
                                            >
                                                {submitMessage}
                                            </p>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* DIRECT CONTACT */}
                        <div className="lg:col-span-2 space-y-8 contact-reveal">
                            <aside className="cmethods">
                                <div className="cmethods__label">
                                    Or reach us directly
                                </div>

                                {contactMethods.map((method) => (
                                    <a
                                        href={method.href}
                                        key={method.kicker}
                                        className="cmethod"
                                        onMouseMove={handleMouseMove}
                                        target={
                                            method.href.startsWith("https")
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            method.href.startsWith("https")
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                    >
                                        <div className="cmethod__kicker">
                                            {method.kicker}
                                        </div>

                                        <div className="cmethod__value">
                                            {method.value}
                                            <span className="cmethod__arrow">
                                                →
                                            </span>
                                        </div>

                                        <div className="cmethod__note">
                                            {method.note}
                                        </div>
                                    </a>
                                ))}
                            </aside>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT HAPPENS NEXT */}
            <section
                className="ct-process"
                id="process"
                aria-label="What happens next"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="ct-process__head">
                        <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-5">
                            What Happens Next
                        </span>

                        <h2 className="ct-process__title">
                            After you <em>hit send.</em>
                        </h2>

                        <p className="ct-process__sub">
                            Three steps. No sales sequence. No "just circling
                            back" follow-ups you didn't ask for.
                        </p>
                    </div>

                    <div className="ct-process__track">
                        <div className="ct-process__line-wrap">
                            <div className="ct-process__line-bg"></div>

                            <div
                                className="ct-process__line-fill"
                                id="ct-process-line"
                            ></div>

                            <ol
                                className="ct-process__circles"
                                aria-label="Three steps"
                            >
                                {steps.map((step) => (
                                    <li
                                        key={step.number}
                                        className="ct-proc-circle"
                                        aria-hidden="true"
                                    >
                                        {step.number}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <ol className="ct-process__cards">
                            {steps.map((step) => (
                                <li
                                    key={step.number}
                                    className="ct-proc-card"
                                >
                                    <h3 className="ct-proc-card__title">
                                        {step.title}
                                    </h3>

                                    <p className="ct-proc-card__body">
                                        {step.description}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>
        </div>
    );
}
