import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import connectDB from '@/lib/mongodb'
import Question from '@/models/Question'
import Team from '@/models/Team'

// POST check answer
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const teamId = cookieStore.get('teamId')?.value
    
    if (!teamId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    
    const { userAnswer, questionId } = await request.json()
    
    await connectDB()
    
    const team = await Team.findById(teamId)
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }
    
    const question = await Question.findOne({ sequenceNumber: questionId })
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }
    
    // Check if answer is correct (case-insensitive)
    const isCorrect = userAnswer.toLowerCase().trim() === question.answer.toLowerCase().trim()
    
    if (isCorrect) {
      // Update team score and move to next question
      team.score += question.points
      team.currentQuestion += 1
      team.timestamp = new Date()
      await team.save()
      
      return NextResponse.json({ 
        correct: true,
        message: 'Correct! Moving to next question.',
        newScore: team.score
      })
    }
    // data correct
    
    return NextResponse.json({ 
      correct: false,
      message: 'Wrong answer! Try again.'
    })
  } catch (error) {   
    console.error('Check answer error:', error)
    return NextResponse.json({ error: 'Failed to check answer' }, { status: 500 })
  }
}
