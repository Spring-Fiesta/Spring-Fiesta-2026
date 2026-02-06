'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Carousel from '@/components/Carousel'
import { staticGalleryImages } from '@/lib/static-data'

// Convert static gallery to expected format
const images = staticGalleryImages.map(img => ({
  id: img.order,
  src: img.imageUrl,
  alt: img.altText,
}))

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ id: number; src: string; alt: string } | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedImage])

  const openImage = (index: number) => {
    setSelectedImage(images[index])
    setCurrentIndex(index)
  }

  const closeImage = () => setSelectedImage(null)

  const prevImage = useCallback(() => {
    const newIndex = (currentIndex - 1 + images.length) % images.length
    setSelectedImage(images[newIndex])
    setCurrentIndex(newIndex)
  }, [currentIndex])

  const nextImage = useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length
    setSelectedImage(images[newIndex])
    setCurrentIndex(newIndex)
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') closeImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, nextImage, prevImage])

  return (
    <div className="gallery-wrapper">
      <Navbar />
      <h1 className="gallery-title mt-5">Gallery</h1>
      <Carousel />

      {/* Masonry Grid */}
      <div className="gallery-container">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => openImage(index)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="dialog-container" onClick={closeImage}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <button className="dialog-close" onClick={closeImage}>
              <X size={24} />
            </button>
            <button className="dialog-arrow dialog-arrow-left" onClick={prevImage}>
              <ChevronLeft size={40} />
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <button className="dialog-arrow dialog-arrow-right" onClick={nextImage}>
              <ChevronRight size={40} />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
