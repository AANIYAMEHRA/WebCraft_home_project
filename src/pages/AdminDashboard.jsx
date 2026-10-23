
import { Link } from "react-router-dom";

const COLORS = {
    navy: "#102b52",
    border: "#d7ebe4",
    green: "#2aa27c",
    teal: "#1f8a86",
    mint: "#e8f6f1",
};

const FONT_HEADING = "'Fraunces', Georgia, 'Times New Roman', serif";

const CARDS = [
    {
        to: "/admin/header",
        title: "Header CMS",
        text: "Logo, navigation links and the contact button.",
    },
    {
        to: "/admin/home",
        title: "Home Page CMS",
        text: "Hero, statistics, services, products, AI stack and CTA.",
    },
    {
        to: "/admin/about",
        title: "About Page CMS",
        text: "Edit About page content, milestones, values and statistics.",
    },
    {
        to: "/admin/footer",
        title: "Footer CMS",
        text: "Footer text, tagline, email and bottom line.",
    },
];

export default function AdminDashboard() {
    return (
        <div>
            <p className="mb-8 text-[18px] text-[#5b6878]">
                Choose a section to edit. Use Save Changes in the top bar to save.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
                {CARDS.map((card) => (
                    <Link
                        key={card.to}
                        to={card.to}
                        className="group overflow-hidden rounded-3xl border bg-white transition hover:-translate-y-1"
                        style={{
                            borderColor: COLORS.border,
                            boxShadow: "0 10px 30px -15px rgba(15,36,64,0.15)",
                        }}
                    >
                        <div
                            className="flex items-center justify-between gap-4 px-8 py-5"
                            style={{
                                background: `linear-gradient(90deg, ${COLORS.mint}, #ffffff)`,
                                borderLeft: `6px solid ${COLORS.green}`,
                            }}
                        >
                            <span
                                className="font-bold leading-tight"
                                style={{
                                    fontFamily: FONT_HEADING,
                                    color: COLORS.navy,
                                    fontSize: "22px",
                                }}
                            >
                                {card.title}
                            </span>

                            <span
                                aria-hidden="true"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-1"
                                style={{
                                    background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.teal})`,
                                }}
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 6l6 6-6 6" />
                                </svg>
                            </span>
                        </div>

                        <p
                            className="border-t px-8 py-6 text-[16px] text-[#5b6878]"
                            style={{ borderColor: COLORS.border }}
                        >
                            {card.text}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
