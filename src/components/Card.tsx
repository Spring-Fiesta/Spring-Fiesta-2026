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
}

const Card = ({ multiply, scrollYValue, x, y, photo, designation, name }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [screenType, setScreenType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  useEffect(() => {
    const updateScreenType = () => {
      if (window.innerWidth > 1150) setScreenType('desktop')
      else if (window.innerWidth > 480) setScreenType('tablet')
      else setScreenType('mobile')
    }
    updateScreenType()
    window.addEventListener('resize', updateScreenType)
    return () => window.removeEventListener('resize', updateScreenType)
  }, [])

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped)
      setIsAnimating(true)
    }
  }

  useMemo(() => {
    if (scrollYValue > 250) {
      setIsFlipped(true)
    }
  }, [scrollYValue])

  const variant = {
    shuffle: {
      rotate: multiply * 2 + 'deg',
      x: multiply * 25,
      y: Math.abs(multiply * 5),
      transition: {
        delay: 1,
        ease: 'easeOut',
        duration: 0.4,
      },
    },
    pack: {
      rotate: multiply + 'deg',
      x: x,
      y: y,
      scale: 1.1,
      transition: {
        ease: 'easeOut',
        duration: 0.4,
      },
    },
  }

  const variantTablet = {
    shuffle: {
      rotate: multiply * 2 + 'deg',
      x: multiply * 15 - 40,
      y: Math.abs(multiply * 3.5),
      transition: {
        delay: 1,
        ease: 'easeOut',
        duration: 0.4,
      },
    },
    pack: {
      rotate: multiply + 'deg',
      x: x,
      y: y,
      scale: 0.85,
      transition: {
        ease: 'easeOut',
        duration: 0.4,
      },
    },
  }

  const variantMobile = {
    shuffle: {
      rotate: multiply + 'deg',
      x: multiply * 2 - 50,
      y: Math.abs(multiply * 2),
      transition: {
        delay: 1,
        ease: 'easeOut',
        duration: 0.4,
      },
    },
    pack: {
      rotate: multiply + 'deg',
      x: x,
      y: y,
      transition: {
        ease: 'easeOut',
        duration: 0.4,
      },
    },
  }

  let finalVariant
  let desiredScrollValue = 0

  if (screenType === 'desktop') {
    finalVariant = variant
    desiredScrollValue = 250
  } else if (screenType === 'tablet') {
    finalVariant = variantTablet
    desiredScrollValue = 100
  } else {
    finalVariant = variantMobile
    desiredScrollValue = 25
  }

  return (
    <motion.div
      className="flip-card"
      onClick={handleFlip}
      whileHover={{ scale: 1.2 }}
      animate={scrollYValue >= desiredScrollValue ? 'pack' : 'shuffle'}
      variants={finalVariant}
    >
      <motion.div
        className="flip-card-inner"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 360 }}
        transition={{ duration: 0.2 }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <div className="flip-card-front" style={{ backgroundColor: 'white' }}>
          <div
            className="mem-image"
            style={{ backgroundImage: 'url(/images/back.png)' }}
          ></div>
        </div>

        <div className="flip-card-back" style={{ backgroundColor: 'white' }}>
          <div
            className="mem-image"
            style={{ backgroundImage: `url(${photo.startsWith('/') ? photo : '/' + photo})` }}
          >
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
