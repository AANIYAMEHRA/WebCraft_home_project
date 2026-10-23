// Shows a message in the top-right corner of the admin layout.
// Usage: notify("success", "Header saved successfully!") or notify("error", "Something failed").
export function notify(type, text) {
    window.dispatchEvent(
        new CustomEvent("admin-toast", { detail: { type, text } })
    );
}
 