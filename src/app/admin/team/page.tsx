'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface TeamMember {
  _id?: string
  name: string
  designation: string
  image: string
  department?: string
  order?: number
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<TeamMember | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name: '',
    designation: '',
    image: '',
    department: '',
    order: 0,
  })

  useEffect(() => {
    fetchMembers()
  }, [])

  async function fetchMembers() {
    try {
      const res = await fetch('/api/team')
      const data = await res.json()
      setMembers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch team:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (member: TeamMember) => {
    setEditing(member)
    setIsNew(false)
    setForm({
      name: member.name,
      designation: member.designation,
      image: member.image,
      department: member.department || '',
      order: member.order || 0,
    })
  }

  const handleNew = () => {
    setEditing({ name: '', designation: '', image: '' })
    setIsNew(true)
    setForm({ name: '', designation: '', image: '', department: '', order: members.length + 1 })
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
          body: JSON.stringify({ image: base64, folder: 'spring-fiesta/team' }),
        })
        const data = await res.json()
        if (data.url) {
          setForm(prev => ({ ...prev, image: data.url }))
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
        await fetch('/api/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else if (editing?._id) {
        await fetch(`/api/team/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      setEditing(null)
      fetchMembers()
    } catch (error) {
      console.error('Save failed:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return
    try {
      await fetch(`/api/team/${id}`, { method: 'DELETE' })
      fetchMembers()
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-400 hover:text-white">← Back</Link>
            <h1 className="text-2xl font-bold">👥 Team Members</h1>
          </div>
          <button
            onClick={handleNew}
            className="bg-[#FF204E] hover:bg-[#d91a42] px-4 py-2 rounded-lg font-semibold transition"
          >
            + Add Member
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
            {members.map((member) => (
              <div key={member._id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-700 overflow-hidden">
                  {member.image && (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{member.name}</h3>
                  <p className="text-sm text-gray-400 truncate">{member.designation}</p>
                  <p className="text-xs text-gray-500">{member.department}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(member)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member._id!)}
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
              <h2 className="text-xl font-bold mb-4">{isNew ? 'Add Member' : 'Edit Member'}</h2>
              
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
                  <label className="block text-sm text-gray-400 mb-1">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm(prev => ({ ...prev, designation: e.target.value }))}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Department</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Image</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="Image URL"
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
                  {form.image && (
                    <img src={form.image} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />
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
