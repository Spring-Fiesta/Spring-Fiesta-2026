import { NextRequest, NextResponse } from 'next/server'
import { staticEvents } from '@/lib/static-data'

// Try to connect to MongoDB, fall back to static data if not available
async function getEventsFromDB() {
  try {
    // Only attempt MongoDB if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      return null
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const Event = (await import('@/models/Event')).default
    
    await connectDB()
    const events = await Event.find({}).sort({ day: 1, order: 1 })
    
    // Group events by day
    const grouped = events.reduce((acc, event) => {
      const day = event.day
      if (!acc[day]) {
        acc[day] = []
      }
      acc[day].push(event)
      return acc
    }, {} as Record<number, typeof events>)
    
    return grouped
  } catch (error) {
    console.log('MongoDB not available, using static data')
    return null
  }
}

// GET all events grouped by day
export async function GET() {
  try {
    const dbEvents = await getEventsFromDB()
    
    if (dbEvents && Object.keys(dbEvents).length > 0) {
      return NextResponse.json(dbEvents)
    }
    
    // Fallback to static data
    return NextResponse.json(staticEvents)
  } catch (error) {
    console.error('Error fetching events:', error)
    // Even if there's an error, return static data
    return NextResponse.json(staticEvents)
  }
}

// POST create new event
export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Database not configured. Set MONGODB_URI in .env.local' }, { status: 503 })
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const Event = (await import('@/models/Event')).default
    
    await connectDB()
    const body = await request.json()
    const event = await Event.create(body)
    
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event. Make sure MongoDB is running.' }, { status: 500 })
  }
}
