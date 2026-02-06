import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import connectDB from '@/lib/mongodb'
import Team from '@/models/Team'

// GET check team status
export async function GET() {
  try {
    const cookieStore = await cookies()
    const teamId = cookieStore.get('teamId')?.value
    
    if (!teamId) {
      return NextResponse.json({ authenticated: false })
    }
    
    await connectDB()
    const team = await Team.findById(teamId)
    
    if (!team) {
      return NextResponse.json({ authenticated: false })
    }
    
    return NextResponse.json({ 
      authenticated: true,
      name: team.name,
      score: team.score,
      currentQuestion: team.currentQuestion
    })
  } catch (error) {
    console.error('Check team error:', error)
    return NextResponse.json({ error: 'Check failed' }, { status: 500 })
  }
}
