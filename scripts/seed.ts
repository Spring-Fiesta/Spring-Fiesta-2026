/**
 * Complete Database Seed Script
 * Seeds all data from original Spring Fiesta 2024 project
 * 
 * Run with: npx ts-node --esm scripts/seed.ts
 * Or: npx tsx scripts/seed.ts
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/springfiesta'

// ===== SCHEMA DEFINITIONS =====

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  time: String,
  date: String,
  day: { type: Number, required: true }, // 1, 2, or 3
  section: { type: Number, default: 0 }, // 0 = morning, 1 = evening
  link: String,
  venue: String,
  category: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: String,
  image: String,
  department: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

const sponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  tier: { type: String, enum: ['title', 'associate', 'sponsor'], default: 'sponsor' },
  website: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

const galleryImageSchema = new mongoose.Schema({
  src: { type: String, required: true },
  alt: String,
  category: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

const siteConfigSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: mongoose.Schema.Types.Mixed,
  updatedAt: { type: Date, default: Date.now }
})

// ===== DATA =====

// Day 1 Events - April 10th
const day1Events = [
  // Morning Section
  { day: 1, section: 0, time: '09:00-11:00 AM', title: 'Code Relay', description: 'A race against time, logic, and teamwork! The Code Relay Competition is a unique programming challenge where teams of three members will collaborate to solve coding problems in a relay format. Each member will have limited time to write their part of the solution before passing it to the next teammate.', link: 'https://unstop.com/o/6BfyvEs?lb=RrLnVks' },
  { day: 1, section: 0, time: '11:00 AM-01:00 PM', title: 'Imagine-a-thon', description: 'Format: Online Round (Inter-College): Participants submit AI-generated images based on given themes. Offline Finale (IIIT Surat): Selected teams compete live, recreating images using AI tools in a time-based challenge.', link: 'https://unstop.com/hackathons/image-ai-thon-prompt-engineering-challenge-spring-fiesta-indian-institute-of-information-technology-iiit-sura-1442814' },
  { day: 1, section: 0, time: '11:00 AM-01:00 PM', title: 'Front-end Challenge', description: 'The Frontend Challenge is an exclusive event for 1st and 2nd-year students of IIIT Surat, designed to enhance their HTML & CSS skills through a hands-on, competitive experience.', link: 'https://tinyurl.com/frontend-challenge' },
  { day: 1, section: 0, time: '01:00-03:00 PM', title: 'IPL Auction', description: 'Bid. Strategize. Build Your Dream Team! Step into the shoes of a franchise owner and experience the thrill of an IPL-style auction!', link: 'https://unstop.com/competitions/ipl-auction-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1444194' },
  // Evening Section
  { day: 1, section: 1, time: '04:00-06:00 PM', title: 'Robo Sumo', description: 'Build. Battle. Dominate! Step into the ultimate robotic showdown where engineering meets strategy! RoboSumo challenges participants to design and build wired or wireless robots capable of engaging in a push-out battle.', link: 'https://unstop.com/competitions/robo-sumo-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1443436' },
  { day: 1, section: 1, time: '06:00-09:00 PM', title: 'Open Mic', description: '' },
  { day: 1, section: 1, time: '09:00-10:30 PM', title: 'Standup Show', description: '' },
]

// Day 2 Events - April 11th
const day2Events = [
  // Morning Section
  { day: 2, section: 0, time: '09:00AM - 12:00PM', title: 'Corporate Crime', description: '', link: 'https://www.google.com' },
  { day: 2, section: 0, time: '12:00PM - 02:00PM', title: 'Speed Code', description: 'Code fast. Think smart. Win big! Get ready for the ultimate test of speed and problem-solving skills in the Speed Code Competition!', link: 'https://unstop.com/o/uvrqpbx?lb=RrLnVks' },
  { day: 2, section: 0, time: '2:00PM - 4:00PM', title: 'Robo Soccer', description: 'Gear up for the ultimate fusion of robotics and soccer! Robo Soccer challenges participants to design and control wired or wireless robots that can skillfully maneuver a ball.', link: 'https://unstop.com/competitions/robosoccer-2025-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1443154' },
  // Evening Section
  { day: 2, section: 1, time: '05:00PM - 05:45PM', title: 'Chief Guest', description: '', link: 'https://www.google.com' },
  { day: 2, section: 1, time: '05:45PM - 09:30PM', title: 'Cultural Night', description: '', link: 'https://www.google.com' },
  { day: 2, section: 1, time: '09:30PM - 11:00PM', title: 'Band Night', description: '', link: 'https://www.google.com' },
]

// Day 3 Events - April 12th
const day3Events = [
  // Morning Section
  { day: 3, section: 0, time: '09:00 AM - 11:00 AM', title: 'Cadmania (Online)', description: 'CADMANIA is an annual 3D modeling competition organized as part of the Spring Fiesta 2025 at Indian Institute of Information Technology, Surat.', link: 'https://www.google.com' },
  { day: 3, section: 0, time: '09:00 AM - 11:00 AM', title: 'CircuitJam (Online)', description: 'Circuit Jam is an exciting and intellectually stimulating circuit design competition aimed at testing participants\' knowledge, creativity, and problem-solving skills.', link: 'https://unstop.com/competitions/circuit-jam-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1443813' },
  { day: 3, section: 0, time: '09:00 AM - 11:00 AM', title: 'Brandathon', description: 'Brandathon is an exciting competition designed to challenge creative minds in branding, marketing, and business strategy.', link: 'https://unstop.com/competitions/brandathon-innovate-strategize-and-pitch-spring-fiesta-indian-institute-of-information-technology-iiit-sura-1441593' },
  { day: 3, section: 0, time: '09:00 AM - 11:00 AM', title: 'Squid Game', description: 'Squid Game: Escape Room is a thrilling logic, coding, and puzzle-solving challenge designed to test problem-solving skills, logical reasoning, and cybersecurity awareness.', link: 'https://unstop.com/quiz/squid-game-escape-room-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1444467' },
  { day: 3, section: 0, time: '11:00 AM - 01:00 PM', title: 'Debugging', description: 'Think you have what it takes to spot and fix errors like a pro? Welcome to the Code Debugging Competition!', link: 'https://unstop.com/o/wcSnihJ?lb=RrLnVks' },
  { day: 3, section: 0, time: '01:00 PM - 03:00 PM', title: 'Dev Heat Finale', description: 'Dev Heat is IIIT Surat\'s flagship inter-college hackathon, where students tackle real-world problems with innovative full-stack solutions.', link: 'https://unstop.com/hackathons/dev-heat-hackathon-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1442105' },
  // Evening Section
  { day: 3, section: 1, time: '01:00 PM - 03:00 PM', title: 'Yuva Sansad', description: 'Coming Soon…', link: 'https://www.google.com' },
  { day: 3, section: 1, time: '04:00 PM - 06:00 PM', title: 'Cultural Showdown', description: '', link: 'https://www.google.com' },
  { day: 3, section: 1, time: '06:00 PM - 07:45 PM', title: 'Speaker Session', description: '', link: 'https://www.google.com' },
  { day: 3, section: 1, time: '07:45 PM - 09:00 PM', title: 'Cultural Showdown', description: '', link: 'https://www.google.com' },
  { day: 3, section: 1, time: '09:30 PM - 11:00 PM', title: 'DJ Night', description: '', link: 'https://www.google.com' },
]

// Core Team Members - Complete list from coreTeam.json
const teamMembers = [
  { name: 'Devansh Kushwaha', designation: 'Fest Secretary', image: '/images/CoreTeam/Devansh_Kushwaha.webp', department: 'Management', order: 1 },
  { name: 'Padam Mantry', designation: 'Core Management', image: '/images/CoreTeam/MGMT/Core/Padam_mantry.webp', department: 'Management', order: 2 },
  { name: 'Yashraj Kulshrestha', designation: 'Core Management', image: '/images/CoreTeam/MGMT/Core/Yashraj_Kulshrestha.webp', department: 'Management', order: 3 },
  { name: 'Shashank Jharaniya', designation: 'Core Management', image: '/images/CoreTeam/MGMT/Core/Shashank_jhariya.webp', department: 'Management', order: 4 },
  { name: 'Preet Khatri', designation: 'Core Management', image: '/images/CoreTeam/MGMT/Core/Preet_khatri.webp', department: 'Management', order: 5 },
  { name: 'Tanishq Saini', designation: 'PR & Outreach Head', image: '/images/CoreTeam/PR_and_Outreach/Heads/Tanishq_Saini_Head1.webp', department: 'PR & Outreach', order: 6 },
  { name: 'Heet Goyani', designation: 'PR & Outreach Head', image: '/images/CoreTeam/PR_and_Outreach/Heads/Heet_Goyani_Head1.webp', department: 'PR & Outreach', order: 7 },
  { name: 'Aditya Sharma', designation: 'Web Developer', image: '/images/CoreTeam/Developers/Aditya_Sharma.webp', department: 'Developers', order: 8 },
  { name: 'Akash Yadav', designation: 'Web Developer', image: '/images/CoreTeam/Developers/akash_yadav.webp', department: 'Developers', order: 9 },
  { name: 'Swayam Behera', designation: 'Design Head', image: '/images/CoreTeam/Developers/Swayam_Behera.webp', department: 'Developers', order: 10 },
  { name: 'Chaitanya Chandarkar', designation: 'Cultural Head', image: '/images/CoreTeam/Cultural_committee/Chaitanya_Chandarkar_Head.webp', department: 'Cultural', order: 11 },
  { name: 'Parkhar Mishra', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Parkhar_Mishra.webp', department: 'Coding', order: 12 },
  { name: 'Nachos', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Nachos.webp', department: 'Coding', order: 13 },
  { name: 'Rutwik Dhale', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Rutwik_Dhale.webp', department: 'Coding', order: 14 },
  { name: 'Pankaj Mandal', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Pankaj_Mandal.webp', department: 'Coding', order: 15 },
  { name: 'Harsh Singh', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Harsh_Singh.webp', department: 'Coding', order: 16 },
  { name: 'Shrey Shah', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Shreh_Shah.webp', department: 'Coding', order: 17 },
  { name: 'Vivek Kumar', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Vivek_kumar.webp', department: 'Coding', order: 18 },
  { name: 'Jeet Soni', designation: 'Robotics Head', image: '/images/CoreTeam/Robotics_committee/CORE/Jeet_head.webp', department: 'Robotics', order: 19 },
  { name: 'Prashant', designation: 'Robotics Head', image: '/images/CoreTeam/Robotics_committee/CORE/Prashant_head.webp', department: 'Robotics', order: 20 },
  { name: 'Abhilasha Supe', designation: 'Robotics Core Team', image: '/images/CoreTeam/Robotics_committee/CORE/Abhilasha_core.webp', department: 'Robotics', order: 21 },
  { name: 'Sushant', designation: 'Robotics Core Team', image: '/images/CoreTeam/Robotics_committee/CORE/Sushant_core.webp', department: 'Robotics', order: 22 },
  { name: 'Harhvardhan Mani Tripathi', designation: 'E-Summit Head', image: '/images/CoreTeam/E-Summit_Committee/Heads/Harshvardhan_Tripathi.webp', department: 'E-Summit', order: 23 },
  { name: 'Arya Trivedi', designation: 'E-Summit Head', image: '/images/CoreTeam/E-Summit_Committee/Heads/Arya_Trivedi.webp', department: 'E-Summit', order: 24 },
  { name: 'Pratham Sachan', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Pratham_Sachan.webp', department: 'E-Summit', order: 25 },
  { name: 'Ruchita Agarwal', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Ruchita_Agarwal.webp', department: 'E-Summit', order: 26 },
  { name: 'Preksha Upadhyay', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Preksha_Upadhyay.webp', department: 'E-Summit', order: 27 },
  { name: 'Bhumil Rangholiya', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Bhumil_Rangholiya.webp', department: 'E-Summit', order: 28 },
  { name: 'Abhishek Tiwari', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Abhishek_Tiwari.webp', department: 'E-Summit', order: 29 },
  { name: 'Danish Ansari', designation: 'Sports Head', image: '/images/CoreTeam/Sports_committee/Danish_Ansari_head.webp', department: 'Sports', order: 30 },
  { name: 'Meet Harsoda', designation: 'Sports Head', image: '/images/CoreTeam/Sports_committee/Meet_Harsoda_head.webp', department: 'Sports', order: 31 },
  { name: 'Manoj Rathod', designation: 'Sports Head', image: '/images/CoreTeam/Sports_committee/Rathod_manoj_sports_head.webp', department: 'Sports', order: 32 },
  { name: 'Sujal Tiwari', designation: 'Sports Head', image: '/images/CoreTeam/Sports_committee/Sujal_Tiwari_head.webp', department: 'Sports', order: 33 },
  { name: 'Vipin Sharma', designation: 'Art & Design', image: '/images/CoreTeam/Abstract_committee/Vipin_Sharma.webp', department: 'Abstract', order: 34 },
  { name: 'Hamesh Puniya', designation: 'Art & Design', image: '/images/CoreTeam/Abstract_committee/Hamesh_Puniya.webp', department: 'Abstract', order: 35 },
  { name: 'Dhyey Savaliya', designation: 'Media Head', image: '/images/CoreTeam/Media_Cell/Heads/Dhyey_Savaliya.webp', department: 'Media', order: 36 },
  { name: 'Anmol Kumar', designation: 'Media Head', image: '/images/CoreTeam/Media_Cell/Heads/Anmol_Kumar.webp', department: 'Media', order: 37 },
  { name: 'Pranav Garasiya', designation: 'Media Head', image: '/images/CoreTeam/Media_Cell/Heads/Pranav_Garasiya.webp', department: 'Media', order: 38 },
  { name: 'Satyam Ranjan', designation: 'Content Head', image: '/images/CoreTeam/Content_Committee/Core/Satyam_Ranjan.webp', department: 'Content', order: 39 },
  { name: 'Nakul Mantri', designation: 'Content Head', image: '/images/CoreTeam/Content_committee/Core/Nakul_Mantri.webp', department: 'Content', order: 40 },
]

// Sponsors - Complete list
const sponsors = [
  // Title Sponsors
  { name: 'SBI', logo: '/images/sbi_logo.png', tier: 'title', order: 1 },
  { name: 'Canara Bank', logo: '/images/canara.png', tier: 'title', order: 2 },
  // Associate Sponsors
  { name: 'EaseMyTrip', logo: '/images/ease_my_trip_logo.png', tier: 'associate', order: 3 },
  { name: 'StockGro', logo: '/images/stockgro_logo.png', tier: 'associate', order: 4 },
  { name: 'Mother Dairy', logo: '/images/mother_diary_logo.png', tier: 'associate', order: 5 },
  // Regular Sponsors
  { name: 'BenQ', logo: '/images/benq.png', tier: 'sponsor', order: 6 },
  { name: 'Knowledge Minds', logo: '/images/km_logo.png', tier: 'sponsor', order: 7 },
  { name: 'Mey Mey', logo: '/images/mey_mey_logo.png', tier: 'sponsor', order: 8 },
  { name: 'Coding Sponsor 1', logo: '/images/coding_sponsor_logo.webp', tier: 'sponsor', order: 9 },
  { name: 'Coding Sponsor 2', logo: '/images/coding_sponsor_logo2.png', tier: 'sponsor', order: 10 },
]

// Gallery Images - 30 images
const galleryImages = Array.from({ length: 30 }, (_, i) => ({
  src: `/images/gallerySlider/image${i + 1}.webp`,
  alt: `Spring Fiesta Gallery Image ${i + 1}`,
  category: 'gallery',
  order: i + 1,
}))

// Site Configuration
const siteConfig = [
  { key: 'siteName', value: 'Spring Fiesta 2025' },
  { key: 'siteDescription', value: 'Annual Tech-Cultural Fest of IIIT Surat' },
  { key: 'eventDates', value: { start: '2025-04-10', end: '2025-04-12' } },
  { key: 'theme', value: { primary: '#FF204E', secondary: '#23203C', accent: '#A01539' } },
  { key: 'socialLinks', value: { instagram: 'https://instagram.com/springfiesta', linkedin: 'https://linkedin.com/springfiesta' } },
]

// ===== SEED FUNCTION =====

async function seed() {
  console.log('🌱 Starting database seed...\n')

  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    // Get or create models
    const Event = mongoose.models.Event || mongoose.model('Event', eventSchema)
    const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema)
    const Sponsor = mongoose.models.Sponsor || mongoose.model('Sponsor', sponsorSchema)
    const GalleryImage = mongoose.models.GalleryImage || mongoose.model('GalleryImage', galleryImageSchema)
    const SiteConfig = mongoose.models.SiteConfig || mongoose.model('SiteConfig', siteConfigSchema)

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await Event.deleteMany({})
    await TeamMember.deleteMany({})
    await Sponsor.deleteMany({})
    await GalleryImage.deleteMany({})
    await SiteConfig.deleteMany({})
    console.log('✅ Cleared existing data\n')

    // Seed Events
    console.log('📅 Seeding events...')
    const allEvents = [...day1Events, ...day2Events, ...day3Events]
    await Event.insertMany(allEvents)
    console.log(`✅ Seeded ${allEvents.length} events\n`)

    // Seed Team Members
    console.log('👥 Seeding team members...')
    await TeamMember.insertMany(teamMembers)
    console.log(`✅ Seeded ${teamMembers.length} team members\n`)

    // Seed Sponsors
    console.log('🏢 Seeding sponsors...')
    await Sponsor.insertMany(sponsors)
    console.log(`✅ Seeded ${sponsors.length} sponsors\n`)

    // Seed Gallery Images
    console.log('🖼️  Seeding gallery images...')
    await GalleryImage.insertMany(galleryImages)
    console.log(`✅ Seeded ${galleryImages.length} gallery images\n`)

    // Seed Site Config
    console.log('⚙️  Seeding site configuration...')
    await SiteConfig.insertMany(siteConfig)
    console.log(`✅ Seeded ${siteConfig.length} config items\n`)

    console.log('═'.repeat(50))
    console.log('🎉 DATABASE SEEDING COMPLETE!')
    console.log('═'.repeat(50))
    console.log(`
Summary:
  • Events: ${allEvents.length}
    - Day 1: ${day1Events.length}
    - Day 2: ${day2Events.length}
    - Day 3: ${day3Events.length}
  • Team Members: ${teamMembers.length}
  • Sponsors: ${sponsors.length}
  • Gallery Images: ${galleryImages.length}
  • Site Config: ${siteConfig.length}
`)

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
    console.log('👋 Disconnected from MongoDB')
  }
}

// Run the seed
seed()
