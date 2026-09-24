import { useEffect, useRef, useState } from 'react'

const CITIES = ['Darbhanga Lahariya Sarai', 'Alwar', 'Allahabad', 'Baleshwar', 'Bangalore', 'Belgaum', 'Bhilai', 'Bhopal', 'Bikaner', 'Chandrapur', 'Chatarpur (MP)', 'Chennai', 'Darbhanga', 'Dhanbad', 'Delhi', 'Dharwad', 'Durg', 'Ghaziabad', 'Goa', 'Gurgaon', 'Guwahati', 'Gwalior', 'Hassan', 'Hubli', 'Indore', 'Jaipur', 'Jamshedpur', 'Jodhpur', 'Kalaburagi', 'Kanpur', 'Kolkata', 'Kolhapur', 'Lucknow', 'Madhubani', 'Mangalore', 'Moradabad', 'Mumbai', 'Mysuru', 'Noida', 'Patna', 'Pune', 'Raipur', 'Ramgarh', 'Ranchi', 'Rewa (MP)']
const PRODUCTS = ['Air Conditioner (Split / Window)', 'Washing Machine (Front Load / Top Load/Semi)', 'Refrigerator / Fridge', 'Microwave Oven', 'LED / Smart TV', 'Geyser / Water Heater', 'Dishwasher', 'Water Purifier (RO)', 'Other (Please Specify)']
const PROBLEMS = ['Not Working', 'Not Powering On', 'Not Cooling', 'Not Spinning', 'Not Draining Water', 'Drum Not Rotating', 'Compressor Issue', 'Water Leakage', 'Buttons Not Working', 'Other (Please Describe the Issue)']
const INITIAL_FORM = { fullName: '', email: '', contactNumber: '', city: '', serviceDate: '', alternateNumber: '', product: '', otherProduct: '', problem: '', otherProblem: '' }

function FieldIcon({ type }) {
  const paths = {
    user: <><circle cx="12" cy="8" r="3.3" /><path d="M5.5 20c.7-3.2 2.8-4.8 6.5-4.8s5.8 1.6 6.5 4.8" /></>,
    phone: <path d="M7.2 4.2 9.5 3l2.1 4.4-2 1.5a13.4 13.4 0 0 0 5.5 5.5l1.5-2 4.4 2.1-1.2 2.3c-.5 1-1.6 1.5-2.7 1.2C10.5 16.7 7.3 13.5 6 6.9c-.3-1.1.2-2.2 1.2-2.7Z" />,
    city: <><path d="M4 20h16M6.5 20V9.5L12 6l5.5 3.5V20M9 12h1M14 12h1M9 16h1M14 16h1" /><path d="M10 6V3h4v3" /></>,
    product: <><rect x="4" y="7" width="16" height="12" rx="2" /><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M4 12h16" /></>,
    problem: <><path d="M12 3 2.8 19h18.4L12 3Z" /><path d="M12 9v4M12 16h.01" /></>,
  }
  return <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}

function ChevronIcon() {
  return <svg className="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
}

function CustomSelect({ name, value, onChange, options, placeholder, icon }) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const closeMenu = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', closeMenu)
    return () => document.removeEventListener('mousedown', closeMenu)
  }, [])

  return (
    <div className="custom-select" ref={wrapperRef}>
      <button className={'custom-select-trigger ' + (value ? 'has-value' : '')} type="button" aria-haspopup="listbox" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
        <FieldIcon type={icon} />
        <span>{value || placeholder}</span>
        <ChevronIcon />
      </button>
      {isOpen && (
        <div className="custom-select-menu" role="listbox">
          {options.map((option) => (
            <button className={'custom-select-option ' + (value === option ? 'is-selected' : '')} type="button" role="option" aria-selected={value === option} key={option} onClick={() => { onChange({ target: { name, value: option } }); setIsOpen(false) }}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function BookingModal({ open, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  useEffect(() => {
    if (!open) return undefined
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }
  const handleClose = () => {
    setForm(INITIAL_FORM)
    setSubmitted(false)
    setError('')
    setEmailMessage('')
    onClose()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to submit your request.')
      setEmailMessage(result.email?.sent ? 'A confirmation email was sent.' : `Booking saved. Email not sent: ${result.email?.reason || 'email service unavailable'}`)
      setSubmitted(true)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="booking-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) handleClose() }}>
      <div className="booking-modal-card" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
        <div className="booking-modal-header">
          <div>
            <span className="booking-modal-kicker">Veda Electronics</span>
            <h2 id="booking-modal-title">Book a Service</h2>
            <p>Tell us about your appliance and our verified technician will reach you.</p>
          </div>
          <button className="modal-close" type="button" onClick={handleClose} aria-label="Close booking form">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        {submitted ? (
          <div className="booking-success" role="status">
            <div className="success-mark" aria-hidden="true">OK</div>
            <h3>Request received</h3>
            <p>Thank you, {form.fullName || 'we will contact you'}! Your service request is booked for {form.serviceDate}.</p>
            <p className="booking-email-status">{emailMessage}</p>
            <button className="btn btn-book" type="button" onClick={handleClose}>Done</button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="booking-form-grid">
              <label><span>Full Name</span><div className="booking-control"><FieldIcon type="user" /><input name="fullName" value={form.fullName} onChange={updateField} placeholder="Enter your full name" required /></div></label>
              <label><span>Email Address</span><div className="booking-control"><input name="email" value={form.email} onChange={updateField} type="email" placeholder="Where should we send confirmation?" required /></div></label>
              <label><span>Contact Number</span><div className="booking-control"><FieldIcon type="phone" /><input name="contactNumber" value={form.contactNumber} onChange={updateField} type="tel" inputMode="tel" pattern="[0-9+() -]{10,}" placeholder="Enter contact number" required /></div></label>
              <label><span>City</span><CustomSelect name="city" value={form.city} onChange={updateField} options={CITIES} placeholder="Select your city" icon="city" /></label>
              <label><span>Preferred Service Date</span><div className="booking-control"><input name="serviceDate" value={form.serviceDate} onChange={updateField} type="date" min={new Date().toISOString().split('T')[0]} required /></div></label>
              <label><span>Alternate Number <em>Optional</em></span><div className="booking-control"><FieldIcon type="phone" /><input name="alternateNumber" value={form.alternateNumber} onChange={updateField} type="tel" inputMode="tel" pattern="[0-9+() -]{10,}" placeholder="Enter alternate number" /></div></label>
              <label><span>Product Selection</span><CustomSelect name="product" value={form.product} onChange={updateField} options={PRODUCTS} placeholder="Select a product" icon="product" /></label>
              {form.product === 'Other (Please Specify)' && <label><span>Other Product</span><div className="booking-control"><FieldIcon type="product" /><input name="otherProduct" value={form.otherProduct} onChange={updateField} placeholder="Type your product" required /></div></label>}
              <label><span>Problem Selection</span><CustomSelect name="problem" value={form.problem} onChange={updateField} options={PROBLEMS} placeholder="Select the problem" icon="problem" /></label>
              {form.problem === 'Other (Please Describe the Issue)' && <label><span>Describe the Issue</span><div className="booking-control"><FieldIcon type="problem" /><input name="otherProblem" value={form.otherProblem} onChange={updateField} placeholder="Describe the issue" required /></div></label>}
            </div>
            {error && <p className="booking-error" role="alert">{error}</p>}
            <button className="btn btn-book booking-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Book Service'} <span aria-hidden="true">-&gt;</span></button>
          </form>
        )}
      </div>
    </div>
  )
}
