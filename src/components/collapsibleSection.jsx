import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
 
const COLORS = {
    navy: "#102b52",
    border: "#d7ebe4",
    green: "#2aa27c",
    teal: "#1f8a86",
    mint: "#e8f6f1",
};
 
const FONT_HEADING = "'Fraunces', Georgia, 'Times New Roman', serif";
 
// A collapsible section of a CMS page.
// It opens when its name is clicked in the sidebar (URL ends with #id),
// or when the user clicks its header. It closes when Home Page CMS is clicked again.
export default function CollapsibleSection({ id, title, children }) {
    const location = useLocation();
    const linked = location.hash === `#${id}`;
    const [open, setOpen] = useState(linked);
 
    // Clicking the sidebar sub-item opens this section, even if it was closed before.
    useEffect(() => {
        if (linked) setOpen(true);
    }, [linked, location.key]);
 
    // Clicking Home Page CMS again in the sidebar closes every section.
    useEffect(() => {
        const collapse = () => setOpen(false);
        window.addEventListener("home-sections-collapse", collapse);
        return () =>
            window.removeEventListener("home-sections-collapse", collapse);
    }, []);
 
    return (
        <div
            id={id}
            className="scroll-mt-28 overflow-hidden rounded-3xl border bg-white"
            style={{
                borderColor: COLORS.border,
                boxShadow: "0 10px 30px -15px rgba(15,36,64,0.15)",
            }}
        >
            <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
                className="flex w-full items-center justify-between gap-6 px-8 py-5 text-left transition hover:brightness-[0.98]"
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
                        fontSize: "20px",
                    }}
                >
                    {title}
                </span>
 
                <span
                    aria-hidden="true"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                    }`}
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
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </span>
            </button>
 
            {open && (
                <div
                    className="space-y-6 border-t p-8"
                    style={{ borderColor: COLORS.border }}
                >
                    {children}
                </div>
            )}
        </div>
    );
}