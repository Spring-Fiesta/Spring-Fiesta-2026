'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Card from '@/components/Card'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Core team data - matching original coreTeam.json with correct image paths
const coreTeam = [
  { name: 'Devansh Kushwaha', designation: 'Fest Secretary', image: '/images/CoreTeam/Devansh_Kushwaha.webp' },
  { name: 'Padam Mantry', designation: 'Core Management', image: '/images/CoreTeam/MGMT/Core/Padam_mantry.webp' },
  { name: 'Yashraj Kulshrestha', designation: 'Core Management', image: '/images/CoreTeam/MGMT/Core/Yashraj_Kulshrestha.webp' },
  { name: 'Shashank Jharaniya', designation: 'Core Management', image: '/images/CoreTeam/MGMT/Core/Shashank_jhariya.webp' },
  { name: 'Preet Khatri', designation: 'Core Management', image: '/images/CoreTeam/MGMT/Core/Preet_khatri.webp' },
  { name: 'Tanishq Saini', designation: 'PR & Outreach Head', image: '/images/CoreTeam/PR_and_Outreach/Heads/Tanishq_Saini_Head1.webp' },
  { name: 'Heet Goyani', designation: 'PR & Outreach Head', image: '/images/CoreTeam/PR_and_Outreach/Heads/Heet_Goyani_Head1.webp' },
  { name: 'Aditya Sharma', designation: 'Web Developer', image: '/images/CoreTeam/Developers/Aditya_Sharma.webp' },
  { name: 'Akash Yadav', designation: 'Web Developer', image: '/images/CoreTeam/Developers/akash_yadav.webp' },
  { name: 'Swayam Behera', designation: 'Design Head', image: '/images/CoreTeam/Developers/Swayam_Behera.webp' },
  { name: 'Chaitanya Chandarkar', designation: 'Cultural Head', image: '/images/CoreTeam/Cultural_committee/Chaitanya_Chandarkar_Head.webp' },
  { name: 'Parkhar Mishra', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Parkhar_Mishra.webp' },
]

// Desktop card positions
const alignArray = [-350, 0, 350]
const cardMotion: { multiplier: number; x: number; y: number }[] = [{ multiplier: 1, x: 0, y: 50 }]

for (let index = 0; index < coreTeam.length - 1; index++) {
  cardMotion.push({
    multiplier: Math.floor(Math.random() * 21) - 10,
    x: alignArray[index % 3],
    y: 400 * Math.floor(index / 3) + 450,
  })
}

// Tablet card positions
const alignArrayTab = [-130, 130]
const cardMotionTablet: { multiplier: number; x: number; y: number }[] = [{ multiplier: 1, x: -30, y: 50 }]

for (let index = 0; index < coreTeam.length - 1; index++) {
  cardMotionTablet.push({
    multiplier: Math.floor(Math.random() * 21) - 10,
    x: alignArrayTab[index % 2] - 40,
    y: 350 * Math.floor(index / 2) + 360,
  })
}

// Mobile card positions
const cardMotionMobile: { multiplier: number; x: number; y: number }[] = [{ multiplier: 1, x: -50, y: 0 }]

for (let index = 0; index < coreTeam.length - 1; index++) {
  cardMotionMobile.push({
    multiplier: Math.floor(Math.random() * 21) - 10,
    x: -50,
    y: 350 * index + 350,
  })
}

const CoreTeam = () => {
  const [mounted, setMounted] = useState(false)
  const [screenType, setScreenType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  
  const rotateArr = [
    -39, -37, -35, -33, -31, -29, -27, -25, -23, -21, -19, -17, -15, -13, -11, -9, -7, -5,
    -3, -1, 0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43
  ]

  const { scrollY } = useScroll()
  const [scrollYValue, setScrollYValue] = useState(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrollYValue(latest)
  })

  useEffect(() => {
    setMounted(true)
    const updateScreenType = () => {
      if (window.innerWidth > 1150) setScreenType('desktop')
      else if (window.innerWidth > 550) setScreenType('tablet')
      else setScreenType('mobile')
    }
    updateScreenType()
    window.addEventListener('resize', updateScreenType)
    return () => window.removeEventListener('resize', updateScreenType)
  }, [])

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#23203C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '60px', height: '60px', border: '4px solid rgba(255, 32, 78, 0.2)', borderTop: '4px solid #FF204E', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    )
  }

  const deckVariants = {
    first: {
      y: 0,
      transition: {
        delay: 0.2,
        ease: 'easeInOut',
        duration: 1,
        staggerChildren: 5,
      },
    },
  }

  let finalMotion: typeof cardMotion = []
  let desiredScrollValue = 0

  if (screenType === 'desktop') {
    finalMotion = cardMotion
    desiredScrollValue = 250
  } else if (screenType === 'tablet') {
    finalMotion = cardMotionTablet
    desiredScrollValue = 100
  } else {
    finalMotion = cardMotionMobile
    desiredScrollValue = 25
  }

  return (
    <>
      <Navbar />
      <motion.div
        className="heading"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: 'easeOut', duration: 1 }}
      >
        <h1>Meet The Team</h1>
      </motion.div>

      <motion.div
        className="bg-wrapper"
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ ease: 'easeOut', duration: 1 }}
      >
        <div className="card-bg" style={scrollYValue > desiredScrollValue ? { border: 'none' } : {}} />

        <motion.div
          className="card-wrapper"
          initial={{ y: 400 }}
          animate="first"
          variants={deckVariants}
        >
          {coreTeam.map((member, i) => (
            <Card
              key={i}
              multiply={scrollYValue <= desiredScrollValue ? rotateArr[i] / 4 : finalMotion[i]?.multiplier || 0}
              scrollYValue={scrollYValue}
              x={finalMotion[i]?.x || 0}
              y={finalMotion[i]?.y || 0}
              photo={member.image}
              name={member.name}
              designation={member.designation}
            />
          ))}
        </motion.div>
      </motion.div>
      
      <motion.div
        className="dept mb-10"
        animate={{ y: (finalMotion[finalMotion.length - 1]?.y || 0) + 450 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Footer />
      </motion.div>
    </>
  )
}

export default CoreTeam
