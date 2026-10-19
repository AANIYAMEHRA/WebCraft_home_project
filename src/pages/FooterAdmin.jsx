import { useEffect, useState } from "react";
 
const API_URL = "http://localhost:5000/api/footer";
 
// Colors and fonts taken from the live Webcraft-IT site.
const COLORS = {
    navy: "#0c1f3a",      // headings (hero "Smarter Decisions.")
    text: "#1e293b",      // labels, input text
    muted: "#5b6878",     // subtitle and helper copy
    green: "#2aa27c",
    teal: "#1f8a86",
    blue: "#1b6f8c",      // gradient start (hero "Stronger Products.")
    border: "#d7ebe4",
    bg: "#f4faf8",
};
 
// Footer colors, sampled from the live site's footer.
const FOOTER = {
    bg: "#091f48",
    glow: "#1b4962",
    mint: "#6ee7b7",
    white: "#ffffff",
    soft: "rgba(226,232,240,0.72)",
    faint: "rgba(226,232,240,0.5)",
    line: "rgba(50, 40, 40, 0.12)",
};
 
const FONT_HEADING = "'Fraunces', Georgia, 'Times New Roman', serif";
const FONT_BODY = "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, 'Courier New', monospace";
 
// Heading scale, largest to smallest (priority order).
const SIZE = {
    h1: "65px",       // page title   — "Footer CMS"
    h2: "40px",       // section title — "Footer Content"
    subtitle: "24px", // intro line under the title
    label: "18px",    // field labels
    body: "18px",     // inputs, buttons, messages
};
 
const pageStyle = {
    backgroundColor: COLORS.bg,
    backgroundImage: [
        "radial-gradient(circle at 0% 0%, rgba(42,162,124,0.10), transparent 40%)",
        "linear-gradient(rgba(15,36,64,0.035) 1px, transparent 1px)",
        "linear-gradient(90deg, rgba(15,36,64,0.035) 1px, transparent 1px)",
    ].join(", "),
    backgroundSize: "auto, 56px 56px, 56px 56px",
    fontFamily: FONT_BODY,
    color: COLORS.text,
};
 
const headingStyle = { fontFamily: FONT_HEADING, color: COLORS.navy };
 
const gradientTextStyle = {
    backgroundImage: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.green})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
};
 
const cardStyle = {
    backgroundColor: "#ffffff",
    border: `1px solid ${COLORS.border}`,
    boxShadow: "0 10px 30px -15px rgba(15,36,64,0.15)",
};
 
const inputClass =
    "w-full rounded-xl border bg-white px-4 py-3 outline-none transition placeholder:text-[#8a9aa9] focus:border-[#2aa27c] focus:ring-4 focus:ring-[#2aa27c]/20";
const inputStyle = {
    borderColor: COLORS.border,
    color: COLORS.text,
    fontSize: SIZE.body,
};
 
