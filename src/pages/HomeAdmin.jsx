
import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/home";

const DEFAULT_SERVICES = [
    {
        title: "AI Solutions",
        description: "",
        buttonText: "Learn More",
        buttonUrl: "/ai-solutions",
    },
    {
        title: "Research",
        description: "",
        buttonText: "Learn More",
        buttonUrl: "/research",
    },
    {
        title: "Products",
        description: "",
        buttonText: "Learn More",
        buttonUrl: "/products",
    },
    {
        title: "Engineering Services",
        description: "",
        buttonText: "Learn More",
        buttonUrl: "/services",
    },
];

const DEFAULT_WHAT_WE_DO = {
    label: "WHAT WE DO",
    heading: "Four Capabilities, One Partner",
    description:
        "We combine AI, research, products, and engineering services into a single, integrated offering — so everything works together.",
    services: DEFAULT_SERVICES,
};

export default function HomeAdmin() {
    const [form, setForm] = useState({
        heroChip: "",
        headingLine1: "",
        headingLine2: "",
        description: "",
        button1Text: "",
        button1Url: "",
        button2Text: "",
        button2Url: "",
        beliefLabel: "Our Belief",
        beliefHeading: "",
        beliefDescription: "",
        stats: [],
        whatWeDo: DEFAULT_WHAT_WE_DO,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadHome() {
            try {
                const response = await fetch(API);

                if (!response.ok) {
                    throw new Error("Failed to load Home content");
                }

                const data = await response.json();

                setForm({
                    heroChip: data.heroChip ?? "",
                    headingLine1: data.headingLine1 ?? "",
                    headingLine2: data.headingLine2 ?? "",
                    description: data.description ?? "",
                    button1Text: data.button1Text ?? "",
                    button1Url: data.button1Url ?? "",
                    button2Text: data.button2Text ?? "",
                    button2Url: data.button2Url ?? "",

                    beliefLabel: data.beliefLabel ?? "Our Belief",
                    beliefHeading:
                        data.beliefHeading ??
                        "We listen before we propose. We prototype before we commit.",
                    beliefDescription:
                        data.beliefDescription ??
                        "We'd rather spend three months in research than three years rebuilding. It's a slower way to work. It's also the way that's kept us here since 2006 — and kept our clients with us long after the first engagement ended.",

                    stats: Array.isArray(data.stats) ? data.stats : [],

                    whatWeDo: {
                        label:
                            data.whatWeDo?.label ??
                            DEFAULT_WHAT_WE_DO.label,
                        heading:
                            data.whatWeDo?.heading ??
                            DEFAULT_WHAT_WE_DO.heading,
                        description:
                            data.whatWeDo?.description ??
                            DEFAULT_WHAT_WE_DO.description,
                        services:
                            Array.isArray(data.whatWeDo?.services) &&
                                data.whatWeDo.services.length > 0
                                ? data.whatWeDo.services.map((service) => ({
                                    title: service.title ?? "",
                                    description:
                                        service.description ?? "",
                                    buttonText:
                                        service.buttonText ?? "Learn More",
                                    buttonUrl: service.buttonUrl ?? "",
                                }))
                                : DEFAULT_SERVICES.map((service) => ({
                                    ...service,
                                })),
                    },
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadHome();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleStatChange(index, field, value) {
        setForm((previous) => ({
            ...previous,
            stats: previous.stats.map((stat, i) =>
                i === index
                    ? { ...stat, [field]: value }
                    : stat
            ),
        }));
    }

    function handleWhatWeDoChange(field, value) {
        setForm((previous) => ({
            ...previous,
            whatWeDo: {
                ...previous.whatWeDo,
                [field]: value,
            },
        }));
    }

    function handleServiceChange(index, field, value) {
        setForm((previous) => ({
            ...previous,
            whatWeDo: {
                ...previous.whatWeDo,
                services: previous.whatWeDo.services.map(
                    (service, i) =>
                        i === index
                            ? { ...service, [field]: value }
                            : service
                ),
            },
        }));
    }

    function addService() {
        setForm((previous) => ({
            ...previous,
            whatWeDo: {
                ...previous.whatWeDo,
                services: [
                    ...previous.whatWeDo.services,
                    {
                        title: "",
                        description: "",
                        buttonText: "Learn More",
                        buttonUrl: "",
                    },
                ],
            },
        }));
    }

    function removeService(index) {
        setForm((previous) => ({
            ...previous,
            whatWeDo: {
                ...previous.whatWeDo,
                services: previous.whatWeDo.services.filter(
                    (_, i) => i !== index
                ),
            },
        }));
    }


    async function handleSubmit(event) {
        event.preventDefault();

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const response = await fetch(API, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to save Home content"
                );
            }

            // Refresh the form using the saved response.
            const savedHome = data.home || data;

            setForm((previous) => ({
                ...previous,
                ...savedHome,
                whatWeDo: {
                    ...previous.whatWeDo,
                    ...(savedHome.whatWeDo || {}),
                    services:
                        savedHome.whatWeDo?.services ||
                        previous.whatWeDo.services,
                },
            }));

            setMessage("Home content updated successfully!");
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }


    if (loading) {
        return <p className="p-8">Loading Home CMS...</p>;
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Home Page CMS
                </h1>

                <p className="mb-8 text-gray-600">
                    Edit your Home page content from one place.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* HERO CONTENT */}
                    <section className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold">
                            Hero Content
                        </h2>

                        {[
                            ["heroChip", "Small Label"],
                            ["headingLine1", "Heading Line 1"],
                            ["headingLine2", "Heading Line 2"],
                            ["description", "Description"],
                            ["button1Text", "First Button Text"],
                            ["button1Url", "First Button URL"],
                            ["button2Text", "Second Button Text"],
                            ["button2Url", "Second Button URL"],
                            ["beliefLabel", "Belief - Small Label"],
                            ["beliefHeading", "Belief - Heading"],
                            [
                                "beliefDescription",
                                "Belief - Description",
                            ],
                        ].map(([name, label]) => (
                            <div key={name}>
                                <label
                                    htmlFor={name}
                                    className="mb-1 block text-sm font-medium text-gray-700"
                                >
                                    {label}
                                </label>

                                {[
                                    "description",
                                    "beliefDescription",
                                ].includes(name) ? (
                                    <textarea
                                        id={name}
                                        name={name}
                                        value={form[name]}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                ) : (
                                    <input
                                        id={name}
                                        name={name}
                                        value={form[name]}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                )}
                            </div>
                        ))}
                    </section>

                    {/* HERO STATISTICS */}
                    <section className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold">
                            Hero Statistics
                        </h2>

                        {form.stats.map((stat, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 gap-3 border-b border-gray-200 pb-4 sm:grid-cols-3"
                            >
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Value
                                    </label>
                                    <input
                                        type="number"
                                        value={stat.value ?? ""}
                                        onChange={(e) =>
                                            handleStatChange(
                                                index,
                                                "value",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Suffix
                                    </label>
                                    <input
                                        value={stat.suffix ?? ""}
                                        onChange={(e) =>
                                            handleStatChange(
                                                index,
                                                "suffix",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Label
                                    </label>
                                    <input
                                        value={stat.label ?? ""}
                                        onChange={(e) =>
                                            handleStatChange(
                                                index,
                                                "label",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* WHAT WE DO SECTION */}
                    <section className="space-y-6 rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            What We Do Section
                        </h2>

                        <div>
                            <label
                                htmlFor="whatWeDoLabel"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Section Label
                            </label>

                            <input
                                id="whatWeDoLabel"
                                value={form.whatWeDo.label}
                                onChange={(e) =>
                                    handleWhatWeDoChange(
                                        "label",
                                        e.target.value
                                    )
                                }
                                placeholder="WHAT WE DO"
                                className="w-full rounded-lg border border-gray-300 px-3 py-3"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="whatWeDoHeading"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Main Heading
                            </label>

                            <input
                                id="whatWeDoHeading"
                                value={form.whatWeDo.heading}
                                onChange={(e) =>
                                    handleWhatWeDoChange(
                                        "heading",
                                        e.target.value
                                    )
                                }
                                placeholder="Four Capabilities, One Partner"
                                className="w-full rounded-lg border border-gray-300 px-3 py-3"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="whatWeDoDescription"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Section Description
                            </label>

                            <textarea
                                id="whatWeDoDescription"
                                value={form.whatWeDo.description}
                                onChange={(e) =>
                                    handleWhatWeDoChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                                rows={4}
                                placeholder="We combine AI, research, products, and engineering services into a single, integrated offering — so everything works together."
                                className="w-full rounded-lg border border-gray-300 px-3 py-3"
                            />
                        </div>

                        {/* SERVICE CARDS */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Service Cards (
                                {form.whatWeDo.services.length})
                            </h3>

                            {form.whatWeDo.services.map(
                                (service, index) => (
                                    <div
                                        key={index}
                                        className="space-y-4 rounded-xl border border-gray-200 p-5"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <h4 className="font-semibold text-gray-800">
                                                Service {index + 1}
                                            </h4>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeService(index)
                                                }
                                                className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor={`serviceTitle-${index}`}
                                                className="mb-1 block text-sm font-medium text-gray-700"
                                            >
                                                Service Title
                                            </label>

                                            <input
                                                id={`serviceTitle-${index}`}
                                                value={service.title}
                                                onChange={(e) =>
                                                    handleServiceChange(
                                                        index,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Service title"
                                                className="w-full rounded-lg border border-gray-300 px-3 py-3"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor={`serviceDescription-${index}`}
                                                className="mb-1 block text-sm font-medium text-gray-700"
                                            >
                                                Service Description
                                            </label>

                                            <textarea
                                                id={`serviceDescription-${index}`}
                                                value={service.description}
                                                onChange={(e) =>
                                                    handleServiceChange(
                                                        index,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                rows={3}
                                                placeholder="Enter the original service description"
                                                className="w-full rounded-lg border border-gray-300 px-3 py-3"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor={`serviceButtonText-${index}`}
                                                className="mb-1 block text-sm font-medium text-gray-700"
                                            >
                                                Button Text
                                            </label>

                                            <input
                                                id={`serviceButtonText-${index}`}
                                                value={service.buttonText}
                                                onChange={(e) =>
                                                    handleServiceChange(
                                                        index,
                                                        "buttonText",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Learn More"
                                                className="w-full rounded-lg border border-gray-300 px-3 py-3"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor={`serviceButtonUrl-${index}`}
                                                className="mb-1 block text-sm font-medium text-gray-700"
                                            >
                                                Button URL
                                            </label>

                                            <input
                                                id={`serviceButtonUrl-${index}`}
                                                value={service.buttonUrl}
                                                onChange={(e) =>
                                                    handleServiceChange(
                                                        index,
                                                        "buttonUrl",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="/services"
                                                className="w-full rounded-lg border border-gray-300 px-3 py-3"
                                            />
                                        </div>
                                    </div>
                                )
                            )}

                            <button
                                type="button"
                                onClick={addService}
                                className="rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-800 hover:bg-gray-50"
                            >
                                + Add Service
                            </button>
                        </div>
                    </section>

                    {/* SAVE */}
                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-black px-6 py-3 font-medium text-white disabled:opacity-60"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                        {error && (
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        {message && (
                            <p className="text-sm text-green-700">
                                {message}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </main>
    );
}
