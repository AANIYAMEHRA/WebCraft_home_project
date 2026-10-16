
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/footer";

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
        return <p className="p-6">Loading footer...</p>;
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

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Footer CMS
                </h1>

                <p className="mb-8 text-gray-600">
                    Edit your website footer content here.
                </p>

                <form onSubmit={saveFooter} className="space-y-6">
                    <section className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="mb-5 text-xl font-semibold text-gray-900">
                            Footer Content
                        </h2>

                        <div className="space-y-4">
                            {textFields.map(([key, value]) => (
                                <div key={key}>
                                    <label
                                        htmlFor={`footer-${key}`}
                                        className="mb-1 block text-sm font-medium text-gray-700"
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
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Save button and status message on the same line */}
                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-black px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
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
                                className={`text-sm font-medium ${
                                    messageType === "success"
                                        ? "text-green-700"
                                        : "text-red-600"
                                }`}
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
