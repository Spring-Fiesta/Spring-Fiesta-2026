const mongoose = require('mongoose')
const path = require('path')
const fsPromises = require('fs').promises
const fs = require('fs')
const cloudinary = require('cloudinary').v2
require('dotenv').config({ path: '.env.local' })

// Initialize MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

console.log('Cloudinary Config:', {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY ? '***' : 'missing',
})

// Team Member Schema
const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, default: 'General' },
  imageUrl: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true })

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema)

// Hardcoded data
const coreTeam = [
  { name: 'Devansh Kushwaha', designation: 'Fest Secretary', image: '/images/CoreTeam/Devansh_Kushwaha.webp', department: 'Management' },
  { name: 'Padam Mantry', designation: 'Core Management', image: '/images/CoreTeam/MGMT/Core/Padam_mantry.webp', department: 'Management' },
  { name: 'Yashraj Kulshrestha', designation: 'Core Management', image: '/images/CoreTeam/MGMT/Core/Yashraj_Kulshrestha.webp', department: 'Management' },
  { name: 'Shashank Jharaniya', designation: 'Core Management', image: '/images/CoreTeam/MGMT/Core/Shashank_jhariya.webp', department: 'Management' },
  { name: 'Preet Khatri', designation: 'Core Management', image: '/images/CoreTeam/MGMT/Core/Preet_khatri.webp', department: 'Management' },
  { name: 'Tanishq Saini', designation: 'PR & Outreach Head', image: '/images/CoreTeam/PR_and_Outreach/Heads/Tanishq_Saini_Head1.webp', department: 'PR' },
  { name: 'Heet Goyani', designation: 'PR & Outreach Head', image: '/images/CoreTeam/PR_and_Outreach/Heads/Heet_Goyani_Head1.webp', department: 'PR' },
  { name: 'Aditya Sharma', designation: 'Web Developer', image: '/images/CoreTeam/Developers/Aditya_Sharma.webp', department: 'Technical' },
  { name: 'Akash Yadav', designation: 'Web Developer', image: '/images/CoreTeam/Developers/akash_yadav.webp', department: 'Technical' },
  { name: 'Swayam Behera', designation: 'Design Head', image: '/images/CoreTeam/Developers/Swayam_Behera.webp', department: 'Design' },
  { name: 'Chaitanya Chandarkar', designation: 'Cultural Head', image: '/images/CoreTeam/Cultural_committee/Chaitanya_Chandarkar_Head.webp', department: 'Cultural' },
  { name: 'Parkhar Mishra', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Parkhar_Mishra.webp', department: 'Coding' },
  { name: 'Nachos', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Nachos.webp', department: 'Coding' },
  { name: 'Rutwik Dhale', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Rutwik_Dhale.webp', department: 'Coding' },
  { name: 'Pankaj Mandal', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Pankaj_Mandal.webp', department: 'Coding' },
  { name: 'Harsh Singh', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Harsh_Singh.webp', department: 'Coding' },
  { name: 'Shrey Shah', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Shreh_Shah.webp', department: 'Coding' },
  { name: 'Vivek Kumar', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Vivek_kumar.webp', department: 'Coding' },
  { name: 'Jeet Soni', designation: 'Robotics Head', image: '/images/CoreTeam/Robotics_committee/CORE/Jeet_head.webp', department: 'Robotics' },
  { name: 'Prashant', designation: 'Robotics Head', image: '/images/CoreTeam/Robotics_committee/CORE/Prashant_head.webp', department: 'Robotics' },
  { name: 'Abhilasha Supe', designation: 'Robotics Core Team', image: '/images/CoreTeam/Robotics_committee/CORE/Abhilasha_core.webp', department: 'Robotics' },
  { name: 'Sushant', designation: 'Robotics Core Team', image: '/images/CoreTeam/Robotics_committee/CORE/Sushant_core.webp', department: 'Robotics' },
  { name: 'Harhvardhan Mani Tripathi', designation: 'E-Summit Head', image: '/images/CoreTeam/E-Summit_Committee/Heads/Harshvardhan_Tripathi.webp', department: 'E-Summit' },
  { name: 'Arya Trivedi', designation: 'E-Summit Head', image: '/images/CoreTeam/E-Summit_Committee/Heads/Arya_Trivedi.webp', department: 'E-Summit' },
  { name: 'Pratham Sachan', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Pratham_Sachan.webp', department: 'E-Summit' },
  { name: 'Ruchita Agarwal', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Ruchita_Agarwal.webp', department: 'E-Summit' },
  { name: 'Preksha Upadhyay', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Preksha_Upadhyay.webp', department: 'E-Summit' },
  { name: 'Bhumil Rangholiya', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Bhumil_Rangholiya.webp', department: 'E-Summit' },
  { name: 'Abhishek Tiwari', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Abhishek_Tiwari.webp', department: 'E-Summit' },
  { name: 'Danish Ansari', designation: 'Sports Head', image: '/images/CoreTeam/Sports_committee/Danish_Ansari_head.webp', department: 'Sports' },
  { name: 'Meet Harsoda', designation: 'Sports Head', image: '/images/CoreTeam/Sports_committee/Meet_Harsoda_head.webp', department: 'Sports' },
  { name: 'Manoj Rathod', designation: 'Sports Head', image: '/images/CoreTeam/Sports_committee/Rathod_manoj_sports_head.webp', department: 'Sports' },
  { name: 'Sujal Tiwari', designation: 'Sports Head', image: '/images/CoreTeam/Sports_committee/Sujal_Tiwari_head.webp', department: 'Sports' },
  { name: 'Vipin Sharma', designation: 'Art & Design', image: '/images/CoreTeam/Abstract_committee/Vipin_Sharma.webp', department: 'Art & Design' },
  { name: 'Hamesh Puniya', designation: 'Art & Design', image: '/images/CoreTeam/Abstract_committee/Hamesh_Puniya.webp', department: 'Art & Design' },
  { name: 'Dhyey Savaliya', designation: 'Media Head', image: '/images/CoreTeam/Media_Cell/Heads/Dhyey_Savaliya.webp', department: 'Media' },
  { name: 'Anmol Kumar', designation: 'Media Head', image: '/images/CoreTeam/Media_Cell/Heads/Anmol_Kumar.webp', department: 'Media' },
  { name: 'Pranav Garasiya', designation: 'Media Head', image: '/images/CoreTeam/Media_Cell/Heads/Pranav_Garasiya.webp', department: 'Media' },
  { name: 'Satyam Ranjan', designation: 'Content Head', image: '/images/CoreTeam/Content_Committee/Core/Satyam_Ranjan.webp', department: 'Content' },
  { name: 'Nakul Mantri', designation: 'Content Head', image: '/images/CoreTeam/Content_committee/Core/Nakul_Mantri.webp', department: 'Content' },
]

// Log to file helper
const logStream = fs.createWriteStream('seed-log.txt', { flags: 'a' });
const originalLog = console.log;
const originalError = console.error;

console.log = function(...args) {
    const msg = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg).join(' ');
    logStream.write(msg + '\n');
    originalLog.apply(console, args);
};

console.error = function(...args) {
    const msg = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg).join(' ');
    logStream.write('ERROR: ' + msg + '\n');
    originalError.apply(console, args);
};

async function seed() {
  try {
    console.log('🌱 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    for (let i = 0; i < coreTeam.length; i++) {
        const member = coreTeam[i]
        console.log(`Processing ${member.name} (${i + 1}/${coreTeam.length})...`)

        let imageUrl = member.image // Default to local path if upload fails, or simple string

        // 1. Read local file or use placeholder
        let base64Image
        const imagePath = path.join(process.cwd(), 'public', member.image.startsWith('/') ? member.image.slice(1) : member.image)
        
        try {
          await fsPromises.access(imagePath)
          const fileBuffer = await fsPromises.readFile(imagePath)
          base64Image = `data:image/webp;base64,${fileBuffer.toString('base64')}`
        } catch (e) {
          console.warn(`   ⚠️ Image not found: ${imagePath}`)
          // 1x1 pixel gray placeholder
          base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='
        }

        try {
            const uploadResult = await cloudinary.uploader.upload(base64Image, {
                folder: 'spring-fiesta/team',
                resource_type: 'auto'
            })
            imageUrl = uploadResult.secure_url
            console.log(`   ☁️ Uploaded to Cloudinary: ${imageUrl}`)
        } catch (uploadError) {
            console.error(`   ❌ Cloudinary upload failed: ${uploadError.message}`)
            // Fallback to placeholder value or keep the local path string?
            // If upload fails, better to use the placeholder URL or just fail?
            // Let's use the local path string as fallback, but it won't work in production if images aren't there.
        }

        // Upsert
        await TeamMember.findOneAndUpdate(
            { name: member.name },
            {
                name: member.name,
                designation: member.designation,
                department: member.department,
                imageUrl: imageUrl,
                order: i + 1
            },
            { upsert: true, new: true }
        )
    }

    console.log('🎉 Seeding complete!')

  } catch (err) {
    console.error('Fatal error:', err)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

seed()
