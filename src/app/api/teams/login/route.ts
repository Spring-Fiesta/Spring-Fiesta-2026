import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Team from '@/models/Team'
import { cookies } from 'next/headers'

// POST login
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { name, password } = await request.json()
    
    const team = await Team.findOne({ name, password })
    
    if (!team) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set('teamId', team._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    })
    
    return NextResponse.json({ 
      success: true, 
      team: { 
        id: team._id, 
        name: team.name,
        score: team.score 
      } 
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
