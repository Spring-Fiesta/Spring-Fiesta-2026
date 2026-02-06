const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

// Initialize MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/spring-fiesta-2026'

// Model schemas (inline for seed script)
const EventSchema = new mongoose.Schema({
  day: Number,
  time: String,
  title: String,
  description: String,
  link: String,
  order: Number,
})

const TeamMemberSchema = new mongoose.Schema({
  name: String,
  designation: String,
  department: String,
  imageUrl: String,
  order: Number,
})

const SponsorSchema = new mongoose.Schema({
  name: String,
  logoUrl: String,
  tier: String,
  website: String,
  order: Number,
})

const GalleryImageSchema = new mongoose.Schema({
  imageUrl: String,
  altText: String,
  isCarousel: Boolean,
  order: Number,
})

const SiteConfigSchema = new mongoose.Schema({
  mainLogo: String,
  instituteLogo: String,
  festName: String,
  festYear: String,
  contactEmail: String,
  address: String,
  socialLinks: [{ platform: String, url: String }],
  footerText: String,
})

// Events data
const eventsData = [
  // Day 1 (April 10)
  { day: 1, time: "09:00-11:00 AM", title: "Code Relay", description: "A race against time, logic, and teamwork! Teams of 3 collaborate to solve coding problems in a relay format.", link: "https://unstop.com/o/6BfyvEs?lb=RrLnVks", order: 1 },
  { day: 1, time: "11:00 AM-01:00 PM", title: "Imagine-a-thon", description: "Prompt Engineering Challenge - AI image generation competition.", link: "https://unstop.com/hackathons/image-ai-thon-prompt-engineering-challenge-spring-fiesta-indian-institute-of-information-technology-iiit-sura-1442814", order: 2 },
  { day: 1, time: "11:00 AM-01:00 PM", title: "Front-end Challenge", description: "HTML & CSS skills competition for 1st and 2nd year students on CSSBattle.dev.", link: "https://tinyurl.com/frontend-challenge", order: 3 },
  { day: 1, time: "01:00-03:00 PM", title: "IPL Auction", description: "Step into the shoes of a franchise owner and experience the thrill of an IPL-style auction!", link: "https://unstop.com/competitions/ipl-auction-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1444194", order: 4 },
  { day: 1, time: "04:00-06:00 PM", title: "Robo Sumo", description: "Build robots capable of engaging in a push-out battle in the arena!", link: "https://unstop.com/competitions/robo-sumo-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1443436", order: 5 },
  { day: 1, time: "06:00-09:00 PM", title: "Open Mic", description: "Showcase your talent on stage!", order: 6 },
  { day: 1, time: "09:00-10:30 PM", title: "Standup Show", description: "Comedy night with talented performers.", order: 7 },
  
  // Day 2 (April 11)
  { day: 2, time: "09:00 AM-12:00 PM", title: "Corporate Crime", description: "Treasure hunt style quiz competition.", link: "https://www.google.com", order: 1 },
  { day: 2, time: "12:00 PM-02:00 PM", title: "Speed Code", description: "Race against time to solve as many coding challenges as possible!", link: "https://unstop.com/o/uvrqpbx?lb=RrLnVks", order: 2 },
  { day: 2, time: "02:00 PM-04:00 PM", title: "Robo Soccer", description: "Design and control robots that can score goals in this thrilling competition!", link: "https://unstop.com/competitions/robosoccer-2025-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1443154", order: 3 },
  { day: 2, time: "05:00 PM-05:45 PM", title: "Chief Guest", description: "Special guest appearance.", link: "https://www.google.com", order: 4 },
  { day: 2, time: "05:45 PM-09:30 PM", title: "Cultural Night", description: "A night full of cultural performances.", link: "https://www.google.com", order: 5 },
  { day: 2, time: "09:30 PM-11:00 PM", title: "Band Night", description: "Live music performance.", link: "https://www.google.com", order: 6 },
  
  // Day 3 (April 12)
  { day: 3, time: "09:00 AM-11:00 AM", title: "Cadmania (Online)", description: "3D modeling competition - 96 hours to complete designs.", link: "https://www.google.com", order: 1 },
  { day: 3, time: "09:00 AM-11:00 AM", title: "CircuitJam (Online)", description: "Circuit design competition testing analog, digital, and embedded systems skills.", link: "https://unstop.com/competitions/circuit-jam-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1443813", order: 2 },
  { day: 3, time: "09:00 AM-11:00 AM", title: "Brandathon", description: "Branding, marketing, and business strategy competition.", link: "https://unstop.com/competitions/brandathon-innovate-strategize-and-pitch-spring-fiesta-indian-institute-of-information-technology-iiit-sura-1441593", order: 3 },
  { day: 3, time: "09:00 AM-11:00 AM", title: "Squid Game", description: "Logic, coding, and puzzle-solving escape room challenge.", link: "https://unstop.com/quiz/squid-game-escape-room-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1444467", order: 4 },
  { day: 3, time: "11:00 AM-01:00 PM", title: "Debugging", description: "Spot and fix code errors in the shortest time possible!", link: "https://unstop.com/o/wcSnihJ?lb=RrLnVks", order: 5 },
  { day: 3, time: "01:00 PM-03:00 PM", title: "Dev Heat Finale", description: "Flagship inter-college hackathon with live pitching.", link: "https://unstop.com/hackathons/dev-heat-hackathon-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1442105", order: 6 },
  { day: 3, time: "01:00 PM-03:00 PM", title: "Yuva Sansad", description: "Youth Parliament session.", link: "https://www.google.com", order: 7 },
  { day: 3, time: "04:00 PM-06:00 PM", title: "Cultural Showdown", description: "Cultural competition showcase.", link: "https://www.google.com", order: 8 },
  { day: 3, time: "06:00 PM-07:45 PM", title: "Speaker Session", description: "Guest speaker session.", link: "https://www.google.com", order: 9 },
  { day: 3, time: "07:45 PM-09:00 PM", title: "Cultural Showdown", description: "Evening cultural performances.", link: "https://www.google.com", order: 10 },
  { day: 3, time: "09:30 PM-11:00 PM", title: "DJ Night", description: "Closing night party!", link: "https://www.google.com", order: 11 },
]

