
import { useEffect, useState } from "react";
import { notify } from "../components/adminToast";
import CollapsibleSection from "../components/CollapsibleSection";
import {
    INPUT_GRID,
    PageTitle,
    SIZE,
    SaveBar,
    Field,
    headingStyle,
    itemClass,
    itemStyle,
    pageStyle,
    secondaryButtonClass,
    outlineButtonStyle,
} from "../components/AdminUi";

const API = "http://localhost:5000/api/products";

const DEFAULT_FORM = {
    hero: {
        label: "Our Products",
        headingLine1: "Platforms Built From",
        headingLine2: "Real Experience",
        description:
            "Ready-to-deploy software products - HRMS, TutorWand, and WCSchool ERP - built from years of domain expertise and client feedback.",
        buttonText: "Start a Conversation",
        buttonUrl: "/contact",
    },

    products: [
        {
            num: "01",
            productLabel: "Product",
            name: "Webcraft HRMS",
            description:
                "Complete human resource management - attendance, leave, payroll, self-service portal, and role-based security. Designed for mid-size organizations that need enterprise-grade features without enterprise-grade complexity.",
            price: "₹2,999",
            priceNote: "/mo flat server cost · No per-user fees",
            buttonText: "Request a Demo",
            buttonUrl: "/contact",
            features: [
                { title: "Attendance", description: "Biometric, geo-fenced, and mobile clock-in/out" },
                { title: "Leave Management", description: "Configurable policies and approval workflows" },
                { title: "Payroll", description: "Automated calculation with statutory compliance" },
                { title: "Self-Service Portal", description: "Employees manage their own records and requests" },
            ],
            stats: [],
        },
        {
            num: "02",
            productLabel: "Product",
            name: "TutorWand",
            description:
                "AI-powered adaptive test preparation for SAT, GRE, and competitive exams. Personalized learning paths, intelligent question selection, performance analytics, and white-label options for coaching institutes.",
            price: "",
            priceNote: "",
            buttonText: "Request a Demo",
            buttonUrl: "/contact",
            features: [],
            stats: [
                { value: "40K+", label: "Students" },
                { value: "2.7K+", label: "Teachers" },
                { value: "5000+", label: "Questions" },
                { value: "50+", label: "Institutes" },
            ],
        },
        {
            num: "03",
            productLabel: "Product",
            name: "WCSchool ERP",
            description:
                "Comprehensive school management platform - fee management, class scheduling, examination management, parent monitoring, and seamless communication between schools, parents, and students.",
            price: "",
            priceNote: "",
            buttonText: "Request a Demo",
            buttonUrl: "/contact",
            features: [
                { title: "Fee Management", description: "Online payments, tracking, and automated reminders" },
                { title: "Exam Management", description: "Scheduling, grading, and report card generation" },
                { title: "Parent Portal", description: "Real-time visibility into attendance and progress" },
                { title: "Communication", description: "Notices, messaging, and event management" },
            ],
            stats: [],
        },
    ],

    cta: {
        label: "Request Access",
        headingLine1: "Interested in a",
        headingLine2: "product demo?",
        description:
            "Select 'Product Demo' when you reach out and we'll set up a guided walkthrough.",
        buttonText: "Request a Demo",
        buttonUrl: "/contact",
    },
};

function mergeForm(data = {}) {
    const products = Array.isArray(data.products)
        ? data.products
        : DEFAULT_FORM.products;

    return {
        hero: {
            ...DEFAULT_FORM.hero,
            ...(data.hero || {}),
        },

        products: products.map((product, index) => ({
            ...(DEFAULT_FORM.products[index] || {
                num: "",
                productLabel: "Product",
                name: "",
                description: "",
                price: "",
                priceNote: "",
                buttonText: "Request a Demo",
                buttonUrl: "/contact",
                features: [],
                stats: [],
            }),
            ...product,
            productLabel: product.productLabel ?? "",
            buttonText: product.buttonText ?? "",
            buttonUrl: product.buttonUrl ?? "",
            features: Array.isArray(product.features)
                ? product.features.map((item) => ({ ...item }))
                : [],
            stats: Array.isArray(product.stats)
                ? product.stats.map((item) => ({ ...item }))
                : [],
        })),

        cta: {
            ...DEFAULT_FORM.cta,
            ...(data.cta || {}),
        },
    };
}

