import { useEffect, useState } from 'react'
import './FloatingContactButtons.css'

const PHONE_NUMBER = '917011612320'
const WHATSAPP_MESSAGE = 'Hi Veda Electronics, I need appliance repair service.'

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.6 28.8l6.6-1.5A12.7 12.7 0 1 0 16 3.2Zm0 2.3a10.4 10.4 0 0 1 8.8 16 10.3 10.3 0 0 1-12.4 3.7l-.5-.2-4 1 .9-3.9-.3-.5A10.4 10.4 0 0 1 16 5.5Zm-4.4 5.2c-.2 0-.6.1-.9.5-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.8 5.9 5.1 2.9 1.1 3.5.9 4.1.8.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.2-.7-.4l-2.3-1.1c-.3-.1-.6-.2-.8.2l-1 1.2c-.2.3-.4.3-.8.1-.4-.2-1.5-.6-2.9-1.8a10.9 10.9 0 0 1-2-2.5c-.2-.4 0-.6.2-.8l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.8-.5h-.5Z" />
    </svg>
  )
}

export default function FloatingContactButtons() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const hero = document.querySelector('.hero')
      const threshold = hero ? hero.offsetTop + hero.offsetHeight - 40 : 320
      setVisible(window.scrollY > threshold)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <div className={`floating-contact-buttons${visible ? ' is-visible' : ''}`} aria-label="Quick contact">
      <a className="floating-contact-button whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <WhatsAppIcon />
      </a>
      <a className="floating-contact-button call" href={`tel:+${PHONE_NUMBER}`} aria-label="Call Veda Electronics">
        <PhoneIcon />
      </a>
    </div>
  )
}