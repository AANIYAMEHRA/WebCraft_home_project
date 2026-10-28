import { useRef, useState } from "react";
import { notify } from "./adminToast";
import ConfirmDialog from "./ConfirmDialog";
 
// Shared look for every admin page. Colours and fonts come from the live Webcraft-IT site.
export const COLORS = {
    navy: "#102a4f",
    text: "#253144",
    muted: "#5b6878",
    green: "#2aa27c",
    teal: "#1f8a86",
    blue: "#1b6f8c",
    border: "#d7ebe4",
    bg: "#f4faf8",
    red: "#dc2626",
};
 
export const FONT_HEADING = "'Fraunces', Georgia, 'Times New Roman', serif";
export const FONT_BODY = "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
 
// Heading scale, largest to smallest.
export const SIZE = {
    h1: "45px",       // page title
    h2: "30px",       // section title
    h3: "18px",       // list heading, e.g. "Service Cards"
    subtitle: "18px", // intro line under the title
    label: "16px",    // field labels
    body: "16px",     // inputs, buttons, messages
};
 
export const pageStyle = {
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
 
export const headingStyle = { fontFamily: FONT_HEADING, color: COLORS.navy };
export const labelStyle = { color: COLORS.text, fontSize: SIZE.label };
 
// Gradient text for "CMS". inline-block gives the gradient a box that covers the glyphs,
// and WebkitTextFillColor stops the text colour from hiding the gradient.
export const gradientTextStyle = {
    display: "inline-block",
    lineHeight: 1.15,
    paddingBottom: "0.1em",
    backgroundImage: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.green})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
};
 
export const inputClass =
    "w-full rounded-xl border bg-white px-4 py-3 outline-none transition placeholder:text-[#8a9aa9] focus:border-[#2aa27c] focus:ring-4 focus:ring-[#2aa27c]/20";
export const inputStyle = {
    borderColor: COLORS.border,
    color: COLORS.text,
    fontSize: SIZE.body,
};
 
