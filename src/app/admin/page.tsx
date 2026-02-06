'use client'

import { useState, useEffect } from 'react'
import { Navbar, Footer } from '@/components'

interface Event {
  _id?: string
  day: number
  time: string
  title: string
  description: string
  link?: string
  order: number
}

interface TeamMember {
  _id?: string
  name: string
  designation: string
  department: string
  imageUrl: string
  order: number
}

interface Sponsor {
  _id?: string
  name: string
  logoUrl: string
  tier: 'title' | 'associate' | 'regular'
  website?: string
  order: number
}

type TabType = 'events' | 'team' | 'sponsors' | 'gallery' | 'config'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('events')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Data states
  const [events, setEvents] = useState<Record<number, Event[]>>({})
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [sponsors, setSponsors] = useState<{ title: Sponsor[], associate: Sponsor[], regular: Sponsor[] }>({ title: [], associate: [], regular: [] })
  
  // Form states
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Event | TeamMember | Sponsor | null>(null)
  
  // Admin password (in production, use environment variable)
  const ADMIN_PASSWORD = 'springfiesta2026'
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setMessage('')
    } else {
      setMessage('Invalid password')
    }
  }
  
  // Fetch data based on active tab
  useEffect(() => {
    if (!isAuthenticated) return
    
    const fetchData = async () => {
      setLoading(true)
      try {
        switch (activeTab) {
          case 'events':
            const eventsRes = await fetch('/api/events')
            const eventsData = await eventsRes.json()
            setEvents(eventsData)
            break
          case 'team':
            const teamRes = await fetch('/api/team')
            const teamData = await teamRes.json()
            setTeamMembers(teamData)
            break
          case 'sponsors':
            const sponsorsRes = await fetch('/api/sponsors')
            const sponsorsData = await sponsorsRes.json()
            setSponsors(sponsorsData)
            break
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setLoading(false)
    }
    
    fetchData()
  }, [activeTab, isAuthenticated])
  
  const tabs: { id: TabType; label: string }[] = [
    { id: 'events', label: '📅 Events' },
    { id: 'team', label: '👥 Team' },
    { id: 'sponsors', label: '🏢 Sponsors' },
    { id: 'gallery', label: '🖼️ Gallery' },
    { id: 'config', label: '⚙️ Config' },
  ]
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-purple-900 to-secondary flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-white text-center mb-8">🔐 Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-accent"
            />
            {message && <p className="text-red-400 text-sm">{message}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-accent hover:bg-accent/80 text-white font-semibold rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-white/60 text-sm text-center mt-4">
            Default password: springfiesta2026
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-900 to-secondary">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-accent text-white scale-105'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Content Area */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 min-h-[500px]">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
            </div>
          ) : (
            <>
              {activeTab === 'events' && (
                <EventsManager events={events} setEvents={setEvents} setMessage={setMessage} />
              )}
              {activeTab === 'team' && (
                <TeamManager members={teamMembers} setMembers={setTeamMembers} setMessage={setMessage} />
              )}
              {activeTab === 'sponsors' && (
                <SponsorsManager sponsors={sponsors} setSponsors={setSponsors} setMessage={setMessage} />
              )}
              {activeTab === 'gallery' && (
                <GalleryManager setMessage={setMessage} />
              )}
              {activeTab === 'config' && (
                <ConfigManager setMessage={setMessage} />
              )}
            </>
          )}
        </div>
        
        {/* Status Message */}
        {message && (
          <div className="fixed bottom-4 right-4 bg-accent text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
            {message}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

// Events Manager Component
function EventsManager({ events, setEvents, setMessage }: { 
  events: Record<number, Event[]>
  setEvents: React.Dispatch<React.SetStateAction<Record<number, Event[]>>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
}) {
  const [editEvent, setEditEvent] = useState<Event | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  
  const handleSave = async (event: Event) => {
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      })
      
      if (res.ok) {
        const newEvent = await res.json()
        setEvents(prev => ({
          ...prev,
          [event.day]: [...(prev[event.day] || []), newEvent]
        }))
        setMessage('Event saved successfully!')
        setShowAddForm(false)
        setEditEvent(null)
      } else {
        const error = await res.json()
        setMessage(error.error || 'Failed to save event')
      }
    } catch (error) {
      setMessage('Error saving event. Make sure MongoDB is running.')
    }
    
    setTimeout(() => setMessage(''), 3000)
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Events Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors"
        >
          + Add Event
        </button>
      </div>
      
      {showAddForm && (
        <EventForm 
          event={editEvent || { day: 1, time: '', title: '', description: '', link: '', order: 1 }}
          onSave={handleSave}
          onCancel={() => { setShowAddForm(false); setEditEvent(null); }}
        />
      )}
      
      {[1, 2, 3].map(day => (
        <div key={day} className="mb-8">
          <h3 className="text-xl font-semibold text-accent mb-4">Day {day}</h3>
          <div className="grid gap-4">
            {(events[day] || []).map((event, idx) => (
              <div key={event._id || idx} className="bg-white/5 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{event.title}</p>
                  <p className="text-white/60 text-sm">{event.time}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditEvent(event); setShowAddForm(true); }}
                    className="px-3 py-1 bg-blue-500/50 hover:bg-blue-500 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Event Form
function EventForm({ event, onSave, onCancel }: {
  event: Event
  onSave: (event: Event) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState(event)
  
  return (
    <div className="bg-white/5 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        {event._id ? 'Edit Event' : 'Add New Event'}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-sm mb-1">Day</label>
          <select
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) })}
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          >
            <option value={1}>Day 1</option>
            <option value={2}>Day 2</option>
            <option value={3}>Day 3</option>
          </select>
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-1">Time</label>
          <input
            type="text"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            placeholder="09:00 AM - 11:00 AM"
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-white/60 text-sm mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-white/60 text-sm mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-1">Registration Link</label>
          <input
            type="url"
            value={formData.link || ''}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-1">Order</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={onCancel} className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20">
          Cancel
        </button>
        <button onClick={() => onSave(formData)} className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/80">
          Save Event
        </button>
      </div>
    </div>
  )
}

// Team Manager Component
function TeamManager({ members, setMembers, setMessage }: {
  members: TeamMember[]
  setMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
}) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState<TeamMember>({ 
    name: '', designation: '', department: '', imageUrl: '', order: 1 
  })
  
  const handleSave = async () => {
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (res.ok) {
        const newMember = await res.json()
        setMembers(prev => [...prev, newMember])
        setMessage('Team member added successfully!')
        setShowAddForm(false)
        setFormData({ name: '', designation: '', department: '', imageUrl: '', order: 1 })
      } else {
        const error = await res.json()
        setMessage(error.error || 'Failed to add team member')
      }
    } catch (error) {
      setMessage('Error adding team member')
    }
    setTimeout(() => setMessage(''), 3000)
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Team Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg"
        >
          + Add Member
        </button>
      </div>
      
      {showAddForm && (
        <div className="bg-white/5 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3 py-2 bg-white/10 text-white rounded border border-white/20"
            />
            <input
              type="text"
              placeholder="Designation"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              className="px-3 py-2 bg-white/10 text-white rounded border border-white/20"
            />
            <input
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="px-3 py-2 bg-white/10 text-white rounded border border-white/20"
            />
            <input
              type="text"
              placeholder="Image URL (/images/...)"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="px-3 py-2 bg-white/10 text-white rounded border border-white/20"
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-white/10 text-white rounded">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-accent text-white rounded">
              Save
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, idx) => (
          <div key={member._id || idx} className="bg-white/5 rounded-lg p-4">
            <div className="w-16 h-16 rounded-full bg-white/20 mb-3 overflow-hidden">
              <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-white font-medium">{member.name}</p>
            <p className="text-accent text-sm">{member.designation}</p>
            <p className="text-white/60 text-xs">{member.department}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Sponsors Manager Component
function SponsorsManager({ sponsors, setSponsors, setMessage }: {
  sponsors: { title: Sponsor[], associate: Sponsor[], regular: Sponsor[] }
  setSponsors: React.Dispatch<React.SetStateAction<{ title: Sponsor[], associate: Sponsor[], regular: Sponsor[] }>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
}) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState<Sponsor>({ 
    name: '', logoUrl: '', tier: 'regular', order: 1 
  })
  
  const handleSave = async () => {
    try {
      const res = await fetch('/api/sponsors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (res.ok) {
        const newSponsor = await res.json()
        setSponsors(prev => ({
          ...prev,
          [formData.tier]: [...prev[formData.tier], newSponsor]
        }))
        setMessage('Sponsor added successfully!')
        setShowAddForm(false)
      } else {
        const error = await res.json()
        setMessage(error.error || 'Failed to add sponsor')
      }
    } catch (error) {
      setMessage('Error adding sponsor')
    }
    setTimeout(() => setMessage(''), 3000)
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Sponsors Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg"
        >
          + Add Sponsor
        </button>
      </div>
      
      {showAddForm && (
        <div className="bg-white/5 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Sponsor Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3 py-2 bg-white/10 text-white rounded border border-white/20"
            />
            <select
              value={formData.tier}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value as 'title' | 'associate' | 'regular' })}
              className="px-3 py-2 bg-white/10 text-white rounded border border-white/20"
            >
              <option value="title">Title Sponsor</option>
              <option value="associate">Associate Sponsor</option>
              <option value="regular">Regular Sponsor</option>
            </select>
            <input
              type="text"
              placeholder="Logo URL (/images/...)"
              value={formData.logoUrl}
              onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              className="px-3 py-2 bg-white/10 text-white rounded border border-white/20 col-span-2"
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-white/10 text-white rounded">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-accent text-white rounded">
              Save
            </button>
          </div>
        </div>
      )}
      
      {['title', 'associate', 'regular'].map(tier => (
        <div key={tier} className="mb-6">
          <h3 className="text-lg font-semibold text-accent capitalize mb-3">{tier} Sponsors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sponsors[tier as keyof typeof sponsors].map((sponsor, idx) => (
              <div key={sponsor._id || idx} className="bg-white/5 rounded-lg p-4 text-center">
                <div className="w-20 h-20 mx-auto mb-2 bg-white rounded-lg flex items-center justify-center">
                  <img src={sponsor.logoUrl} alt={sponsor.name} className="max-w-full max-h-full p-2" />
                </div>
                <p className="text-white text-sm">{sponsor.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Gallery Manager Component
function GalleryManager({ setMessage }: { setMessage: React.Dispatch<React.SetStateAction<string>> }) {
  const [images, setImages] = useState<{ _id?: string; imageUrl: string; altText: string; isCarousel: boolean }[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({ imageUrl: '', altText: '', isCarousel: false })
  
  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => setImages(data))
  }, [])
  
  const handleSave = async () => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (res.ok) {
        const newImage = await res.json()
        setImages(prev => [...prev, newImage])
        setMessage('Image added successfully!')
        setShowAddForm(false)
        setFormData({ imageUrl: '', altText: '', isCarousel: false })
      } else {
        const error = await res.json()
        setMessage(error.error || 'Failed to add image')
      }
    } catch (error) {
      setMessage('Error adding image')
    }
    setTimeout(() => setMessage(''), 3000)
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gallery Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg"
        >
          + Add Image
        </button>
      </div>
      
      {showAddForm && (
        <div className="bg-white/5 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Image URL (/images/...)"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="px-3 py-2 bg-white/10 text-white rounded border border-white/20"
            />
            <input
              type="text"
              placeholder="Alt Text"
              value={formData.altText}
              onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
              className="px-3 py-2 bg-white/10 text-white rounded border border-white/20"
            />
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={formData.isCarousel}
                onChange={(e) => setFormData({ ...formData, isCarousel: e.target.checked })}
              />
              Show in Carousel
            </label>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-white/10 text-white rounded">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-accent text-white rounded">
              Save
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((image, idx) => (
          <div key={image._id || idx} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden bg-white/10">
              <img src={image.imageUrl} alt={image.altText} className="w-full h-full object-cover" />
            </div>
            {image.isCarousel && (
              <span className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded">
                Carousel
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Config Manager Component  
function ConfigManager({ setMessage }: { setMessage: React.Dispatch<React.SetStateAction<string>> }) {
  const [config, setConfig] = useState({
    mainLogo: '',
    instituteLogo: '',
    festName: '',
    festYear: '',
    contactEmail: '',
    address: '',
    footerText: '',
  })
  
  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
  }, [])
  
  const handleSave = async () => {
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      
      if (res.ok) {
        setMessage('Configuration saved successfully!')
      } else {
        const error = await res.json()
        setMessage(error.error || 'Failed to save configuration')
      }
    } catch (error) {
      setMessage('Error saving configuration')
    }
    setTimeout(() => setMessage(''), 3000)
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Site Configuration</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-white/60 text-sm mb-1">Fest Name</label>
          <input
            type="text"
            value={config.festName}
            onChange={(e) => setConfig({ ...config, festName: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-1">Fest Year</label>
          <input
            type="text"
            value={config.festYear}
            onChange={(e) => setConfig({ ...config, festYear: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-1">Main Logo URL</label>
          <input
            type="text"
            value={config.mainLogo}
            onChange={(e) => setConfig({ ...config, mainLogo: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-1">Institute Logo URL</label>
          <input
            type="text"
            value={config.instituteLogo}
            onChange={(e) => setConfig({ ...config, instituteLogo: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-1">Contact Email</label>
          <input
            type="email"
            value={config.contactEmail}
            onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-1">Footer Text</label>
          <input
            type="text"
            value={config.footerText}
            onChange={(e) => setConfig({ ...config, footerText: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-white/60 text-sm mb-1">Address</label>
          <textarea
            value={config.address}
            onChange={(e) => setConfig({ ...config, address: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 bg-white/10 text-white rounded border border-white/20"
          />
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button onClick={handleSave} className="px-6 py-3 bg-accent hover:bg-accent/80 text-white rounded-lg font-medium">
          Save Configuration
        </button>
      </div>
    </div>
  )
}
