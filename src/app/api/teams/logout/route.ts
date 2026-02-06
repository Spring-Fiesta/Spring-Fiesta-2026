import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// GET logout
export async function GET() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('teamId')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}