// Team members
const teamMembersData = [
  { name: "Devansh Kushwaha", designation: "Fest Secretary", imageUrl: "/images/CoreTeam/Devansh_Kushwaha.webp", department: "Management", order: 1 },
  { name: "Padam Mantry", designation: "Core Management", imageUrl: "/images/CoreTeam/MGMT/Core/Padam_mantry.webp", department: "Management", order: 2 },
  { name: "Yashraj Kulshrestha", designation: "Core Management", imageUrl: "/images/CoreTeam/MGMT/Core/Yashraj_Kulshrestha.webp", department: "Management", order: 3 },
  { name: "Shashank Jharaniya", designation: "Core Management", imageUrl: "/images/CoreTeam/MGMT/Core/Shashank_jhariya.webp", department: "Management", order: 4 },
  { name: "Preet Khatri", designation: "Core Management", imageUrl: "/images/CoreTeam/MGMT/Core/Preet_khatri.webp", department: "Management", order: 5 },
  { name: "Tanishq Saini", designation: "PR & Outreach Head", imageUrl: "/images/CoreTeam/PR_and_Outreach/Heads/Tanishq_Saini_Head1.webp", department: "PR", order: 6 },
  { name: "Heet Goyani", designation: "PR & Outreach Head", imageUrl: "/images/CoreTeam/PR_and_Outreach/Heads/Heet_Goyani_Head1.webp", department: "PR", order: 7 },
  { name: "Aditya Sharma", designation: "Web Developer", imageUrl: "/images/CoreTeam/Developers/Aditya_Sharma.webp", department: "Technical", order: 8 },
  { name: "Akash Yadav", designation: "Web Developer", imageUrl: "/images/CoreTeam/Developers/akash_yadav.webp", department: "Technical", order: 9 },
  { name: "Swayam Behera", designation: "Design Head", imageUrl: "/images/CoreTeam/Developers/Swayam_Behera.webp", department: "Design", order: 10 },
  { name: "Chaitanya Chandarkar", designation: "Cultural Head", imageUrl: "/images/CoreTeam/Cultural_committee/Chaitanya_Chandarkar_Head.webp", department: "Cultural", order: 11 },
  { name: "Parkhar Mishra", designation: "Core Team Coding", imageUrl: "/images/CoreTeam/Coding_Committee/Core/Parkhar_Mishra.webp", department: "Coding", order: 12 },
  { name: "Jeet Soni", designation: "Robotics Head", imageUrl: "/images/CoreTeam/Robotics_committee/CORE/Jeet_head.webp", department: "Robotics", order: 13 },
  { name: "Danish Ansari", designation: "Sports Head", imageUrl: "/images/CoreTeam/Sports_committee/Danish_Ansari_head.webp", department: "Sports", order: 14 },
  { name: "Dhyey Savaliya", designation: "Media Head", imageUrl: "/images/CoreTeam/Media_Cell/Heads/Dhyey_Savaliya.webp", department: "Media", order: 15 },
]

