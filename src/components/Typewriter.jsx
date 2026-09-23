import { useEffect, useRef, useState } from 'react'

const WORDS = [
  "Home Appliances",
  "AC Repair",
  "Refrigerator Repair",
  "Washing Machine Repair",
  "Microwave Oven Repair",
  "LED / LCD TV Repair",
  "RO Water Purifier Repair",
  "Kitchen Chimney Repair",
  "Geyser Repair",
]

const TYPING_SPEED = 75
const DELETING_SPEED = 40
const PAUSE_AFTER_TYPE = 1700
const PAUSE_AFTER_DELETE = 450

export default function Typewriter() {
  const [text, setText] = useState('')
  const wordIndex = useRef(0)
  const charIndex = useRef(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    function type() {
      const current = WORDS[wordIndex.current]
      if (charIndex.current <= current.length) {
        setText(current.slice(0, charIndex.current))
        charIndex.current += 1
        timeoutRef.current = setTimeout(type, TYPING_SPEED)
      } else {
        timeoutRef.current = setTimeout(erase, PAUSE_AFTER_TYPE)
      }
    }

    function erase() {
      const current = WORDS[wordIndex.current]
      if (charIndex.current >= 0) {
        setText(current.slice(0, charIndex.current))
        charIndex.current -= 1
        timeoutRef.current = setTimeout(erase, DELETING_SPEED)
      } else {
        wordIndex.current = (wordIndex.current + 1) % WORDS.length
        timeoutRef.current = setTimeout(type, PAUSE_AFTER_DELETE)
      }
    }

    timeoutRef.current = setTimeout(type, TYPING_SPEED)
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <span className="type-line">
      All{' '}
      <span className="accent" id="typedWord">{text}</span>
      <span className="type-cursor" aria-hidden="true">|</span>
    </span>
  )
}
