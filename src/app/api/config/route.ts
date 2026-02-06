import { NextRequest, NextResponse } from 'next/server'
import { staticSiteConfig } from '@/lib/static-data'

async function getConfigFromDB() {
  try {
    if (!process.env.MONGODB_URI) {
      return null
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const SiteConfig = (await import('@/models/SiteConfig')).default
    
    await connectDB()
    const config = await SiteConfig.findOne({})
    
    return config
  } catch (error) {
    console.log('MongoDB not available, using static data')
    return null
  }
}

// GET site configuration
export async function GET() {
  try {
    const dbConfig = await getConfigFromDB()
    
    if (dbConfig) {
      return NextResponse.json(dbConfig)
    }
    
    return NextResponse.json(staticSiteConfig)
  } catch (error) {
    console.error('Error fetching site config:', error)
    return NextResponse.json(staticSiteConfig)
  }
}

// PUT update site configuration
export async function PUT(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }
    
    const connectDB = (await import('@/lib/mongodb')).default
    const SiteConfig = (await import('@/models/SiteConfig')).default
    
    await connectDB()
    const body = await request.json()
    const config = await SiteConfig.findOneAndUpdate({}, body, { 
      new: true, 
      upsert: true 
    })
    
    return NextResponse.json(config)
  } catch (error) {
    console.error('Error updating site config:', error)
    return NextResponse.json({ error: 'Failed to update site config' }, { status: 500 })
  }
}
