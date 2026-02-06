'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  multiply: number
  scrollYValue: number
  x: number
  y: number
  photo: string
  designation: string
  name: string
  isPacked: boolean // NEW: parent controls if cards are spread
}

const Card = ({ multiply, scrollYValue, x, y, photo, designation, name, isPacked }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped)
      setIsAnimating(true)
    }
  }

  // Auto-flip when packed
  useEffect(() => {
    if (isPacked) {
      setIsFlipped(true)
    }
  }, [isPacked])

  // Shuffle = stacked, Pack = spread to grid
  const variants = {
    shuffle: {
      rotate: multiply * 2,
      x: multiply * 25,
      y: Math.abs(multiply * 5),
      scale: 1,
      transition: { ease: 'easeOut', duration: 0.4 },
    },
    pack: {
      rotate: multiply,
      x: x,
      y: y,
      scale: 1.05,
      transition: { ease: 'easeOut', duration: 0.4 },
    },
  }

  return (
    <motion.div
      className="flip-card"
      onClick={handleFlip}
      whileHover={{ scale: 1.1 }}
      animate={isPacked ? 'pack' : 'shuffle'}
      variants={variants}
    >
      <motion.div
        className="flip-card-inner"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 360 }}
        transition={{ duration: 0.2 }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <div className="flip-card-front" style={{ backgroundColor: 'white' }}>
          <div className="mem-image" style={{ backgroundImage: 'url(/images/back.png)' }}></div>
        </div>

        <div className="flip-card-back" style={{ backgroundColor: 'white' }}>
          <div className="mem-image" style={{ backgroundImage: `url(${photo})` }}>
            <div className="details">
              <div className="card-name">{name}</div>
              <div className="card-designation">{designation}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Card
