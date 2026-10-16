
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/header";

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

    useEffect(() => {
        async function loadHeader() {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error("Could not load header data.");
                }

                const data = await response.json();

                setHeader({
                    logoUrl: data.logoUrl || "/logo.svg",
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
        setHeader((current) => ({
            ...current,
            links: current.links.filter((_, i) => i !== index),
        }));
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
                    logoUrl: data.header.logoUrl || "/logo.svg",
                    links: Array.isArray(data.header.links)
                        ? data.header.links
                        : [],
                    contactText: data.header.contactText || "Contact Us",
                    contactUrl: data.header.contactUrl || "/contact",
                });
            }

            setMessage("Header updated successfully!");
            setMessageType("success");
        } catch (error) {
            setMessage(error.message || "Failed to save header.");
            setMessageType("error");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <p className="p-6 text-gray-700">
                Loading header settings...
            </p>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Header CMS
                </h1>

                <p className="mb-8 text-gray-600">
                    Edit your website's header content here.
                </p>

                {message && messageType === "error" && (
                    <p
                        role="alert"
                        aria-live="polite"
                        className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                    >
                        {message}
                    </p>
                )}

                <form onSubmit={saveHeader} className="space-y-6">
                    <section className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="mb-5 text-xl font-semibold text-gray-900">
                            Logo Settings
                        </h2>

                        <div>
                            <label
                                htmlFor="logoUrl"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Logo URL
                            </label>

                            <input
                                id="logoUrl"
                                type="text"
                                value={header.logoUrl}
                                onChange={(event) =>
                                    setHeader((current) => ({
                                        ...current,
                                        logoUrl: event.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
                            />
                        </div>
                    </section>

                    <section className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="mb-5 text-xl font-semibold text-gray-900">
                            Navigation Links
                        </h2>

                        <div className="space-y-4">
                            {header.links.map((link, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"
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
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
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
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeLink(index)}
                                        className="shrink-0 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={addLink}
                            className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            + Add Link
                        </button>
                    </section>

                    <section className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="mb-5 text-xl font-semibold text-gray-900">
                            Contact Button Settings
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="contactText"
                                    className="mb-1 block text-sm font-medium text-gray-700"
                                >
                                    Contact Button Text
                                </label>

                                <input
                                    id="contactText"
                                    type="text"
                                    value={header.contactText}
                                    onChange={(event) =>
                                        setHeader((current) => ({
                                            ...current,
                                            contactText: event.target.value,
                                        }))
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="contactUrl"
                                    className="mb-1 block text-sm font-medium text-gray-700"
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
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                        {message && messageType === "success" && (
                            <p
                                role="status"
                                aria-live="polite"
                                className="text-sm font-medium text-green-700"
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
