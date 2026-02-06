'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface GalleryImage {
  _id?: string
  src: string
  alt?: string
  category?: string
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const multiFileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      setImages(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSingleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    await uploadFile(file)
  }

  const handleMultiUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    for (let i = 0; i < files.length; i++) {
      await uploadFile(files[i])
      setUploadProgress(Math.round(((i + 1) / files.length) * 100))
    }

    setUploading(false)
    setUploadProgress(0)
  }

  const uploadFile = async (file: File) => {
    return new Promise<void>((resolve) => {
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64 = reader.result as string
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64, folder: 'spring-fiesta/gallery' }),
          })
          const uploadData = await uploadRes.json()
          
          if (uploadData.url) {
            await fetch('/api/gallery', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                src: uploadData.url, 
                alt: file.name.replace(/\.[^/.]+$/, ''),
                category: 'gallery'
              }),
            })
            fetchImages()
          }
        } catch (error) {
          console.error('Upload failed:', error)
        }
        resolve()
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
      fetchImages()
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
            <h1 className="text-2xl font-bold">🖼️ Gallery ({images.length} images)</h1>
          </div>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleSingleUpload}
              className="hidden"
            />
            <input
              ref={multiFileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultiUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              + Add Image
            </button>
            <button
              onClick={() => multiFileInputRef.current?.click()}
              disabled={uploading}
              className="bg-[#FF204E] hover:bg-[#d91a42] px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              📤 Bulk Upload
            </button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Upload Progress */}
        {uploading && (
          <div className="mb-6 bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span>Uploading images...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-[#FF204E] h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF204E] border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map((image) => (
              <div key={image._id} className="relative group">
                <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt || 'Gallery image'} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <button
                  onClick={() => handleDelete(image._id!)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && images.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No images in gallery</p>
            <button
              onClick={() => multiFileInputRef.current?.click()}
              className="bg-[#FF204E] hover:bg-[#d91a42] px-6 py-3 rounded-lg font-semibold transition"
            >
              📤 Upload Images
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