export const primaryButtonStyle = {
    background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.teal})`,
    boxShadow: "0 8px 20px -8px rgba(31,138,134,0.55)",
    color: "#ffffff",
};
 
export const outlineButtonStyle = {
    borderColor: COLORS.border,
    color: COLORS.text,
    fontSize: SIZE.body,
};
 
export const secondaryButtonClass =
    "rounded-full border bg-white px-6 py-3 font-semibold transition hover:border-[#2aa27c] hover:text-[#1f8a86]";
export const removeButtonClass =
    "rounded-full border bg-white px-5 py-2.5 font-semibold transition hover:border-red-300 hover:text-red-600";
 
export const itemClass = "space-y-5 rounded-2xl p-6";
export const itemStyle = {
    backgroundColor: "#fbfdfc",
    border: `1px solid ${COLORS.border}`,
};
 
export const INPUT_GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2";
 
// True when a value has nothing in it.
export function isBlank(value) {
    return value === undefined || value === null || String(value).trim() === "";
}
 
// Labelled input. Pass required to show a red * for a mandatory field.
export function Field({ label, value, onChange, multiline = false, required = false }) {
    const common = {
        value: value ?? "",
        onChange: (event) => onChange(event.target.value),
        placeholder: `Enter ${label.toLowerCase()}`,
        className: inputClass,
        style: inputStyle,
    };
 
    return (
        <div>
            <label className="mb-2 block font-semibold" style={labelStyle}>
                {label}
                {required && <span style={{ color: COLORS.red }}> *</span>}
            </label>
 
            {multiline ? (
                <textarea rows={4} className={`${inputClass} resize-y`} {...common} />
            ) : (
                <input {...common} />
            )}
        </div>
    );
}
 
// Title row of an item card, with its Remove button.
export function ItemHeader({ title, onRemove }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <h4 className="font-bold" style={{ ...headingStyle, fontSize: SIZE.label }}>
                {title}
            </h4>
 
            <button
                type="button"
                onClick={onRemove}
                className={removeButtonClass}
                style={outlineButtonStyle}
            >
                Remove
            </button>
        </div>
    );
}
 
// Icon picker: a camera button when there is no icon, a pencil button when one is set.
// An uploaded SVG is read and its drawing path is stored, so no path text is typed.
export function IconUpload({ label = "SVG Icon", value, onChange, required = false }) {
    const inputRef = useRef(null);
    const [confirmingRemove, setConfirmingRemove] = useState(false);
 
    async function handleFile(event) {
        const file = event.target.files?.[0];
        event.target.value = "";
 
        if (!file) return;
 
        if (file.type !== "image/svg+xml" && !file.name.toLowerCase().endsWith(".svg")) {
            notify("error", "Please choose an SVG file.");
            return;
        }
 
        if (file.size > 70 * 1024) {
            notify("error", "Icon must be smaller than 70 KB.");
            return;
        }
 
        const text = await file.text();
        const doc = new DOMParser().parseFromString(text, "image/svg+xml");
        const paths = Array.from(doc.getElementsByTagName("path"))
            .map((path) => path.getAttribute("d")?.trim())
            .filter(Boolean);
 
        if (paths.length === 0) {
            notify("error", "No drawing path found in this SVG.");
            return;
        }
 
        onChange(paths.join(" "));
    }
 
    return (
        <div>
            <span className="mb-2 block font-semibold" style={labelStyle}>
                {label}
                {required && <span style={{ color: COLORS.red }}> *</span>}
            </span>
 
            <div className="flex items-center gap-4">
                <div
                    className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-white shadow-sm"
                    style={{ borderColor: COLORS.border }}
                >
                    {value ? (
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={COLORS.teal}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d={value} />
                        </svg>
                    ) : (
                        <span
                            className="text-center font-semibold"
                            style={{ color: COLORS.muted, fontSize: SIZE.body }}
                        >
                            No icon
                        </span>
                    )}
 
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        aria-label={value ? "Change icon" : "Upload icon"}
                        title={value ? "Change icon" : "Upload icon"}
                        className="absolute bottom-1.5 right-1.5 flex h-8 w-8 items-center justify-center rounded-full border bg-white shadow-md transition hover:brightness-95"
                        style={{ borderColor: COLORS.border, color: COLORS.teal }}
                    >
                        {value ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M4 7h3l2-3h6l2 3h3v12H4z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                        )}
                    </button>
                </div>
 
                <button
                    type="button"
                    onClick={() => setConfirmingRemove(true)}
                    disabled={!value}
                    className={`${secondaryButtonClass} disabled:cursor-not-allowed disabled:opacity-50`}
                    style={outlineButtonStyle}
                >
                    Remove
                </button>
            </div>
 
            <input
                ref={inputRef}
                type="file"
                accept=".svg,image/svg+xml"
                onChange={handleFile}
                className="hidden"
            />
 
            {confirmingRemove && (
                <ConfirmDialog
                    title="Remove icon?"
                    message="Are you sure you want to delete this icon? The change will be applied when you click Save Changes."
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={() => {
                        setConfirmingRemove(false);
                        onChange("");
                    }}
                    onCancel={() => setConfirmingRemove(false)}
                />
            )}
        </div>
    );
}
 
// Page title with the gradient "CMS" and the intro line under it.
export function PageTitle({ name, intro }) {
    return (
        <>
            <h1
                className="mb-5 font-bold leading-[0.95] tracking-tight"
                style={{ ...headingStyle, fontSize: SIZE.h1 }}
            >
                {name} <span style={gradientTextStyle}>CMS</span>
            </h1>
 
            <p className="mb-8" style={{ color: COLORS.muted, fontSize: SIZE.subtitle }}>
                {intro}
            </p>
        </>
    );
}
 
// The Save button, with the error and success messages beside it.
export function SaveBar({ saving, error, message }) {
    return (
        <div className="flex flex-wrap items-center gap-6">
            <button
                type="submit"
                disabled={saving}
                className="rounded-full px-10 py-4 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ ...primaryButtonStyle, fontSize: SIZE.body }}
            >
                {saving ? "Saving..." : "Save Changes"}
            </button>
 
            {error && (
                <p role="alert" className="font-semibold" style={{ color: COLORS.red, fontSize: SIZE.body }}>
                    {error}
                </p>
            )}
 
            {message && (
                <p role="status" className="font-semibold" style={{ color: COLORS.teal, fontSize: SIZE.body }}>
                    {message}
                </p>
            )}
        </div>
    );
}