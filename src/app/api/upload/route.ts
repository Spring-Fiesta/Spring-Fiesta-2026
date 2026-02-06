import { NextResponse } from 'next/server'
import { uploadImage, deleteImage } from '@/lib/cloudinary'

// POST - Upload image to Cloudinary
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { image, folder = 'spring-fiesta' } = data

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 })
    }

    const result = await uploadImage(image, folder)
    
    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}

// DELETE - Delete image from Cloudinary
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get('publicId')

    if (!publicId) {
      return NextResponse.json({ error: 'Public ID is required' }, { status: 400 })
    }

    const success = await deleteImage(publicId)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
    }
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
