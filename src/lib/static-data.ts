// Static fallback data for when MongoDB is not available
// This data is used as a fallback when the database is not connected

export const staticEvents = {
  1: [
    { _id: '1', day: 1, time: "09:00-11:00 AM", title: "Code Relay", description: "A race against time, logic, and teamwork! Teams of 3 collaborate to solve coding problems in a relay format.", link: "https://unstop.com/o/6BfyvEs?lb=RrLnVks", order: 1 },
    { _id: '2', day: 1, time: "11:00 AM-01:00 PM", title: "Imagine-a-thon", description: "Prompt Engineering Challenge - AI image generation competition.", link: "https://unstop.com/hackathons/image-ai-thon-prompt-engineering-challenge-spring-fiesta-indian-institute-of-information-technology-iiit-sura-1442814", order: 2 },
    { _id: '3', day: 1, time: "11:00 AM-01:00 PM", title: "Front-end Challenge", description: "HTML & CSS skills competition for 1st and 2nd year students on CSSBattle.dev.", link: "https://tinyurl.com/frontend-challenge", order: 3 },
    { _id: '4', day: 1, time: "01:00-03:00 PM", title: "IPL Auction", description: "Step into the shoes of a franchise owner and experience the thrill of an IPL-style auction!", link: "https://unstop.com/competitions/ipl-auction-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1444194", order: 4 },
    { _id: '5', day: 1, time: "04:00-06:00 PM", title: "Robo Sumo", description: "Build robots capable of engaging in a push-out battle in the arena!", link: "https://unstop.com/competitions/robo-sumo-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1443436", order: 5 },
    { _id: '6', day: 1, time: "06:00-09:00 PM", title: "Open Mic", description: "Showcase your talent on stage!", order: 6 },
    { _id: '7', day: 1, time: "09:00-10:30 PM", title: "Standup Show", description: "Comedy night with talented performers.", order: 7 },
  ],
  2: [
    { _id: '8', day: 2, time: "09:00 AM-12:00 PM", title: "Corporate Crime", description: "Treasure hunt style quiz competition.", link: "https://www.google.com", order: 1 },
    { _id: '9', day: 2, time: "12:00 PM-02:00 PM", title: "Speed Code", description: "Race against time to solve as many coding challenges as possible!", link: "https://unstop.com/o/uvrqpbx?lb=RrLnVks", order: 2 },
    { _id: '10', day: 2, time: "02:00 PM-04:00 PM", title: "Robo Soccer", description: "Design and control robots that can score goals in this thrilling competition!", link: "https://unstop.com/competitions/robosoccer-2025-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1443154", order: 3 },
    { _id: '11', day: 2, time: "05:00 PM-05:45 PM", title: "Chief Guest", description: "Special guest appearance.", link: "https://www.google.com", order: 4 },
    { _id: '12', day: 2, time: "05:45 PM-09:30 PM", title: "Cultural Night", description: "A night full of cultural performances.", link: "https://www.google.com", order: 5 },
    { _id: '13', day: 2, time: "09:30 PM-11:00 PM", title: "Band Night", description: "Live music performance.", link: "https://www.google.com", order: 6 },
  ],
  3: [
    { _id: '14', day: 3, time: "09:00 AM-11:00 AM", title: "Cadmania (Online)", description: "3D modeling competition - 96 hours to complete designs.", link: "https://www.google.com", order: 1 },
    { _id: '15', day: 3, time: "09:00 AM-11:00 AM", title: "CircuitJam (Online)", description: "Circuit design competition testing analog, digital, and embedded systems skills.", link: "https://unstop.com/competitions/circuit-jam-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1443813", order: 2 },
    { _id: '16', day: 3, time: "09:00 AM-11:00 AM", title: "Brandathon", description: "Branding, marketing, and business strategy competition.", link: "https://unstop.com/competitions/brandathon-innovate-strategize-and-pitch-spring-fiesta-indian-institute-of-information-technology-iiit-sura-1441593", order: 3 },
    { _id: '17', day: 3, time: "09:00 AM-11:00 AM", title: "Squid Game", description: "Logic, coding, and puzzle-solving escape room challenge.", link: "https://unstop.com/quiz/squid-game-escape-room-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1444467", order: 4 },
    { _id: '18', day: 3, time: "11:00 AM-01:00 PM", title: "Debugging", description: "Spot and fix code errors in the shortest time possible!", link: "https://unstop.com/o/wcSnihJ?lb=RrLnVks", order: 5 },
    { _id: '19', day: 3, time: "01:00 PM-03:00 PM", title: "Dev Heat Finale", description: "Flagship inter-college hackathon with live pitching.", link: "https://unstop.com/hackathons/dev-heat-hackathon-spring-fiesta-indian-institute-of-information-technology-iiit-surat-1442105", order: 6 },
    { _id: '20', day: 3, time: "01:00 PM-03:00 PM", title: "Yuva Sansad", description: "Youth Parliament session.", link: "https://www.google.com", order: 7 },
    { _id: '21', day: 3, time: "04:00 PM-06:00 PM", title: "Cultural Showdown", description: "Cultural competition showcase.", link: "https://www.google.com", order: 8 },
    { _id: '22', day: 3, time: "06:00 PM-07:45 PM", title: "Speaker Session", description: "Guest speaker session.", link: "https://www.google.com", order: 9 },
    { _id: '23', day: 3, time: "07:45 PM-09:00 PM", title: "Cultural Showdown", description: "Evening cultural performances.", link: "https://www.google.com", order: 10 },
    { _id: '24', day: 3, time: "09:30 PM-11:00 PM", title: "DJ Night", description: "Closing night party!", link: "https://www.google.com", order: 11 },
  ],
}