// Sponsors
const sponsorsData = [
  { name: "BenQ", logoUrl: "/images/benq.png", tier: "title", order: 1 },
  { name: "Canara Bank", logoUrl: "/images/canara.png", tier: "associate", order: 1 },
  { name: "StockGro", logoUrl: "/images/stockgro_logo.png", tier: "associate", order: 2 },
  { name: "SBI", logoUrl: "/images/sbi_logo.png", tier: "associate", order: 3 },
  { name: "EaseMyTrip", logoUrl: "/images/ease_my_trip_logo.png", tier: "associate", order: 4 },
  { name: "Mey Mey", logoUrl: "/images/mey_mey_logo.png", tier: "regular", order: 1 },
  { name: "KM", logoUrl: "/images/km_logo.png", tier: "regular", order: 2 },
  { name: "Mother Dairy", logoUrl: "/images/mother_diary_logo.png", tier: "regular", order: 3 },
]

// Gallery images
const galleryImagesData = Array.from({ length: 30 }, (_, i) => ({
  imageUrl: `/images/gallerySlider/image${i + 1}.webp`,
  altText: `Gallery image ${i + 1}`,
  isCarousel: i < 10,
  order: i + 1,
}))

// Site config
const siteConfigData = {
  mainLogo: '/images/new_logo.png',
  instituteLogo: '/images/iiit_surat.png',
  festName: 'Spring Fiesta',
  festYear: '2026',
  contactEmail: 'springfiesta@iiitsurat.ac.in',
  address: 'Indian Institute of Information Technology, Kholvad Campus, Kamrej, Surat - 394190, Gujarat',
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/springfiesta_iiitsurat' },
    { platform: 'twitter', url: 'https://twitter.com/springfiesta' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/spring-fiesta' },
  ],
  footerText: '© 2026 Spring Fiesta | IIIT Surat',
}

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to MongoDB...')
    console.log(`   URI: ${MONGODB_URI.replace(/\/\/.*@/, '//***@')}`)
    
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Create models
    const Event = mongoose.model('Event', EventSchema)
    const TeamMember = mongoose.model('TeamMember', TeamMemberSchema)
    const Sponsor = mongoose.model('Sponsor', SponsorSchema)
    const GalleryImage = mongoose.model('GalleryImage', GalleryImageSchema)
    const SiteConfig = mongoose.model('SiteConfig', SiteConfigSchema)

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await Event.deleteMany({})
    await TeamMember.deleteMany({})
    await Sponsor.deleteMany({})
    await GalleryImage.deleteMany({})
    await SiteConfig.deleteMany({})

    // Seed data
    console.log('📝 Seeding events...')
    await Event.insertMany(eventsData)
    console.log(`   ✅ Added ${eventsData.length} events`)

    console.log('👥 Seeding team members...')
    await TeamMember.insertMany(teamMembersData)
    console.log(`   ✅ Added ${teamMembersData.length} team members`)

    console.log('🏢 Seeding sponsors...')
    await Sponsor.insertMany(sponsorsData)
    console.log(`   ✅ Added ${sponsorsData.length} sponsors`)

    console.log('🖼️  Seeding gallery images...')
    await GalleryImage.insertMany(galleryImagesData)
    console.log(`   ✅ Added ${galleryImagesData.length} gallery images`)

    console.log('⚙️  Seeding site config...')
    await SiteConfig.create(siteConfigData)
    console.log('   ✅ Added site configuration')

    console.log('\n🎉 Database seeding complete!')
    console.log(`
Summary:
- Events: ${eventsData.length}
- Team Members: ${teamMembersData.length}
- Sponsors: ${sponsorsData.length}
- Gallery Images: ${galleryImagesData.length}
- Site Config: 1
    `)

  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
    console.log('\n💡 Make sure MongoDB is running. You can:')
    console.log('   1. Install MongoDB locally: https://www.mongodb.com/try/download/community')
    console.log('   2. Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas')
    console.log('   3. Update MONGODB_URI in .env.local')
  } finally {
    await mongoose.disconnect()
    console.log('👋 Disconnected from MongoDB')
    process.exit(0)
  }
}

seedDatabase()