const primaryButtonStyle = {
    background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.teal})`,
    boxShadow: "0 8px 20px -8px rgba(31,138,134,0.55)",
    color: "#ffffff",
};
 
export default function FooterAdmin() {
    const [footer, setFooter] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
 
    useEffect(() => {
        async function loadFooter() {
            try {
                const response = await fetch(API_URL);
 
                if (!response.ok) {
                    throw new Error(
                        "Failed to load footer. Please check the backend."
                    );
                }
 
                const data = await response.json();
                setFooter(data.footer || data);
            } catch (error) {
                setMessage(
                    error.message ||
                        "Failed to load footer. Please check the backend."
                );
                setMessageType("error");
            } finally {
                setLoading(false);
            }
        }
 
        loadFooter();
    }, []);
 
    function updateField(field, value) {
        setFooter((current) => ({
            ...current,
            [field]: value,
        }));
    }
 
    async function saveFooter(event) {
        event.preventDefault();
 
        setSaving(true);
        setMessage("");
        setMessageType("");
 
        try {
            const response = await fetch(API_URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(footer),
            });
 
            const data = await response.json();
 
            if (!response.ok) {
                throw new Error(data.message || "Failed to save footer.");
            }
 
            if (data.footer) {
                setFooter(data.footer);
            }
 
            setMessage("Footer updated successfully!");
            setMessageType("success");
        } catch (error) {
            setMessage(`Failed to save footer: ${error.message}`);
            setMessageType("error");
        } finally {
            setSaving(false);
        }
    }
 
    if (loading) {
        return (
            <p className="p-6" style={{ ...pageStyle, fontSize: SIZE.body }}>
                Loading footer...
            </p>
        );
    }
 
    const excludedFields = [
        "_id",
        "__v",
        "createdAt",
        "updatedAt",
    ];
 
    const textFields = Object.entries(footer).filter(
        ([key, value]) =>
            typeof value === "string" &&
            !excludedFields.includes(key)
    );
 
    // Preview values, read from the same fields the form edits.
    const preview = Object.fromEntries(textFields);
 
    return (
        <main className="min-h-screen px-6 py-16" style={pageStyle}>
            <div className="mx-auto max-w-5xl">
                <h1
                    className="mb-5 font-bold leading-[0.95] tracking-tight"
                    style={{ ...headingStyle, fontSize: SIZE.h1 }}
                >
                    Footer <span style={gradientTextStyle}>CMS</span>
                </h1>
 
                <p
                    className="mb-14"
                    style={{ color: COLORS.muted, fontSize: SIZE.subtitle }}
                >
                    Edit your website footer content here.
                </p>
 
                <form onSubmit={saveFooter} className="space-y-10">
                    <section className="rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="mb-8 font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            Footer Content
                        </h2>
 
                        <div className="space-y-6">
                            {textFields.map(([key, value]) => (
                                <div key={key}>
                                    <label
                                        htmlFor={`footer-${key}`}
                                        className="mb-2 block font-semibold"
                                        style={{ color: COLORS.text, fontSize: SIZE.label }}
                                    >
                                        {key
                                            .replace(/([A-Z])/g, " $1")
                                            .replace(/^./, (char) =>
                                                char.toUpperCase()
                                            )}
                                    </label>
 
                                    <input
                                        id={`footer-${key}`}
                                        type="text"
                                        value={value}
                                        onChange={(event) =>
                                            updateField(
                                                key,
                                                event.target.value
                                            )
                                        }
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
 
                    {/* Live preview: matches the dark footer on the live site */}
                    <section className="rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="mb-8 font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            Live Preview
                        </h2>
 
                        <div
                            className="rounded-2xl px-10 py-14"
                            style={{
                                background: `linear-gradient(135deg, ${FOOTER.glow} 0%, ${FOOTER.bg} 45%, ${FOOTER.bg} 100%)`,
                            }}
                        >
                            {preview.kicker && (
                                <p
                                    className="mb-8 uppercase tracking-[0.35em]"
                                    style={{
                                        color: FOOTER.mint,
                                        fontFamily: FONT_MONO,
                                        fontSize: "16px",
                                    }}
                                >
                                    {preview.kicker}
                                </p>
                            )}
 
                            <h3
                                className="font-bold leading-[1.05]"
                                style={{
                                    fontFamily: FONT_HEADING,
                                    color: FOOTER.white,
                                    fontSize: "72px",
                                }}
                            >
                                {preview.heading}
                                {preview.heading && preview.headingEmphasis ? " " : ""}
                                {preview.headingEmphasis && (
                                    <em style={{ color: FOOTER.mint }}>
                                        {preview.headingEmphasis}
                                    </em>
                                )}
                            </h3>
 
                            {preview.email && (
                                <p
                                    className="mt-10 font-semibold italic"
                                    style={{
                                        fontFamily: FONT_HEADING,
                                        color: FOOTER.white,
                                        fontSize: "36px",
                                    }}
                                >
                                    {preview.email}{" "}
                                    <span style={{ color: FOOTER.mint }}>→</span>
                                </p>
                            )}
 
                            <div
                                className="mt-14 border-t pt-8"
                                style={{ borderColor: FOOTER.line }}
                            >
                                {preview.brandTagline && (
                                    <p
                                        className="text-[20px]"
                                        style={{ color: FOOTER.soft }}
                                    >
                                        {preview.brandTagline}
                                    </p>
                                )}
 
                                {preview.bottomText && (
                                    <p
                                        className="mt-8 uppercase tracking-[0.2em]"
                                        style={{
                                            color: FOOTER.faint,
                                            fontFamily: FONT_MONO,
                                            fontSize: "14px",
                                        }}
                                    >
                                        © 2026 {preview.bottomText}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
 
                    {/* Save button and status message on the same line */}
                    <div className="flex flex-wrap items-center gap-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-full px-10 py-4 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                            style={{ ...primaryButtonStyle, fontSize: SIZE.body }}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
 
                        {message && (
                            <p
                                role={
                                    messageType === "error"
                                        ? "alert"
                                        : "status"
                                }
                                aria-live="polite"
                                className="font-semibold"
                                style={{
                                    color:
                                        messageType === "success"
                                            ? COLORS.teal
                                            : "#dc2626",
                                    fontSize: SIZE.body,
                                }}
                            >
                                {message}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </main>
    );
}
 