export const staticTeamMembers = [
  { _id: '1', name: "Devansh Kushwaha", designation: "Fest Secretary", imageUrl: "/images/CoreTeam/Devansh_Kushwaha.webp", department: "Management", order: 1 },
  { _id: '2', name: "Padam Mantry", designation: "Core Management", imageUrl: "/images/CoreTeam/MGMT/Core/Padam_mantry.webp", department: "Management", order: 2 },
  { _id: '3', name: "Yashraj Kulshrestha", designation: "Core Management", imageUrl: "/images/CoreTeam/MGMT/Core/Yashraj_Kulshrestha.webp", department: "Management", order: 3 },
  { _id: '4', name: "Shashank Jharaniya", designation: "Core Management", imageUrl: "/images/CoreTeam/MGMT/Core/Shashank_jhariya.webp", department: "Management", order: 4 },
  { _id: '5', name: "Preet Khatri", designation: "Core Management", imageUrl: "/images/CoreTeam/MGMT/Core/Preet_khatri.webp", department: "Management", order: 5 },
  { _id: '6', name: "Tanishq Saini", designation: "PR & Outreach Head", imageUrl: "/images/CoreTeam/PR_and_Outreach/Heads/Tanishq_Saini_Head1.webp", department: "PR", order: 6 },
  { _id: '7', name: "Heet Goyani", designation: "PR & Outreach Head", imageUrl: "/images/CoreTeam/PR_and_Outreach/Heads/Heet_Goyani_Head1.webp", department: "PR", order: 7 },
  { _id: '8', name: "Aditya Sharma", designation: "Web Developer", imageUrl: "/images/CoreTeam/Developers/Aditya_Sharma.webp", department: "Technical", order: 8 },
  { _id: '9', name: "Akash Yadav", designation: "Web Developer", imageUrl: "/images/CoreTeam/Developers/akash_yadav.webp", department: "Technical", order: 9 },
  { _id: '10', name: "Swayam Behera", designation: "Design Head", imageUrl: "/images/CoreTeam/Developers/Swayam_Behera.webp", department: "Design", order: 10 },
  { _id: '11', name: "Chaitanya Chandarkar", designation: "Cultural Head", imageUrl: "/images/CoreTeam/Cultural_committee/Chaitanya_Chandarkar_Head.webp", department: "Cultural", order: 11 },
  { _id: '12', name: "Parkhar Mishra", designation: "Core Team Coding", imageUrl: "/images/CoreTeam/Coding_Committee/Core/Parkhar_Mishra.webp", department: "Coding", order: 12 },
  { _id: '13', name: "Jeet Soni", designation: "Robotics Head", imageUrl: "/images/CoreTeam/Robotics_committee/CORE/Jeet_head.webp", department: "Robotics", order: 13 },
  { _id: '14', name: "Danish Ansari", designation: "Sports Head", imageUrl: "/images/CoreTeam/Sports_committee/Danish_Ansari_head.webp", department: "Sports", order: 14 },
  { _id: '15', name: "Dhyey Savaliya", designation: "Media Head", imageUrl: "/images/CoreTeam/Media_Cell/Heads/Dhyey_Savaliya.webp", department: "Media", order: 15 },
]

export const staticSponsors = {
  title: [
    { _id: '1', name: "BenQ", logoUrl: "/images/benq.png", tier: "title" as const, order: 1 },
  ],
  associate: [
    { _id: '2', name: "Canara Bank", logoUrl: "/images/canara.png", tier: "associate" as const, order: 1 },
    { _id: '3', name: "StockGro", logoUrl: "/images/stockgro_logo.png", tier: "associate" as const, order: 2 },
    { _id: '4', name: "SBI", logoUrl: "/images/sbi_logo.png", tier: "associate" as const, order: 3 },
    { _id: '5', name: "EaseMyTrip", logoUrl: "/images/ease_my_trip_logo.png", tier: "associate" as const, order: 4 },
  ],
  regular: [
    { _id: '6', name: "Mey Mey", logoUrl: "/images/mey_mey_logo.png", tier: "regular" as const, order: 1 },
    { _id: '7', name: "KM", logoUrl: "/images/km_logo.png", tier: "regular" as const, order: 2 },
    { _id: '8', name: "Mother Dairy", logoUrl: "/images/mother_diary_logo.png", tier: "regular" as const, order: 3 },
  ],
}

export const staticGalleryImages = Array.from({ length: 30 }, (_, i) => ({
  _id: String(i + 1),
  imageUrl: `/images/gallerySlider/image${i + 1}.webp`,
  altText: `Gallery image ${i + 1}`,
  isCarousel: i < 10,
  order: i + 1,
}))

export const staticSiteConfig = {
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
