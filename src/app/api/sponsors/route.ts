import { NextRequest, NextResponse } from 'next/server'
import { staticSponsors } from '@/lib/static-data'

async function getSponsorsFromDB() {
  try {
    if (!process.env.MONGODB_URI) {
      return null
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const Sponsor = (await import('@/models/Sponsor')).default
    
    await connectDB()
    const sponsors = await Sponsor.find({}).sort({ tier: 1, order: 1 })
    
    if (sponsors.length === 0) return null
    
    // Group sponsors by tier
    const grouped = {
      title: sponsors.filter(s => s.tier === 'title'),
      associate: sponsors.filter(s => s.tier === 'associate'),
      regular: sponsors.filter(s => s.tier === 'regular'),
    }
    
    return grouped
  } catch (error) {
    console.log('MongoDB not available, using static data')
    return null
  }
}

// GET all sponsors grouped by tier
export async function GET() {
  try {
    const dbSponsors = await getSponsorsFromDB()
    
    if (dbSponsors) {
      return NextResponse.json(dbSponsors)
    }
    
    return NextResponse.json(staticSponsors)
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return NextResponse.json(staticSponsors)
  }
}

// POST create new sponsor
export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const Sponsor = (await import('@/models/Sponsor')).default
    
    await connectDB()
    const body = await request.json()
    const sponsor = await Sponsor.create(body)
    
    return NextResponse.json(sponsor, { status: 201 })
  } catch (error) {
    console.error('Error creating sponsor:', error)
    return NextResponse.json({ error: 'Failed to create sponsor' }, { status: 500 })
  }
}
