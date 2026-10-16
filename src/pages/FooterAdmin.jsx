
import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:5000/api/footer'

export default function FooterAdmin() {
  const [footer, setFooter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadFooter() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Failed to load footer')
        }

        const data = await response.json()
        setFooter(data)
      } catch (error) {
        setMessage('Footer load nahi hua. Backend check karo.')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadFooter()
  }, [])

  function updateField(field, value) {
    setFooter((current) => ({ ...current, [field]: value }))
  }

  function updateSocial(index, field, value) {
    setFooter((current) => ({
      ...current,
      socials: current.socials.map((social, i) =>
        i === index ? { ...social, [field]: value } : social,
      ),
    }))
  }

  function updateColumn(index, field, value) {
    setFooter((current) => ({
      ...current,
      columns: current.columns.map((column, i) =>
        i === index ? { ...column, [field]: value } : column,
      ),
    }))
  }

  function updateLink(columnIndex, linkIndex, field, value) {
    setFooter((current) => ({
      ...current,
      columns: current.columns.map((column, i) =>
        i === columnIndex
          ? {
              ...column,
              items: column.items.map((item, j) =>
                j === linkIndex ? { ...item, [field]: value } : item,
              ),
            }
          : column,
      ),
    }))
  }

  async function saveFooter(event) {
    event.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(footer),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Save failed')
      }

      setFooter(data.footer)
      setMessage('Footer successfully save ho gaya!')
    } catch (error) {
      setMessage(`Save nahi hua: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="p-8">Loading footer...</p>

  if (!footer) {
    return <p className="p-8">{message || 'Footer data unavailable.'}</p>
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900'
  const labelClass = 'mb-1 block text-sm font-medium text-gray-700'

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Footer CMS
        </h1>
        <p className="mb-8 text-gray-600">
          Website footer ka content yahan se edit karo.
        </p>

        <form onSubmit={saveFooter} className="space-y-8">
          <section className="space-y-4 rounded-xl border bg-white p-6">
            <h2 className="text-xl font-semibold">Main Content</h2>

            {[
              ['kicker', 'Kicker'],
              ['heading', 'Heading'],
              ['headingEmphasis', 'Heading Emphasis'],
              ['email', 'Email'],
              ['brandTagline', 'Brand Tagline'],
              ['bottomText', 'Bottom Text'],
            ].map(([field, label]) => (
              <div key={field}>
                <label className={labelClass}>{label}</label>
                <input
                  className={inputClass}
                  type="text"
                  value={footer[field] || ''}
                  onChange={(event) =>
                    updateField(field, event.target.value)
                  }
                />
              </div>
            ))}
          </section>

          <section className="space-y-4 rounded-xl border bg-white p-6">
            <h2 className="text-xl font-semibold">Social Links</h2>

            {footer.socials.map((social, index) => (
              <div key={social._id || index} className="space-y-3">
                <label className={labelClass}>Social Name</label>
                <input
                  className={inputClass}
                  value={social.label}
                  onChange={(event) =>
                    updateSocial(index, 'label', event.target.value)
                  }
                />

                <label className={labelClass}>Social URL</label>
                <input
                  className={inputClass}
                  type="url"
                  value={social.href}
                  onChange={(event) =>
                    updateSocial(index, 'href', event.target.value)
                  }
                />

                {index < footer.socials.length - 1 && (
                  <hr className="my-4" />
                )}
              </div>
            ))}
          </section>

          <section className="space-y-6 rounded-xl border bg-white p-6">
            <h2 className="text-xl font-semibold">Footer Columns</h2>

            {footer.columns.map((column, columnIndex) => (
              <div
                key={column._id || columnIndex}
                className="space-y-3 rounded-lg border p-4"
              >
                <label className={labelClass}>Column Title</label>
                <input
                  className={inputClass}
                  value={column.title}
                  onChange={(event) =>
                    updateColumn(columnIndex, 'title', event.target.value)
                  }
                />

                {column.items.map((item, linkIndex) => (
                  <div
                    key={item._id || linkIndex}
                    className="grid gap-3 sm:grid-cols-2"
                  >
                    <div>
                      <label className={labelClass}>Link Label</label>
                      <input
                        className={inputClass}
                        value={item.label}
                        onChange={(event) =>
                          updateLink(
                            columnIndex,
                            linkIndex,
                            'label',
                            event.target.value,
                          )
                        }
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Link Path</label>
                      <input
                        className={inputClass}
                        value={item.to}
                        onChange={(event) =>
                          updateLink(
                            columnIndex,
                            linkIndex,
                            'to',
                            event.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </section>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-black px-6 py-3 font-semibold text-white disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>

            {message && (
              <p role="status" aria-live="polite">{message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
