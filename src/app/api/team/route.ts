import { NextRequest, NextResponse } from 'next/server'
import { staticTeamMembers } from '@/lib/static-data'

async function getTeamFromDB() {
  try {
    if (!process.env.MONGODB_URI) {
      return null
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const TeamMember = (await import('@/models/TeamMember')).default
    
    await connectDB()
    const members = await TeamMember.find({}).sort({ order: 1 })
    return members.length > 0 ? members : null
  } catch (error) {
    console.log('MongoDB not available, using static data')
    return null
  }
}

// GET all team members
export async function GET() {
  try {
    const dbMembers = await getTeamFromDB()
    
    if (dbMembers) {
      return NextResponse.json(dbMembers)
    }
    
    return NextResponse.json(staticTeamMembers)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(staticTeamMembers)
  }
}

// POST create new team member
export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const TeamMember = (await import('@/models/TeamMember')).default
    
    await connectDB()
    const body = await request.json()
    const member = await TeamMember.create(body)
    
    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 })
  }
}
