import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import connectDB from '@/lib/mongodb'
import Question from '@/models/Question'
import Team from '@/models/Team'

// GET current question for team
export async function GET() {
  try {
    const cookieStore = await cookies()
    const teamId = cookieStore.get('teamId')?.value
    
    if (!teamId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    
    await connectDB()
    
    const team = await Team.findById(teamId)
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }
    
    const question = await Question.findOne({ sequenceNumber: team.currentQuestion })
    
    if (!question) {
      return NextResponse.json({ 
        completed: true,
        sequenceNumber: team.currentQuestion 
      })
    }
    
    // Don't send the answer to the frontend!
    return NextResponse.json({
      sequenceNumber: question.sequenceNumber,
      questionText: question.questionText,
      destinationPic: question.destinationPic,
      points: question.points
    })
  } catch (error) {
    console.error('Get question error:', error)
    return NextResponse.json({ error: 'Failed to get question' }, { status: 500 })
  }
}
