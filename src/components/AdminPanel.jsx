import { useEffect, useState } from 'react'

const STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled']
const SETTING_FIELDS = [
  ['companyName', 'Company name'],
  ['tagline', 'Tagline'],
  ['phone', 'Phone number'],
  ['email', 'Business email'],
  ['serviceArea', 'Service area'],
  ['heroEyebrow', 'Hero eyebrow'],
  ['heroTitle', 'Hero title'],
  ['heroDescription', 'Hero description'],
  ['footerTitle', 'Footer call to action'],
  ['footerDescription', 'Footer description'],
]
const NAV_ITEMS = [
  ['overview', 'Overview', '▦'],
  ['bookings', 'Bookings', '▤'],
  ['content', 'Website content', '✎'],
  ['email', 'Email delivery', '✉'],
  ['settings', 'Settings', '⚙'],
]

async function readApiResponse(response) {
  const contentType = response.headers.get('content-type') || ''
  const body = await response.text()
  if (!contentType.includes('application/json')) throw new Error(response.status === 404 || body.startsWith('<!DOCTYPE') ? 'Booking API is not running. Start the project with npm run dev.' : `API returned an unexpected response (${response.status}).`)
  try { return JSON.parse(body) } catch { throw new Error('Booking API returned invalid JSON.') }
}

function Metric({ label, value, tone = '' }) {
  return <div className={`cms-metric ${tone}`}><span>{label}</span><strong>{value}</strong></div>
}

