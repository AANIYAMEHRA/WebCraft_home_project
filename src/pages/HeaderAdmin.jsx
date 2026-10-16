import { useEffect, useState } from "react";

export default function HeaderAdmin() {
  const [header, setHeader] = useState({
    logoUrl: "/logo.svg",
    links: [],
    contactText: "Contact Us",
    contactUrl: "/contact",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadHeader() {
      try {
        const response = await fetch("http://localhost:5000/api/header");

        if (!response.ok) {
          throw new Error("Could not load header data");
        }

        const data = await response.json();

        setHeader({
          logoUrl: data.logoUrl || "/logo.svg",
          links: Array.isArray(data.links) ? data.links : [],
          contactText: data.contactText || "Contact Us",
          contactUrl: data.contactUrl || "/contact",
        });
      } catch (error) {
        setMessage(error.message);
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

    try {
      const response = await fetch("http://localhost:5000/api/header", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(header),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save header");
      }

      if (data.header) {
        setHeader(data.header);
      }

      setMessage("Header updated successfully!");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p style={{ padding: 24 }}>Loading header settings...</p>;
  }

  return (
    <main style={{ maxWidth: 800, margin: "30px auto", padding: 24 }}>
      <h1>Header CMS</h1>
      <p>Edit your website's header content here.</p>

      {message && (
        <p role="status" style={{ padding: 10, background: "#f1f5f9" }}>
          {message}
        </p>
      )}

      <form onSubmit={saveHeader}>
        <label>
          Logo URL
          <input
            style={inputStyle}
            value={header.logoUrl}
            onChange={(e) =>
              setHeader({ ...header, logoUrl: e.target.value })
            }
          />
        </label>

        <h2>Navigation Links</h2>

        {header.links.map((link, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 12,
              alignItems: "center",
            }}
          >
            <input
              aria-label={`Link ${index + 1} label`}
              placeholder="Label (e.g. About Us)"
              style={inputStyle}
              value={link.label}
              onChange={(e) =>
                updateLink(index, "label", e.target.value)
              }
            />

            <input
              aria-label={`Link ${index + 1} URL`}
              placeholder="URL (e.g. /about)"
              style={inputStyle}
              value={link.to}
              onChange={(e) => updateLink(index, "to", e.target.value)}
            />

            <button type="button" onClick={() => removeLink(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addLink}>
          + Add Link
        </button>

        <hr style={{ margin: "24px 0" }} />

        <label>
          Contact Button Text
          <input
            style={inputStyle}
            value={header.contactText}
            onChange={(e) =>
              setHeader({ ...header, contactText: e.target.value })
            }
          />
        </label>

        <label>
          Contact Button URL
          <input
            style={inputStyle}
            value={header.contactUrl}
            onChange={(e) =>
              setHeader({ ...header, contactUrl: e.target.value })
            }
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          style={{
            display: "block",
            marginTop: 24,
            padding: "12px 24px",
            background: "#2563eb",
            color: "white",
            border: 0,
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Header"}
        </button>
      </form>
    </main>
  );
}

const inputStyle = {
  display: "block",
  boxSizing: "border-box",
  width: "100%",
  padding: 10,
  marginTop: 6,
  marginBottom: 16,
  border: "1px solid #cbd5e1",
  borderRadius: 5,
};