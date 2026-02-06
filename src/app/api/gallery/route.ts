import { NextRequest, NextResponse } from 'next/server'
import { staticGalleryImages } from '@/lib/static-data'

async function getGalleryFromDB(carouselOnly: boolean) {
  try {
    if (!process.env.MONGODB_URI) {
      return null
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const GalleryImage = (await import('@/models/GalleryImage')).default
    
    await connectDB()
    const query = carouselOnly ? { isCarousel: true } : {}
    const images = await GalleryImage.find(query).sort({ order: 1 })
    
    return images.length > 0 ? images : null
  } catch (error) {
    console.log('MongoDB not available, using static data')
    return null
  }
}

// GET all gallery images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const carouselOnly = searchParams.get('carousel') === 'true'
    
    const dbImages = await getGalleryFromDB(carouselOnly)
    
    if (dbImages) {
      return NextResponse.json(dbImages)
    }
    
    // Fallback to static data
    const images = carouselOnly 
      ? staticGalleryImages.filter(img => img.isCarousel)
      : staticGalleryImages
    
    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json(staticGalleryImages)
  }
}

// POST create new gallery image
export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const GalleryImage = (await import('@/models/GalleryImage')).default
    
    await connectDB()
    const body = await request.json()
    const image = await GalleryImage.create(body)
    
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery image:', error)
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 })
  }
}
