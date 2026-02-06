'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Event data - matching original data1.json, data2.json, data3.json structure
const data1 = [
  [
    { time: "9:00 AM", title: "Inauguration Ceremony", description: "Grand opening ceremony of Spring Fiesta 2026 with special guests" },
    { time: "10:00 AM", title: "Technical Quiz", description: "Test your technical knowledge in this exciting quiz competition" },
    { time: "12:00 PM", title: "Coding Competition - Round 1", description: "First round of the flagship coding competition" },
    { time: "2:00 PM", title: "Robotics Workshop", description: "Hands-on workshop on robotics and automation" },
  ],
  [
    { time: "4:00 PM", title: "Dance Competition - Solo", description: "Showcase your dancing skills in solo performances" },
    { time: "6:00 PM", title: "Band Performance", description: "Live music performance by student bands" },
    { time: "8:00 PM", title: "DJ Night", description: "End the day with an electrifying DJ night" },
  ]
]

const data2 = [
  [
    { time: "9:00 AM", title: "Hackathon Begins", description: "24-hour hackathon kicks off with exciting problem statements" },
    { time: "11:00 AM", title: "Art Exhibition", description: "Display of student artwork and creative expressions" },
    { time: "2:00 PM", title: "Debate Competition", description: "Battle of words and ideas" },
  ],
  [
    { time: "4:00 PM", title: "Drama Performance", description: "Theatrical performances by student groups" },
    { time: "6:00 PM", title: "Fashion Show", description: "Student fashion showcase with creative themes" },
    { time: "9:00 PM", title: "Cultural Night", description: "Traditional dance and music performances" },
  ]
]

const data3 = [
  [
    { time: "9:00 AM", title: "Hackathon Ends", description: "Submission deadline for hackathon projects" },
    { time: "10:00 AM", title: "Project Presentations", description: "Hackathon teams present their projects" },
    { time: "12:00 PM", title: "Gaming Tournament Finals", description: "Final matches of esports competitions" },
    { time: "2:00 PM", title: "Treasure Hunt", description: "Campus-wide treasure hunt adventure" },
    { time: "4:00 PM", title: "Award Ceremony", description: "Recognition of winners across all events" },
  ],
  [
    { time: "6:00 PM", title: "Celebrity Performance", description: "Special guest celebrity performance" },
    { time: "8:00 PM", title: "Closing Ceremony", description: "Grand finale and closing of Spring Fiesta 2026" },
    { time: "9:30 PM", title: "Fireworks Display", description: "Spectacular fireworks to end the fest" },
  ]
]

interface EventItem {
  time: string
  title: string
  description: string
  link?: string
}

export default function EventPage() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [time, setTime] = useState('')
  const [link, setLink] = useState('')

  const setTheThings = (data: EventItem) => {
    setTitle(data.title)
    setDescription(data.description)
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
                  <div key={index} className="sch-container" onClick={() => setTheThings(creatediv)}>
                    <h1 className="sch-head">{creatediv.time}</h1>
                    <p className="sch-content">{creatediv.title}</p>
                  </div>
                ))}
              </div>
              <img id="joker" src="/svg/joker.svg" alt="Joker" />
              <div className="part-one-sub-side-2">
                {data1[1].map((creatediv, index) => (
                  <div key={index} className="sch-container" onClick={() => setTheThings(creatediv)}>
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
                  <div key={index} className="sch-container" onClick={() => setTheThings(creatediv)}>
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
                  <div key={index} className="sch-container" onClick={() => setTheThings(creatediv)}>
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
                  <div key={index} className="sch-container" onClick={() => setTheThings(creatediv)}>
                    <h1 className="sch-head">{creatediv.time}</h1>
                    <p className="sch-content">{creatediv.title}</p>
                  </div>
                ))}
              </div>
              <div className="part-three-sub-side-2">
                {data3[1].map((creatediv, index) => (
                  <div key={index} className="sch-container" onClick={() => setTheThings(creatediv)}>
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
