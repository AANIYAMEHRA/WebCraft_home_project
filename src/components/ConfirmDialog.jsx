const COLORS = {
    navy: "#102b52",
    text: "#253144",
    muted: "#5b6878",
    border: "#d7ebe4",
    green: "#2aa27c",
    teal: "#1f8a86",
    mint: "#e8f6f1",
};
 
const FONT_HEADING = "'Fraunces', Georgia, 'Times New Roman', serif";
const FONT_BODY = "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
 
// A warning dialog that asks the user to confirm an action.
export default function ConfirmDialog({
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f2452]/40 px-6 backdrop-blur-sm"
            onClick={onCancel}
            role="presentation"
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                aria-describedby="confirm-message"
                onClick={(event) => event.stopPropagation()}
                className="w-full max-w-md overflow-hidden rounded-3xl border bg-white"
                style={{
                    borderColor: COLORS.border,
                    boxShadow: "0 25px 60px -15px rgba(15,36,64,0.35)",
                    fontFamily: FONT_BODY,
                }}
            >
                <div
                    className="flex items-center gap-4 px-6 py-3"
                    style={{
                        background: `linear-gradient(90deg, ${COLORS.mint}, #ffffff)`,
                        borderLeft: `6px solid ${COLORS.green}`,
                    }}
                >
                    <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-[20px] font-bold text-white"
                    >
                        !
                    </span>
 
                    <h2
                        id="confirm-title"
                        className="font-bold leading-tight"
                        style={{
                            fontFamily: FONT_HEADING,
                            color: COLORS.navy,
                            fontSize: "20px",
                        }}
                    >
                        {title}
                    </h2>
                </div>
 
                <div className="border-t px-6 py-4" style={{ borderColor: COLORS.border }}>
                    <p
                        id="confirm-message"
                        className="text-[16px] leading-relaxed"
                        style={{ color: COLORS.muted }}
                    >
                        {message}
                    </p>
 
                    <div className="mt-5 flex flex-wrap justify-end gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-full border bg-white px-6 py-3 text-[16px] font-semibold transition hover:border-[#2aa27c] hover:text-[#1f8a86]"
                            style={{ borderColor: COLORS.border, color: COLORS.text }}
                        >
                            {cancelText}
                        </button>
 
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="rounded-full px-6 py-3 text-[16px] font-semibold text-white transition hover:brightness-110"
                            style={{
                                background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.teal})`,
                                boxShadow: "0 8px 20px -8px rgba(31,138,134,0.55)",
                            }}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}