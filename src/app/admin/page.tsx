'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Stats {
  events: number
  team: number
  sponsors: number
  gallery: number
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({ events: 0, team: 0, sponsors: 0, gallery: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [events, team, sponsors, gallery] = await Promise.all([
          fetch('/api/events').then(r => r.json()),
          fetch('/api/team').then(r => r.json()),
          fetch('/api/sponsors').then(r => r.json()),
          fetch('/api/gallery').then(r => r.json()),
        ])
        setStats({
          events: Array.isArray(events) ? events.length : 0,
          team: Array.isArray(team) ? team.length : 0,
          sponsors: Array.isArray(sponsors) ? sponsors.length : 0,
          gallery: Array.isArray(gallery) ? gallery.length : 0,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const menuItems = [
    { name: 'Events', href: '/admin/events', count: stats.events, icon: '📅', color: 'bg-purple-600' },
    { name: 'Team Members', href: '/admin/team', count: stats.team, icon: '👥', color: 'bg-blue-600' },
    { name: 'Sponsors', href: '/admin/sponsors', count: stats.sponsors, icon: '🏢', color: 'bg-green-600' },
    { name: 'Gallery', href: '/admin/gallery', count: stats.gallery, icon: '🖼️', color: 'bg-amber-600' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#FF204E]">Spring Fiesta Admin</h1>
          <Link href="/" className="text-gray-400 hover:text-white transition">
            ← Back to Website
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF204E] border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${item.color} rounded-xl p-6 hover:opacity-90 transition transform hover:scale-105`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{item.icon}</span>
                  <span className="text-4xl font-bold">{item.count}</span>
                </div>
                <h3 className="text-xl font-semibold mt-4">{item.name}</h3>
                <p className="text-sm opacity-75 mt-1">Click to manage</p>
              </Link>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/upload"
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-[#FF204E] transition"
            >
              <span className="text-2xl">📤</span>
              <h3 className="font-semibold mt-2">Bulk Upload Images</h3>
              <p className="text-sm text-gray-400">Upload multiple images to Cloudinary</p>
            </Link>
            <Link
              href="/admin/settings"
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-[#FF204E] transition"
            >
              <span className="text-2xl">⚙️</span>
              <h3 className="font-semibold mt-2">Site Settings</h3>
              <p className="text-sm text-gray-400">Configure site-wide settings</p>
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-[#FF204E] transition text-left"
            >
              <span className="text-2xl">🔄</span>
              <h3 className="font-semibold mt-2">Refresh Stats</h3>
              <p className="text-sm text-gray-400">Update all counters</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
