import { useEffect, useRef, useState } from "react";
import { notify } from "../components/adminToast";
import ConfirmDialog from "../components/ConfirmDialog";
 
const API_URL = "http://localhost:5000/api/header";
 
// Colors and fonts taken from the live Webcraft-IT site (image 2).
const COLORS = {
    navy: "#102a4f",   // headings (hero "Smarter Decisions.")
    text: "#313f56",   // nav links, labels, input text
    muted: "#5b6878",  // subtitles and helper copy (hero paragraph)
    green: "#2aa27c",
    teal: "#1f8a86",
    blue: "#1b6f8c",   // gradient start (hero "Stronger Products.")
    border: "#d7ebe4",
    bg: "#f4faf8",
};
 
const FONT_HEADING = "'Fraunces', Georgia, 'Times New Roman', serif";
const FONT_BODY = "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
 
// Heading scale, largest to smallest (priority order).
const SIZE = {
    h1: "40px",       // page title   — "Header CMS"
    h2: "32px",       // section title — "Logo Settings", "Navigation Links"
    subtitle: "18px", // intro line under the title
    label: "16px",    // field labels
    body: "16px",     // inputs, nav links, buttons
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
 
// Gradient text for "CMS". inline-block gives the gradient a box that covers the glyphs,
// and WebkitTextFillColor stops the text color from hiding the gradient.
const gradientTextStyle = {
    display: "inline-block",
    lineHeight: 1.15,
    paddingBottom: "0.1em",
    backgroundImage: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.green})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
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
 
const secondaryButtonClass =
    "rounded-full border bg-white px-6 py-3 font-semibold transition hover:border-[#2aa27c] hover:text-[#1f8a86]";
 
const outlineButtonStyle = {
    borderColor: COLORS.border,
    color: COLORS.text,
    fontSize: SIZE.body,
};
 
