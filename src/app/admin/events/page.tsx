'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Event {
  _id?: string
  title: string
  description: string
  time: string
  day: number
  section: number
  link?: string
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Event | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [activeDay, setActiveDay] = useState(1)

  const [form, setForm] = useState({
    title: '',
    description: '',
    time: '',
    day: 1,
    section: 0,
    link: '',
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      const res = await fetch('/api/events')
      const data = await res.json()
      setEvents(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = events.filter(e => e.day === activeDay)

  const handleEdit = (event: Event) => {
    setEditing(event)
    setIsNew(false)
    setForm({
      title: event.title,
      description: event.description || '',
      time: event.time,
      day: event.day,
      section: event.section,
      link: event.link || '',
    })
  }

  const handleNew = () => {
    setEditing({ title: '', description: '', time: '', day: activeDay, section: 0 })
    setIsNew(true)
    setForm({ title: '', description: '', time: '', day: activeDay, section: 0, link: '' })
  }

  const handleSave = async () => {
    try {
      if (isNew) {
        await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else if (editing?._id) {
        await fetch(`/api/events/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      setEditing(null)
      fetchEvents()
    } catch (error) {
      console.error('Save failed:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return
    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' })
      fetchEvents()
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
            <h1 className="text-2xl font-bold">📅 Events</h1>
          </div>
          <button
            onClick={handleNew}
            className="bg-[#FF204E] hover:bg-[#d91a42] px-4 py-2 rounded-lg font-semibold transition"
          >
            + Add Event
          </button>
        </div>
      </header>

      <main className="p-6">
        {/* Day Tabs */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeDay === day ? 'bg-[#FF204E]' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Day {day}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF204E] border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map(event => (
              <div key={event._id} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs ${event.section === 0 ? 'bg-blue-600' : 'bg-purple-600'}`}>
                      {event.section === 0 ? 'Morning' : 'Evening'}
                    </span>
                    <span className="text-sm text-gray-400">{event.time}</span>
                  </div>
                  <h3 className="font-semibold mt-1">{event.title}</h3>
                  <p className="text-sm text-gray-400 truncate max-w-xl">{event.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id!)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {filteredEvents.length === 0 && (
              <p className="text-center text-gray-500 py-10">No events for Day {activeDay}</p>
            )}
          </div>
        )}

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl w-full max-w-lg p-6">
              <h2 className="text-xl font-bold mb-4">{isNew ? 'Add Event' : 'Edit Event'}</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Time</label>
                  <input
                    type="text"
                    value={form.time}
                    placeholder="e.g. 09:00 AM - 11:00 AM"
                    onChange={(e) => setForm(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Day</label>
                    <select
                      value={form.day}
                      onChange={(e) => setForm(prev => ({ ...prev, day: Number(e.target.value) }))}
                      className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                    >
                      <option value={1}>Day 1</option>
                      <option value={2}>Day 2</option>
                      <option value={3}>Day 3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Section</label>
                    <select
                      value={form.section}
                      onChange={(e) => setForm(prev => ({ ...prev, section: Number(e.target.value) }))}
                      className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                    >
                      <option value={0}>Morning</option>
                      <option value={1}>Evening</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Registration Link</label>
                  <input
                    type="url"
                    value={form.link}
                    placeholder="https://..."
                    onChange={(e) => setForm(prev => ({ ...prev, link: e.target.value }))}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF204E]"
                  />
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
