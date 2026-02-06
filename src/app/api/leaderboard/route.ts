import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Team from '@/models/Team'

// GET leaderboard
export async function GET() {
  try {
    await connectDB()
    
    const teams = await Team.find({})
      .select('name score timestamp currentQuestion')
      .sort({ score: -1, timestamp: 1 })
      .limit(20)
    
    const leaderboard = teams.map((team, index) => ({
      rank: index + 1,
      teamId: { name: team.name },
      score: team.score,
      timestamp: team.timestamp
    }))
    
    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error('Get leaderboard error:', error)
    return NextResponse.json({ error: 'Failed to get leaderboard' }, { status: 500 })
  }
}
