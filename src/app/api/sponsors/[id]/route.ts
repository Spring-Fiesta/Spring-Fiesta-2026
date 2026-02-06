import { NextRequest, NextResponse } from 'next/server'

// GET single sponsor
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const Sponsor = (await import('@/models/Sponsor')).default
    
    await connectDB()
    const sponsor = await Sponsor.findById(id)
    
    if (!sponsor) {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 })
    }
    
    return NextResponse.json(sponsor)
  } catch (error) {
    console.error('Error fetching sponsor:', error)
    return NextResponse.json({ error: 'Failed to fetch sponsor' }, { status: 500 })
  }
}

// PUT update sponsor
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const Sponsor = (await import('@/models/Sponsor')).default
    
    await connectDB()
    const body = await request.json()
    const sponsor = await Sponsor.findByIdAndUpdate(id, body, { new: true })
    
    if (!sponsor) {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 })
    }
    
    return NextResponse.json(sponsor)
  } catch (error) {
    console.error('Error updating sponsor:', error)
    return NextResponse.json({ error: 'Failed to update sponsor' }, { status: 500 })
  }
}

// DELETE sponsor
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const Sponsor = (await import('@/models/Sponsor')).default
    
    await connectDB()
    const sponsor = await Sponsor.findByIdAndDelete(id)
    
    if (!sponsor) {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting sponsor:', error)
    return NextResponse.json({ error: 'Failed to delete sponsor' }, { status: 500 })
  }
}