export default function HeaderAdmin() {
    const [header, setHeader] = useState({
        logoUrl: "/logo.svg",
        links: [],
        contactText: "Contact Us",
        contactUrl: "/contact",
    });
 
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef(null);
    const [pendingRemove, setPendingRemove] = useState(null);
 
    useEffect(() => {
        async function loadHeader() {
            try {
                const response = await fetch(API_URL);
 
                if (!response.ok) {
                    throw new Error("Could not load header data.");
                }
 
                const data = await response.json();
 
                setHeader({
                    logoUrl: data.logoUrl ?? "/logo.svg",
                    links: Array.isArray(data.links) ? data.links : [],
                    contactText: data.contactText || "Contact Us",
                    contactUrl: data.contactUrl || "/contact",
                });
            } catch (error) {
                setMessage(
                    error.message ||
                        "Failed to load header. Please check the backend."
                );
                setMessageType("error");
            } finally {
                setLoading(false);
            }
        }
 
        loadHeader();
    }, []);
 
    function updateLink(index, field, value) {
        setHeader((current) => ({
            ...current,
            links: current.links.map((link, i) =>
                i === index ? { ...link, [field]: value } : link
            ),
        }));
    }
 
    function addLink() {
        setHeader((current) => ({
            ...current,
            links: [...current.links, { label: "", to: "/" }],
        }));
    }
 
    function removeLink(index) {
        setPendingRemove(index);
    }
 
    function confirmRemoveLink() {
        const index = pendingRemove;
        setPendingRemove(null);
 
        setHeader((current) => ({
            ...current,
            links: current.links.filter((_, i) => i !== index),
        }));
    }
 
    // Reads the chosen logo file and stores it as the logo.
    // Limited to 70 KB so the saved data stays under the backend's 100 KB request limit.
    function handleLogoFile(event) {
        const file = event.target.files?.[0];
        event.target.value = "";
 
        if (!file) return;
 
        if (!file.type.startsWith("image/")) {
            notify("error", "Please choose an image file.");
            return;
        }
 
        if (file.size > 70 * 1024) {
            notify("error", "Logo must be smaller than 70 KB.");
            return;
        }
 
        const reader = new FileReader();
        reader.onload = () =>
            setHeader((current) => ({
                ...current,
                logoUrl: reader.result,
            }));
        reader.readAsDataURL(file);
    }
 
    async function saveHeader(event) {
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
                body: JSON.stringify(header),
            });
 
            const data = await response.json();
 
            if (!response.ok) {
                throw new Error(data.message || "Failed to save header.");
            }
 
            if (data.header) {
                setHeader({
                    logoUrl: data.header.logoUrl ?? "/logo.svg",
                    links: Array.isArray(data.header.links)
                        ? data.header.links
                        : [],
                    contactText: data.header.contactText || "Contact Us",
                    contactUrl: data.header.contactUrl || "/contact",
                });
            }
 
            setMessage("Header updated successfully!");
            notify("success", "Header saved successfully!");
            setMessageType("success");
        } catch (error) {
            setMessage(error.message || "Failed to save header.");
            notify("error", error.message || "Failed to save header.");
            setMessageType("error");
        } finally {
            setSaving(false);
        }
    }
 
    if (loading) {
        return (
            <p className="p-6" style={{ ...pageStyle, fontSize: SIZE.body }}>
                Loading header settings...
            </p>
        );
    }
 
    return (
        <main className="min-h-screen px-6 py-16" style={pageStyle}>
            <div className="mx-auto max-w-5xl">
                <h1
                    className="mb-5 font-bold leading-[0.95] tracking-tight"
                    style={{ ...headingStyle, fontSize: SIZE.h1 }}
                >
                    Header <span style={gradientTextStyle}>CMS</span>
                </h1>
 
                <p
                    className="mb-14"
                    style={{ color: COLORS.muted, fontSize: SIZE.subtitle }}
                >
                    Edit your website's header content here.
                </p>
 
                {message && messageType === "error" && (
                    <p
                        role="alert"
                        aria-live="polite"
                        className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                        style={{ fontSize: SIZE.body }}
                    >
                        {message}
                    </p>
                )}
 
                <form id="admin-form" onSubmit={saveHeader} className="space-y-10">
                    <section className="rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="mb-8 font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            Logo Settings
                        </h2>
 
                        <div>
                            <label
                                htmlFor="logoUrl"
                                className="mb-2 block font-semibold"
                                style={{ color: COLORS.text, fontSize: SIZE.label }}
                            >
                                Logo URL
                            </label>
 
                            <div className="flex flex-wrap items-center gap-4">
                                <input
                                    id="logoUrl"
                                    type="text"
                                    readOnly
                                    placeholder="No logo added. Click Browse to add one."
                                    value={
                                        header.logoUrl.startsWith("data:")
                                            ? "Uploaded logo file"
                                            : header.logoUrl
                                    }
                                    className={`${inputClass} min-w-0 flex-1`}
                                    style={inputStyle}
                                />
 
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className={secondaryButtonClass}
                                    style={outlineButtonStyle}
                                >
                                    Browse
                                </button>
 
                                <button
                                    type="button"
                                    onClick={() =>
                                        setHeader((current) => ({
                                            ...current,
                                            logoUrl: "",
                                        }))
                                    }
                                    disabled={!header.logoUrl}
                                    className={`${secondaryButtonClass} disabled:cursor-not-allowed disabled:opacity-50`}
                                    style={outlineButtonStyle}
                                >
                                    Remove
                                </button>
 
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoFile}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </section>
 
                    <section className="rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="mb-8 font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            Navigation Links
                        </h2>
 
                        <div className="space-y-5">
                            {header.links.map((link, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto] md:items-center"
                                >
                                    <input
                                        aria-label={`Link ${index + 1} label`}
                                        placeholder="Label (e.g. About Us)"
                                        value={link.label || ""}
                                        onChange={(event) =>
                                            updateLink(
                                                index,
                                                "label",
                                                event.target.value
                                            )
                                        }
                                        className={inputClass}
                                        style={inputStyle}
                                    />
 
                                    <input
                                        aria-label={`Link ${index + 1} URL`}
                                        placeholder="URL (e.g. /about)"
                                        value={link.to || ""}
                                        onChange={(event) =>
                                            updateLink(
                                                index,
                                                "to",
                                                event.target.value
                                            )
                                        }
                                        className={inputClass}
                                        style={inputStyle}
                                    />
 
                                    <button
                                        type="button"
                                        onClick={() => removeLink(index)}
                                        className="shrink-0 rounded-full border bg-white px-6 py-3 font-semibold transition hover:border-red-300 hover:text-red-600"
                                        style={{
                                            borderColor: COLORS.border,
                                            color: COLORS.text,
                                            fontSize: SIZE.body,
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
 
                        <button
                            type="button"
                            onClick={addLink}
                            className={`mt-8 ${secondaryButtonClass}`}
                            style={{
                                borderColor: COLORS.border,
                                color: COLORS.text,
                                fontSize: SIZE.body,
                            }}
                        >
                            Add Link
                        </button>
                    </section>
 
                    <section className="rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="mb-8 font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            Contact Button Settings
                        </h2>
 
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="contactText"
                                    className="mb-2 block font-semibold"
                                    style={{ color: COLORS.text, fontSize: SIZE.label }}
                                >
                                    Contact Button Text
                                </label>
 
                                <input
                                    id="contactText"
                                    placeholder="Enter button text, e.g. Contact Us"
                                    type="text"
                                    value={header.contactText}
                                    onChange={(event) =>
                                        setHeader((current) => ({
                                            ...current,
                                            contactText: event.target.value,
                                        }))
                                    }
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
 
                            <div>
                                <label
                                    htmlFor="contactUrl"
                                    className="mb-2 block font-semibold"
                                    style={{ color: COLORS.text, fontSize: SIZE.label }}
                                >
                                    Contact Button URL
                                </label>
 
                                <input
                                    id="contactUrl"
                                    type="text"
                                    value={header.contactUrl}
                                    onChange={(event) =>
                                        setHeader((current) => ({
                                            ...current,
                                            contactUrl: event.target.value,
                                        }))
                                    }
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </section>
 
                    {/* Live preview: replicates the public header bar from the live site */}
                    <section className="rounded-3xl p-10" style={cardStyle}>
                        <h2
                            className="mb-8 font-bold leading-tight"
                            style={{ ...headingStyle, fontSize: SIZE.h2 }}
                        >
                            Live Preview
                        </h2>
 
                        <div className="flex flex-wrap items-center justify-between gap-8 rounded-2xl bg-white px-8 py-6">
                            {header.logoUrl ? (
                                <img
                                    src={header.logoUrl}
                                    alt="Webcraft-IT logo"
                                    className="h-12 w-auto"
                                    onError={(event) => {
                                        if (!event.currentTarget.src.endsWith("/logo.svg")) {
                                            event.currentTarget.src = "/logo.svg";
                                        } else {
                                            event.currentTarget.style.display = "none";
                                        }
                                    }}
                                />
                            ) : (
                                <span
                                    className="font-semibold"
                                    style={{ color: COLORS.muted, fontSize: SIZE.body }}
                                >
                                    No logo added yet
                                </span>
                            )}
 
                            <nav
                                className="flex flex-wrap items-center gap-14 font-medium"
                                style={{ fontSize: SIZE.body }}
                            >
                                {header.links.map((link, index) => (
                                    <span
                                        key={index}
                                        className="pb-2"
                                        style={
                                            index === 0
                                                ? {
                                                      color: COLORS.green,
                                                      borderBottom: `3px solid ${COLORS.green}`,
                                                  }
                                                : { color: COLORS.text }
                                        }
                                    >
                                        {link.label || "Untitled"}
                                    </span>
                                ))}
                            </nav>
 
                            <span
                                className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold"
                                style={{ ...primaryButtonStyle, fontSize: SIZE.body }}
                            >
                                {header.contactText} <span aria-hidden>→</span>
                            </span>
                        </div>
                    </section>
 
                    <div className="flex flex-wrap items-center gap-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-full px-10 py-4 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                            style={{ ...primaryButtonStyle, fontSize: SIZE.body }}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
 
                        {message && messageType === "success" && (
                            <p
                                role="status"
                                aria-live="polite"
                                className="font-semibold"
                                style={{ color: COLORS.teal, fontSize: SIZE.body }}
                            >
                                {message}
                            </p>
                        )}
                    </div>
                </form>
            </div>
            {pendingRemove !== null && (
                <ConfirmDialog
                    title="Remove navigation link?"
                    message={`Are you sure you want to delete "${header.links[pendingRemove]?.label || "this link"}" from the navigation menu? The change will be applied when you click Save Changes.`}
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={confirmRemoveLink}
                    onCancel={() => setPendingRemove(null)}
                />
            )}
        </main>
    );
}