export default function AdminPanel() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('veda-admin-key') || '')
  const [keyInput, setKeyInput] = useState('')
  const [bookings, setBookings] = useState([])
  const [settings, setSettings] = useState(null)
  const [system, setSystem] = useState(null)
  const [section, setSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const loadDashboard = async (key = adminKey) => {
    setLoading(true)
    setError('')
    try {
      const headers = { 'x-admin-key': key }
      const [bookingResponse, settingsResponse, systemResponse] = await Promise.all([
        fetch('/api/bookings', { cache: 'no-store', headers }),
        fetch('/api/settings', { cache: 'no-store' }),
        fetch('/api/system', { cache: 'no-store', headers }),
      ])
      const bookingResult = await readApiResponse(bookingResponse)
      const settingsResult = await readApiResponse(settingsResponse)
      const systemResult = await readApiResponse(systemResponse)
      if (!bookingResponse.ok) throw new Error(bookingResult.message || 'Unable to load bookings.')
      sessionStorage.setItem('veda-admin-key', key)
      setAdminKey(key)
      setBookings(bookingResult.bookings)
      setSettings(settingsResult.settings)
      setSystem(systemResult)
    } catch (loadError) {
      sessionStorage.removeItem('veda-admin-key')
      setAdminKey('')
      setError(loadError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (adminKey) loadDashboard() }, [])

  const updateStatus = async (id, status) => {
    setError('')
    const response = await fetch(`/api/bookings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey }, body: JSON.stringify({ status }) })
    const result = await readApiResponse(response)
    if (!response.ok) { setError(result.message || 'Unable to update booking.'); return }
    setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, status } : booking))
  }

  const saveSettings = async (event) => {
    event.preventDefault()
    setMessage('')
    const response = await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey }, body: JSON.stringify(settings) })
    const result = await readApiResponse(response)
    if (!response.ok) setError(result.message || 'Unable to save settings.')
    else { setSettings(result.settings); setMessage('Website content saved successfully.') }
  }

  const signOut = () => { sessionStorage.removeItem('veda-admin-key'); setAdminKey('') }
  const selectSection = (nextSection) => { setSection(nextSection); setMobileMenuOpen(false); setError(''); setMessage('') }

  if (!adminKey) return <main className="admin-shell admin-login"><div className="admin-login-card"><span className="booking-modal-kicker">Veda Electronics CMS</span><h1>Admin workspace</h1><p>Sign in to manage bookings, website content, and delivery settings.</p><form onSubmit={(event) => { event.preventDefault(); loadDashboard(keyInput) }}><label><span>Admin key</span><input type="password" value={keyInput} onChange={(event) => setKeyInput(event.target.value)} required autoFocus /></label>{error && <p className="booking-error" role="alert">{error}</p>}<button className="btn btn-book" type="submit" disabled={loading}>{loading ? 'Checking...' : 'Open workspace'}</button></form></div></main>

  const pendingCount = bookings.filter((booking) => booking.status === 'Pending').length
  const confirmedCount = bookings.filter((booking) => booking.status === 'Confirmed').length
  const activeLabel = NAV_ITEMS.find(([id]) => id === section)?.[1]

  return <main className={`cms-shell ${sidebarOpen ? '' : 'cms-shell-collapsed'}`}>
    {mobileMenuOpen && <button className="cms-mobile-backdrop" type="button" aria-label="Close navigation" onClick={() => setMobileMenuOpen(false)} />}
    <aside className={`cms-sidebar ${mobileMenuOpen ? 'cms-sidebar-mobile-open' : ''}`}>
      <div className="cms-brand"><span className="logo-mark" aria-hidden="true">V</span>{sidebarOpen && <span><strong>Veda Electronics</strong><small>Content management</small></span>}</div>
      <nav className="cms-nav" aria-label="Admin sections">{NAV_ITEMS.map(([id, label, icon]) => <button key={id} className={section === id ? 'is-active' : ''} type="button" onClick={() => selectSection(id)}><span className="cms-nav-icon">{icon}</span>{sidebarOpen && <span>{label}</span>}{sidebarOpen && id === 'bookings' && pendingCount > 0 && <b>{pendingCount}</b>}</button>)}</nav>
      <div className="cms-sidebar-bottom">{sidebarOpen && <span className="cms-online-dot">API online</span>}<button className="cms-signout" type="button" onClick={signOut}>{sidebarOpen ? 'Sign out' : '↪'}</button></div>
    </aside>
    <section className="cms-main">
      <header className="cms-topbar"><button className="cms-menu-toggle" type="button" aria-label="Toggle navigation" onClick={() => window.innerWidth < 760 ? setMobileMenuOpen(true) : setSidebarOpen((current) => !current)}>☰</button><div><span className="cms-breadcrumb">Workspace / {activeLabel}</span><h1>{activeLabel}</h1></div><div className="cms-topbar-actions"><button className="btn btn-call" type="button" onClick={() => loadDashboard()}>Refresh</button><a className="btn btn-book" href="/" target="_blank" rel="noreferrer">View site</a></div></header>
      {error && <p className="booking-error cms-alert" role="alert">{error}</p>}
      {message && <p className="cms-success" role="status">{message}</p>}
      {section === 'overview' && <><div className="cms-metrics"><Metric label="Total bookings" value={bookings.length} /><Metric label="Pending action" value={pendingCount} tone="orange" /><Metric label="Confirmed" value={confirmedCount} tone="green" /><Metric label="Email delivery" value={system?.email === 'configured' ? 'Ready' : 'Needs setup'} tone={system?.email === 'configured' ? 'green' : 'orange'} /></div><div className="cms-overview-grid"><section className="cms-panel"><div className="cms-panel-heading"><div><span className="cms-eyebrow">Latest activity</span><h2>Recent bookings</h2></div><button className="cms-text-button" type="button" onClick={() => selectSection('bookings')}>View all</button></div>{bookings.slice(0, 5).map((booking) => <div className="cms-activity" key={booking.id}><span className="cms-avatar">{booking.fullName.slice(0, 1).toUpperCase()}</span><div><strong>{booking.fullName}</strong><small>{booking.product} · {booking.city}</small></div><span className={`cms-status cms-status-${booking.status.toLowerCase()}`}>{booking.status}</span></div>)}{bookings.length === 0 && <p className="admin-empty">No service bookings yet.</p>}</section><section className="cms-panel cms-quick-panel"><span className="cms-eyebrow">Quick actions</span><h2>Keep the site current</h2><button type="button" onClick={() => selectSection('content')}>Edit website content <span>→</span></button><button type="button" onClick={() => selectSection('bookings')}>Review pending bookings <span>→</span></button><button type="button" onClick={() => selectSection('email')}>Check email delivery <span>→</span></button></section></div></>}
      {section === 'bookings' && <section className="cms-panel cms-bookings-panel"><div className="cms-panel-heading"><div><span className="cms-eyebrow">Customer requests</span><h2>All bookings</h2></div><span className="cms-record-count">{bookings.length} records</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Customer</th><th>Service</th><th>Date</th><th>Contact</th><th>Status</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id}><td><strong>{booking.fullName}</strong><small>{booking.email}</small><small>{booking.id}</small></td><td>{booking.product}<small>{booking.problem}</small><small>{booking.city}</small></td><td>{booking.serviceDate}<small>{new Date(booking.createdAt).toLocaleDateString()}</small></td><td>{booking.contactNumber}<small>{booking.alternateNumber || 'No alternate number'}</small></td><td><select value={booking.status} onChange={(event) => updateStatus(booking.id, event.target.value)} aria-label={`Status for ${booking.fullName}`}>{STATUSES.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody></table>{bookings.length === 0 && <p className="admin-empty">No service bookings yet.</p>}</div></section>}
      {section === 'content' && settings && <section className="cms-panel cms-content-panel"><div className="cms-panel-heading"><div><span className="cms-eyebrow">Content management</span><h2>Website content</h2><p>Changes publish to the public site after saving.</p></div></div><form onSubmit={saveSettings}><div className="admin-settings-grid">{SETTING_FIELDS.map(([key, label]) => <label key={key}><span>{label}</span>{key.includes('Description') || key === 'heroTitle' || key === 'heroEyebrow' || key === 'footerTitle' || key === 'footerDescription' ? <textarea rows={key === 'heroDescription' || key === 'footerDescription' ? 4 : 2} value={settings[key]} onChange={(event) => setSettings((current) => ({ ...current, [key]: event.target.value }))} /> : <input value={settings[key]} onChange={(event) => setSettings((current) => ({ ...current, [key]: event.target.value }))} />}</label>)}</div><div className="cms-form-footer"><span>Last saved content is stored on the server.</span><button className="btn btn-book" type="submit">Save changes</button></div></form></section>}
      {section === 'email' && <section className="cms-panel cms-status-panel"><span className="cms-eyebrow">Delivery health</span><h2>Email delivery</h2><p className="cms-panel-intro">Confirmation messages are sent through Resend when a customer books a service.</p><div className="cms-health-list"><div><span>Resend API</span><strong className={system?.email === 'configured' ? 'health-good' : 'health-warn'}>{system?.email === 'configured' ? 'Configured' : 'Not configured'}</strong></div><div><span>Sender address</span><strong>{system?.sender || 'Not configured'}</strong></div><div><span>Booking storage</span><strong className="health-good">Online</strong></div></div><div className="cms-help-box"><strong>Need to change email credentials?</strong><p>Update RESEND_API_KEY and RESEND_FROM in the server .env file, then restart npm run dev. API keys are intentionally not editable in the browser.</p></div></section>}
      {section === 'settings' && <section className="cms-panel cms-status-panel"><span className="cms-eyebrow">Workspace settings</span><h2>Settings</h2><p className="cms-panel-intro">Your admin workspace is connected to the Node.js backend.</p><div className="cms-health-list"><div><span>API status</span><strong className="health-good">Online</strong></div><div><span>Storage</span><strong className={system?.storage === 'online' ? 'health-good' : 'health-warn'}>{system?.storage === 'online' ? system.storageProvider : 'Not configured'}</strong></div><div><span>Current admin session</span><strong>Active</strong></div></div><div className="cms-help-box"><strong>Security note</strong><p>Use a strong ADMIN_KEY in .env before deploying this dashboard publicly. Never commit .env or expose Resend credentials in frontend code.</p></div></section>}
    </section>
  </main>
}
