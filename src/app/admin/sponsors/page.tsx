'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Sponsor {
  _id?: string
  name: string
  logo: string
  tier: 'title' | 'associate' | 'sponsor'
  website?: string
  order?: number
}

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Sponsor | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name: '',
    logo: '',
    tier: 'sponsor' as 'title' | 'associate' | 'sponsor',
    website: '',
    order: 0,
  })

  useEffect(() => {
    fetchSponsors()
  }, [])

  async function fetchSponsors() {
    try {
      const res = await fetch('/api/sponsors')
      const data = await res.json()
      setSponsors(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch sponsors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (sponsor: Sponsor) => {
    setEditing(sponsor)
    setIsNew(false)
    setForm({
      name: sponsor.name,
      logo: sponsor.logo,
      tier: sponsor.tier,
      website: sponsor.website || '',
      order: sponsor.order || 0,
    })
  }

  const handleNew = () => {
    setEditing({ name: '', logo: '', tier: 'sponsor' })
    setIsNew(true)
    setForm({ name: '', logo: '', tier: 'sponsor', website: '', order: sponsors.length + 1 })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64 = reader.result as string
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, folder: 'spring-fiesta/sponsors' }),
        })
        const data = await res.json()
        if (data.url) {
          setForm(prev => ({ ...prev, logo: data.url }))
        }
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Upload failed:', error)
      setUploading(false)
    }
  }

  const handleSave = async () => {
    try {
      if (isNew) {
        await fetch('/api/sponsors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else if (editing?._id) {
        await fetch(`/api/sponsors/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      setEditing(null)
      fetchSponsors()
    } catch (error) {
      console.error('Save failed:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sponsor?')) return
    try {
      await fetch(`/api/sponsors/${id}`, { method: 'DELETE' })
      fetchSponsors()
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  const tierColors = {
    title: 'bg-yellow-600',
    associate: 'bg-blue-600',
    sponsor: 'bg-gray-600',
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-400 hover:text-white">← Back</Link>
            <h1 className="text-2xl font-bold">🏢 Sponsors</h1>
          </div>
          <button
            onClick={handleNew}
            className="bg-[#FF204E] hover:bg-[#d91a42] px-4 py-2 rounded-lg font-semibold transition"
          >
            + Add Sponsor
          </button>
        </div>
      </header>

      <main className="p-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF204E] border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sponsors.map((sponsor) => (
              <div key={sponsor._id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-32 bg-white flex items-center justify-center p-4">
                  {sponsor.logo && (
                    <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`${tierColors[sponsor.tier]} px-2 py-0.5 rounded text-xs capitalize`}>
                      {sponsor.tier}
                    </span>
                  </div>
                  <h3 className="font-semibold truncate">{sponsor.name}</h3>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(sponsor)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sponsor._id!)}
                      className="flex-1 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">{isNew ? 'Add Sponsor' : 'Edit Sponsor'}</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Tier</label>
                  <select
                    value={form.tier}
                    onChange={(e) => setForm(prev => ({ ...prev, tier: e.target.value as 'title' | 'associate' | 'sponsor' }))}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                  >
                    <option value="title">Title Sponsor</option>
                    <option value="associate">Associate Sponsor</option>
                    <option value="sponsor">Regular Sponsor</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Website</label>
                  <input
                    type="url"
                    value={form.website}
                    placeholder="https://..."
                    onChange={(e) => setForm(prev => ({ ...prev, website: e.target.value }))}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Logo</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.logo}
                      onChange={(e) => setForm(prev => ({ ...prev, logo: e.target.value }))}
                      placeholder="Logo URL"
                      className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg transition disabled:opacity-50"
                    >
                      {uploading ? '...' : '📤'}
                    </button>
                  </div>
                  {form.logo && (
                    <div className="mt-2 bg-white p-2 rounded w-20 h-20 flex items-center justify-center">
                      <img src={form.logo} alt="Preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setEditing(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#FF204E] hover:bg-[#d91a42] px-4 py-2 rounded-lg font-semibold transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
