'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Card from '@/components/Card'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Core Team data
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
  { name: 'Nachos', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Nachos.webp' },
  { name: 'Rutwik Dhale', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Rutwik_Dhale.webp' },
  { name: 'Pankaj Mandal', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Pankaj_Mandal.webp' },
  { name: 'Harsh Singh', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Harsh_Singh.webp' },
  { name: 'Shrey Shah', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Shreh_Shah.webp' },
  { name: 'Vivek Kumar', designation: 'Core Team Coding', image: '/images/CoreTeam/Coding_Committee/Core/Vivek_kumar.webp' },
  { name: 'Jeet Soni', designation: 'Robotics Head', image: '/images/CoreTeam/Robotics_committee/CORE/Jeet_head.webp' },
  { name: 'Prashant', designation: 'Robotics Head', image: '/images/CoreTeam/Robotics_committee/CORE/Prashant_head.webp' },
  { name: 'Abhilasha Supe', designation: 'Robotics Core Team', image: '/images/CoreTeam/Robotics_committee/CORE/Abhilasha_core.webp' },
  { name: 'Sushant', designation: 'Robotics Core Team', image: '/images/CoreTeam/Robotics_committee/CORE/Sushant_core.webp' },
  { name: 'Harhvardhan Mani Tripathi', designation: 'E-Summit Head', image: '/images/CoreTeam/E-Summit_Committee/Heads/Harshvardhan_Tripathi.webp' },
  { name: 'Arya Trivedi', designation: 'E-Summit Head', image: '/images/CoreTeam/E-Summit_Committee/Heads/Arya_Trivedi.webp' },
  { name: 'Pratham Sachan', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Pratham_Sachan.webp' },
  { name: 'Ruchita Agarwal', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Ruchita_Agarwal.webp' },
  { name: 'Preksha Upadhyay', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Preksha_Upadhyay.webp' },
  { name: 'Bhumil Rangholiya', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Bhumil_Rangholiya.webp' },
  { name: 'Abhishek Tiwari', designation: 'E-Summit Co-Head', image: '/images/CoreTeam/E-Summit_Committee/Co-Heads/Abhishek_Tiwari.webp' },
  { name: 'Danish Ansari', designation: 'Sports Head', image: '/images/CoreTeam/Sports_committee/Danish_Ansari_head.webp' },
  { name: 'Meet Harsoda', designation: 'Sports Head', image: '/images/CoreTeam/Sports_committee/Meet_Harsoda_head.webp' },
  { name: 'Manoj Rathod', designation: 'Sports Head', image: '/images/CoreTeam/Sports_committee/Rathod_manoj_sports_head.webp' },
  { name: 'Sujal Tiwari', designation: 'Sports Head', image: '/images/CoreTeam/Sports_committee/Sujal_Tiwari_head.webp' },
  { name: 'Vipin Sharma', designation: 'Art & Design', image: '/images/CoreTeam/Abstract_committee/Vipin_Sharma.webp' },
  { name: 'Hamesh Puniya', designation: 'Art & Design', image: '/images/CoreTeam/Abstract_committee/Hamesh_Puniya.webp' },
  { name: 'Dhyey Savaliya', designation: 'Media Head', image: '/images/CoreTeam/Media_Cell/Heads/Dhyey_Savaliya.webp' },
  { name: 'Anmol Kumar', designation: 'Media Head', image: '/images/CoreTeam/Media_Cell/Heads/Anmol_Kumar.webp' },
  { name: 'Pranav Garasiya', designation: 'Media Head', image: '/images/CoreTeam/Media_Cell/Heads/Pranav_Garasiya.webp' },
  { name: 'Satyam Ranjan', designation: 'Content Head', image: '/images/CoreTeam/Content_Committee/Core/Satyam_Ranjan.webp' },
  { name: 'Nakul Mantri', designation: 'Content Head', image: '/images/CoreTeam/Content_committee/Core/Nakul_Mantri.webp' },
]

// Pre-calculated card positions - DESKTOP (3 columns)
const alignArray = [-350, 0, 350]
const cardMotion: { multiplier: number; x: number; y: number }[] = []
cardMotion.push({ multiplier: 1, x: 0, y: 50 })
for (let index = 0; index < coreTeam.length - 1; index++) {
  cardMotion.push({
    multiplier: Math.floor(Math.random() * 21) - 10,
    x: alignArray[index % 3],
    y: 400 * Math.floor(index / 3) + 450,
  })
}

// TABLET (2 columns)
const alignArrayTab = [-130, 130]
const cardMotionTablet: { multiplier: number; x: number; y: number }[] = []
cardMotionTablet.push({ multiplier: 1, x: -30, y: 50 })
for (let index = 0; index < coreTeam.length - 1; index++) {
  cardMotionTablet.push({
    multiplier: Math.floor(Math.random() * 21) - 10,
    x: alignArrayTab[index % 2] - 40,
    y: 350 * Math.floor(index / 2) + 360,
  })
}

// MOBILE (1 column)
const cardMotionMobile: { multiplier: number; x: number; y: number }[] = []
cardMotionMobile.push({ multiplier: 1, x: -50, y: 0 })
for (let index = 0; index < coreTeam.length - 1; index++) {
  cardMotionMobile.push({
    multiplier: Math.floor(Math.random() * 21) - 10,
    x: -50,
    y: 350 * index + 350,
  })
}

// Rotation values for stacked deck
const rotateArr = [
  -39, -37, -35, -33, -31, -29, -27, -25, -23, -21, -19, -17, -15, -13, -11, -9, -7, -5,
  -3, -1, 0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43
]

export default function CoreTeamPage() {
  const { scrollY } = useScroll()
  const [scrollYValue, setScrollYValue] = useState(0)
  const [isPacked, setIsPacked] = useState(false)
  const [finalMotion, setFinalMotion] = useState(cardMotion)
  const [threshold, setThreshold] = useState(250)

  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    setScrollYValue(latest)
    // Update isPacked based on scroll threshold
    if (latest >= threshold && !isPacked) {
      setIsPacked(true)
    } else if (latest < threshold && isPacked) {
      setIsPacked(false)
    }
  })

  // Screen size detection
  useEffect(() => {
    const update = () => {
      if (window.innerWidth > 1150) {
        setFinalMotion(cardMotion)
        setThreshold(250)
      } else if (window.innerWidth > 550) {
        setFinalMotion(cardMotionTablet)
        setThreshold(100)
      } else {
        setFinalMotion(cardMotionMobile)
        setThreshold(25)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Calculate bg-wrapper height based on last card position
  const lastCardY = finalMotion[finalMotion.length - 1]?.y || 0
  const containerHeight = lastCardY + 600

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
        style={{ minHeight: containerHeight }}
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ ease: 'easeOut', duration: 1 }}
      >
        <div className="card-bg" style={isPacked ? { border: 'none' } : {}} />

        <div className="card-wrapper">
          {coreTeam.map((member, i) => (
            <Card
              key={i}
              multiply={isPacked ? finalMotion[i]?.multiplier || 0 : rotateArr[i] / 4}
              scrollYValue={scrollYValue}
              x={finalMotion[i]?.x || 0}
              y={finalMotion[i]?.y || 0}
              photo={member.image}
              name={member.name}
              designation={member.designation}
              isPacked={isPacked}
            />
          ))}
        </div>
      </motion.div>

      {/* Footer positioned after cards */}
      <div className="dept" style={{ marginTop: 100 }}>
        <Footer />
      </div>
    </>
  )
}
