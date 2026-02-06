'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { staticEvents } from '@/lib/static-data'

interface EventItem {
  _id?: string
  time: string
  title: string
  description?: string
  link?: string
  day?: number
  section?: number
}

// Convert static events to array format for each day
const staticData1: EventItem[][] = [
  staticEvents[1].filter((_, i) => i < 4),  // Morning (first 4)
  staticEvents[1].filter((_, i) => i >= 4), // Evening (rest)
]
const staticData2: EventItem[][] = [
  staticEvents[2].filter((_, i) => i < 3),  // Morning
  staticEvents[2].filter((_, i) => i >= 3), // Evening
]
const staticData3: EventItem[][] = [
  staticEvents[3].filter((_, i) => i < 6),  // Morning
  staticEvents[3].filter((_, i) => i >= 6), // Evening
]

export default function EventPage() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [time, setTime] = useState('')
  const [link, setLink] = useState('')
  
  // Use static data directly - no database needed
  const data1 = staticData1
  const data2 = staticData2
  const data3 = staticData3

  const setTheThings = (data: EventItem) => {
    setTitle(data.title)
    setDescription(data.description || 'No description available')
    setTime(data.time)
    setLink(data.link || '')
    setOpen(true)
  }

  return (
    <>
      <Navbar />
      <div className="event-main">
        {/* Day 1 - 10 April */}
        <div className="part-one">
          <div className="part-one-main">
            <div className="head-1">
              <h1 className="head-1-text">EVENT<br />SCHEDULE</h1>
              <h1 className="head-2-text">10<br />APRIL</h1>
            </div>
            <div className="part-one-sub-section">
              <div className="part-one-sub-side-1">
                <img id="hoppie" src="/svg/hoppie.svg" alt="Hoppie" />
                {data1[0].map((creatediv, index) => (
                  <div key={creatediv._id || index} className="sch-container" onClick={() => setTheThings(creatediv)}>
                    <h1 className="sch-head">{creatediv.time}</h1>
                    <p className="sch-content">{creatediv.title}</p>
                  </div>
                ))}
              </div>
              <img id="joker" src="/svg/joker.svg" alt="Joker" />
              <div className="part-one-sub-side-2">
                {data1[1].map((creatediv, index) => (
                  <div key={creatediv._id || index} className="sch-container" onClick={() => setTheThings(creatediv)}>
                    <h1 className="sch-head">{creatediv.time}</h1>
                    <p className="sch-content">{creatediv.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Day 2 - 11 April */}
        <div className="part-two">
          <img className="mid-line" src="/svg/horrizontal-pipe.svg" alt="horizontal" />
          <div className="part-two-main">
            <div className="head-2">
              <h1 className="head-2-text-1">11<br />APRIL</h1>
            </div>
            <div className="part-two-sub-section">
              <div className="part-two-sub-side-1">
                {data2[0].map((creatediv, index) => (
                  <div key={creatediv._id || index} className="sch-container" onClick={() => setTheThings(creatediv)}>
                    <h1 className="sch-head">{creatediv.time}</h1>
                    <p className="sch-content">{creatediv.title}</p>
                  </div>
                ))}
              </div>
              <div className="pillar-part">
                <img id="pillar" src="/svg/pillar.svg" alt="Pillar" />
              </div>
              <div className="part-two-sub-side-2">
                {data2[1].map((creatediv, index) => (
                  <div key={creatediv._id || index} className="sch-container" onClick={() => setTheThings(creatediv)}>
                    <h1 className="sch-head">{creatediv.time}</h1>
                    <p className="sch-content">{creatediv.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Day 3 - 12 April */}
        <div className="part-three">
          <img className="mid-line" src="/svg/horrizontal-pipe.svg" alt="horizontal" />
          <div className="part-three-main">
            <div className="head-3">
              <h1 className="head-3-text">12<br />APRIL</h1>
            </div>
            <div className="part-three-sub-section">
              <div className="part-three-sub-side-1">
                {data3[0].map((creatediv, index) => (
                  <div key={creatediv._id || index} className="sch-container" onClick={() => setTheThings(creatediv)}>
                    <h1 className="sch-head">{creatediv.time}</h1>
                    <p className="sch-content">{creatediv.title}</p>
                  </div>
                ))}
              </div>
              <div className="part-three-sub-side-2">
                {data3[1].map((creatediv, index) => (
                  <div key={creatediv._id || index} className="sch-container" onClick={() => setTheThings(creatediv)}>
                    <h1 className="sch-head">{creatediv.time}</h1>
                    <p className="sch-content">{creatediv.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <img id="balloon" src="/svg/balloon.svg" alt="Balloon" />
          </div>
        </div>

        {/* Custom Modal */}
        {open && (
          <div className="modal-overlay" onClick={() => setOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setOpen(false)}>×</button>
              <h2 className="modal-title">{title}</h2>
              <p style={{ color: '#FF204E', fontFamily: 'Unbounded', marginBottom: '1rem' }}>{time}</p>
              <p className="modal-description">{description}</p>
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="modal-link">
                  Register Now
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