export default function ProductsAdmin() {
    const [form, setForm] = useState(() => mergeForm());
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadContent() {
            try {
                const response = await fetch(API);

                if (!response.ok) {
                    throw new Error("Failed to load Products content");
                }

                const data = await response.json();

                if (active) {
                    setForm(mergeForm(data.content || data));
                }
            } catch (err) {
                if (active) {
                    setError(err.message || "Failed to load Products content");
                }
            } finally {
                if (active) setLoading(false);
            }
        }

        loadContent();

        return () => {
            active = false;
        };
    }, []);

    function setHero(key, value) {
        setForm((previous) => ({
            ...previous,
            hero: { ...previous.hero, [key]: value },
        }));
    }

    function setCta(key, value) {
        setForm((previous) => ({
            ...previous,
            cta: { ...previous.cta, [key]: value },
        }));
    }

    function setProduct(index, changes) {
        setForm((previous) => ({
            ...previous,
            products: previous.products.map((product, i) =>
                i === index ? { ...product, ...changes } : product
            ),
        }));
    }

    function setProductItem(productIndex, listKey, itemIndex, changes) {
        setForm((previous) => ({
            ...previous,
            products: previous.products.map((product, i) =>
                i !== productIndex
                    ? product
                    : {
                        ...product,
                        [listKey]: product[listKey].map((item, j) =>
                            j === itemIndex ? { ...item, ...changes } : item
                        ),
                    }
            ),
        }));
    }

    function addProduct() {
        setForm((previous) => ({
            ...previous,
            products: [
                ...previous.products,
                {
                    num: String(previous.products.length + 1).padStart(2, "0"),
                    productLabel: "Product",
                    name: "",
                    description: "",
                    price: "",
                    priceNote: "",
                    buttonText: "Request a Demo",
                    buttonUrl: "/contact",
                    features: [],
                    stats: [],
                },
            ],
        }));
    }

    function removeProduct(index) {
        if (form.products.length <= 1) {
            notify("error", "At least one product is required.");
            return;
        }

        setForm((previous) => ({
            ...previous,
            products: previous.products.filter((_, i) => i !== index),
        }));
    }

    function addProductItem(productIndex, listKey) {
        const newItem =
            listKey === "features"
                ? { title: "", description: "" }
                : { value: "", label: "" };

        setForm((previous) => ({
            ...previous,
            products: previous.products.map((product, i) =>
                i === productIndex
                    ? { ...product, [listKey]: [...product[listKey], newItem] }
                    : product
            ),
        }));
    }

    function removeProductItem(productIndex, listKey, itemIndex) {
        setForm((previous) => ({
            ...previous,
            products: previous.products.map((product, i) =>
                i === productIndex
                    ? {
                        ...product,
                        [listKey]: product[listKey].filter(
                            (_, j) => j !== itemIndex
                        ),
                    }
                    : product
            ),
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to save Products content"
                );
            }

            setForm(mergeForm(data.content || data));
            setMessage("Products content updated successfully!");
            notify("success", "Products content saved successfully!");
        } catch (err) {
            setError(err.message || "Failed to save Products content");
            notify("error", err.message || "Failed to save Products content");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <p className="p-8" style={{ ...pageStyle, fontSize: SIZE.body }}>
                Loading Products CMS...
            </p>
        );
    }

    const heroField = (key) => ({
        value: form.hero[key] ?? "",
        onChange: (value) => setHero(key, value),
    });

    const ctaField = (key) => ({
        value: form.cta[key] ?? "",
        onChange: (value) => setCta(key, value),
    });

    return (
        <main className="min-h-screen px-6 py-8" style={pageStyle}>
            <div className="mx-auto max-w-5xl">
                <PageTitle
                    name="Products Page"
                    intro="Edit your Products page content from one place."
                />

                <form
                    id="admin-form"
                    onSubmit={handleSubmit}
                    className="space-y-10"
                >
                    <CollapsibleSection id="hero" title="Hero Content">
                        <Field label="Small Label" {...heroField("label")} />

                        <div className={INPUT_GRID}>
                            <Field label="Heading Line 1" {...heroField("headingLine1")} />
                            <Field label="Heading Line 2" {...heroField("headingLine2")} />
                        </div>

                        <Field label="Description" multiline {...heroField("description")} />

                        <div className={INPUT_GRID}>
                            <Field label="Button Text" {...heroField("buttonText")} />
                            <Field label="Button URL" {...heroField("buttonUrl")} />
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection id="products" title="Products">
                        {form.products.map((product, index) => (
                            <div key={index} className={itemClass} style={itemStyle}>
                                <h3 style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                                    Product {index + 1}
                                </h3>

                                <div className={INPUT_GRID}>
                                    <Field
                                        label="Product Number"
                                        value={product.num ?? ""}
                                        onChange={(value) => setProduct(index, { num: value })}
                                    />

                                    <Field
                                        label="Product Label"
                                        value={product.productLabel ?? ""}
                                        onChange={(value) => setProduct(index, { productLabel: value })}
                                    />

                                    <Field
                                        label="Product Name"
                                        required
                                        value={product.name ?? ""}
                                        onChange={(value) => setProduct(index, { name: value })}
                                    />
                                </div>

                                <Field
                                    label="Description"
                                    multiline
                                    value={product.description ?? ""}
                                    onChange={(value) => setProduct(index, { description: value })}
                                />

                                <div className={INPUT_GRID}>
                                    <Field
                                        label="Price"
                                        value={product.price ?? ""}
                                        onChange={(value) => setProduct(index, { price: value })}
                                    />
                                    <Field
                                        label="Price Note"
                                        value={product.priceNote ?? ""}
                                        onChange={(value) => setProduct(index, { priceNote: value })}
                                    />
                                    <Field
                                        label="Button Text"
                                        value={product.buttonText ?? ""}
                                        onChange={(value) => setProduct(index, { buttonText: value })}
                                    />
                                    <Field
                                        label="Button URL"
                                        value={product.buttonUrl ?? ""}
                                        onChange={(value) => setProduct(index, { buttonUrl: value })}
                                    />
                                </div>

                                <h4 style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                                    Product Features
                                </h4>

                                {product.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className={itemClass} style={itemStyle}>
                                        <Field
                                            label={`Feature ${featureIndex + 1} Title`}
                                            value={feature.title ?? ""}
                                            onChange={(value) =>
                                                setProductItem(index, "features", featureIndex, { title: value })
                                            }
                                        />

                                        <Field
                                            label="Feature Description"
                                            multiline
                                            value={feature.description ?? ""}
                                            onChange={(value) =>
                                                setProductItem(index, "features", featureIndex, { description: value })
                                            }
                                        />

                                        <button
                                            type="button"
                                            className={secondaryButtonClass}
                                            style={outlineButtonStyle}
                                            onClick={() => removeProductItem(index, "features", featureIndex)}
                                        >
                                            Remove Feature
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className={secondaryButtonClass}
                                    style={outlineButtonStyle}
                                    onClick={() => addProductItem(index, "features")}
                                >
                                    + Add Feature
                                </button>

                                <h4 style={{ ...headingStyle, fontSize: SIZE.h3 }}>
                                    Product Statistics
                                </h4>

                                {product.stats.map((stat, statIndex) => (
                                    <div key={statIndex} className={itemClass} style={itemStyle}>
                                        <div className={INPUT_GRID}>
                                            <Field
                                                label="Statistic Value"
                                                value={stat.value ?? ""}
                                                onChange={(value) =>
                                                    setProductItem(index, "stats", statIndex, { value })
                                                }
                                            />
                                            <Field
                                                label="Statistic Label"
                                                value={stat.label ?? ""}
                                                onChange={(value) =>
                                                    setProductItem(index, "stats", statIndex, { label: value })
                                                }
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            className={secondaryButtonClass}
                                            style={outlineButtonStyle}
                                            onClick={() => removeProductItem(index, "stats", statIndex)}
                                        >
                                            Remove Statistic
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className={secondaryButtonClass}
                                    style={outlineButtonStyle}
                                    onClick={() => addProductItem(index, "stats")}
                                >
                                    + Add Statistic
                                </button>

                                <div className="mt-5">
                                    <button
                                        type="button"
                                        className={secondaryButtonClass}
                                        style={outlineButtonStyle}
                                        onClick={() => removeProduct(index)}
                                    >
                                        Remove Product
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            className={secondaryButtonClass}
                            style={outlineButtonStyle}
                            onClick={addProduct}
                        >
                            + Add Product
                        </button>
                    </CollapsibleSection>

                    <CollapsibleSection id="cta" title="CTA Section">
                        <Field label="Small Label" {...ctaField("label")} />

                        <div className={INPUT_GRID}>
                            <Field label="Heading Line 1" {...ctaField("headingLine1")} />
                            <Field label="Heading Line 2" {...ctaField("headingLine2")} />
                        </div>

                        <Field label="Description" multiline {...ctaField("description")} />

                        <div className={INPUT_GRID}>
                            <Field label="Button Text" {...ctaField("buttonText")} />
                            <Field label="Button URL" {...ctaField("buttonUrl")} />
                        </div>
                    </CollapsibleSection>

                    <SaveBar
                        saving={saving}
                        error={error}
                        message={message}
                    />
                </form>
            </div>
        </main>
    );
}
