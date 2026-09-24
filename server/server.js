import { list, put } from '@vercel/blob'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDirectory = path.join(__dirname, 'data')
const bookingsFile = path.join(dataDirectory, 'bookings.json')
const settingsFile = path.join(dataDirectory, 'site-settings.json')
const port = Number(process.env.PORT || 4000)
const adminKey = process.env.ADMIN_KEY || 'dev-admin-key'
const isVercel = process.env.VERCEL === '1'
const blobToken = (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN || '').trim()
const hasBlobStorage = Boolean(blobToken)
if (blobToken && !process.env.BLOB_READ_WRITE_TOKEN) process.env.BLOB_READ_WRITE_TOKEN = blobToken

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', (_request, response, next) => {
  response.set('Cache-Control', 'no-store')
  next()
})

const requiredFields = ['fullName', 'email', 'contactNumber', 'city', 'serviceDate', 'product', 'problem']
const defaultSettings = {
  companyName: 'Veda Electronics',
  tagline: 'Doorstep Repair Service',
  phone: '7011612320',
  email: '',
  serviceArea: 'Darbhanga Lahariya Sarai',
  heroEyebrow: "Darbhanga Lahariya Sarai's trusted electronics repair service",
  heroTitle: 'Electronics Repair\nMade Simple',
  heroDescription: 'TVs, mixers, microwaves, inverters and every home electronic - diagnosis, repair and installation for all brands. Book in under a minute and a verified technician reaches your home.',
  footerTitle: 'Need a technician at your door today?',
  footerDescription: 'Same-day slots open in Darbhanga Lahariya Sarai.',
}

async function readBookings() {
  if (hasBlobStorage) return readBlobJson('bookings.json', [])
  if (isVercel) throw new Error('Production storage is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel Project Settings.')
  try {
    return JSON.parse(await fs.readFile(bookingsFile, 'utf8'))
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    await fs.mkdir(dataDirectory, { recursive: true })
    await fs.writeFile(bookingsFile, '[]')
    return []
  }
}

async function writeBookings(bookings) {
  if (hasBlobStorage) return writeBlobJson('bookings.json', bookings)
  if (isVercel) throw new Error('Production storage is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel Project Settings.')
  await fs.mkdir(dataDirectory, { recursive: true })
  await fs.writeFile(bookingsFile, JSON.stringify(bookings, null, 2))
}

async function readSettings() {
  if (hasBlobStorage) return readBlobJson('site-settings.json', defaultSettings)
  if (isVercel) return defaultSettings
  try {
    return { ...defaultSettings, ...JSON.parse(await fs.readFile(settingsFile, 'utf8')) }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    await fs.mkdir(dataDirectory, { recursive: true })
    await fs.writeFile(settingsFile, JSON.stringify(defaultSettings, null, 2))
    return defaultSettings
  }
}

async function writeSettings(settings) {
  if (hasBlobStorage) return writeBlobJson('site-settings.json', settings)
  if (isVercel) throw new Error('Production storage is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel Project Settings.')
  await fs.mkdir(dataDirectory, { recursive: true })
  await fs.writeFile(settingsFile, JSON.stringify(settings, null, 2))
}

async function readBlobJson(filename, fallback) {
  const result = await list({ prefix: `veda-electronics/${filename}` })
  const blob = result.blobs[0]
  if (!blob) return fallback
  const response = await fetch(blob.url)
  if (!response.ok) throw new Error(`Unable to read ${filename} from Vercel Blob.`)
  return response.json()
}

async function writeBlobJson(filename, value) {
  await put(`veda-electronics/${filename}`, JSON.stringify(value, null, 2), { access: 'public', addRandomSuffix: false, contentType: 'application/json' })
}

function requireAdmin(request, response, next) {
  if (request.get('x-admin-key') !== adminKey) return response.status(401).json({ message: 'Invalid admin key.' })
  next()
}

async function sendConfirmation(booking) {
  const subject = `Veda Electronics service booked for ${booking.serviceDate}`
  const text = `Hi ${booking.fullName},\n\nYour ${booking.product} service has been booked for ${booking.serviceDate}.\n\nCity: ${booking.city}\nProblem: ${booking.problem}\nBooking ID: ${booking.id}\n\nOur team will contact you before the visit.\n\nRegards,\nVeda Electronics`
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey || resendApiKey.startsWith('replace_')) {
    console.log(`[email preview] ${booking.email}: ${subject}\n${text}`)
    return { sent: false, reason: 'RESEND_API_KEY is not configured. Add a valid Resend API key to .env and restart the server.' }
  }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || 'Veda Electronics <onboarding@resend.dev>',
      to: [booking.email],
      subject,
      text,
    }),
  })
  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Resend rejected the email (${response.status}): ${details}`)
  }
  return { sent: true }
}

app.get('/api/health', (_request, response) => response.json({ ok: true }))
app.get('/api/settings', async (_request, response) => response.json({ settings: await readSettings() }))

app.post('/api/bookings', async (request, response) => {
  const payload = request.body || {}
  const missingField = requiredFields.find((field) => !String(payload[field] || '').trim())
  if (missingField) return response.status(400).json({ message: `${missingField} is required.` })
  if (!/^\S+@\S+\.\S+$/.test(payload.email)) return response.status(400).json({ message: 'Please enter a valid email address.' })

  const booking = {
    id: `VEDA-${Date.now().toString(36).toUpperCase()}`,
    fullName: String(payload.fullName).trim(),
    email: String(payload.email).trim(),
    contactNumber: String(payload.contactNumber).trim(),
    alternateNumber: String(payload.alternateNumber || '').trim(),
    city: String(payload.city).trim(),
    serviceDate: String(payload.serviceDate).trim(),
    product: String(payload.product).trim(),
    otherProduct: String(payload.otherProduct || '').trim(),
    problem: String(payload.problem).trim(),
    otherProblem: String(payload.otherProblem || '').trim(),
    status: 'Pending',
    createdAt: new Date().toISOString(),
  }

  try {
    const bookings = await readBookings()
    bookings.unshift(booking)
    await writeBookings(bookings)
    let email
    try {
      email = await sendConfirmation(booking)
    } catch (emailError) {
      email = { sent: false, reason: emailError.message }
      console.error('Confirmation email failed:', emailError)
    }
    response.status(201).json({ booking: { id: booking.id, serviceDate: booking.serviceDate }, email })
  } catch (error) {
    console.error('Booking creation failed:', error)
    const storageError = error.message.includes('Production storage is not configured')
    response.status(storageError ? 503 : 500).json({ message: storageError ? 'Booking storage is not configured on Vercel. Add BLOB_READ_WRITE_TOKEN in Vercel Project Settings and redeploy.' : 'Your request could not be saved. Please try again or call us.' })
  }
})

app.get('/api/bookings', requireAdmin, async (_request, response) => {
  response.json({ bookings: await readBookings() })
})

app.get('/api/system', requireAdmin, async (_request, response) => {
  response.json({
    api: 'online',
    storage: hasBlobStorage || !isVercel ? 'online' : 'not-configured',
    storageProvider: hasBlobStorage ? 'Vercel Blob' : isVercel ? 'missing BLOB_READ_WRITE_TOKEN' : 'local JSON (development only)',
    email: process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith('replace_') ? 'configured' : 'not-configured',
    sender: process.env.RESEND_FROM || 'not configured',
  })
})

app.put('/api/settings', requireAdmin, async (request, response) => {
  const current = await readSettings()
  const settings = Object.fromEntries(Object.keys(defaultSettings).map((key) => [key, String(request.body?.[key] ?? current[key]).trim()]))
  await writeSettings(settings)
  response.json({ settings })
})

app.patch('/api/bookings/:id', requireAdmin, async (request, response) => {
  const allowedStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled']
  if (!allowedStatuses.includes(request.body?.status)) return response.status(400).json({ message: 'Invalid booking status.' })
  const bookings = await readBookings()
  const booking = bookings.find((item) => item.id === request.params.id)
  if (!booking) return response.status(404).json({ message: 'Booking not found.' })
  booking.status = request.body.status
  booking.updatedAt = new Date().toISOString()
  await writeBookings(bookings)
  response.json({ booking })
})

if (process.env.VERCEL !== '1') {
  const clientDirectory = path.join(__dirname, '../dist')
  app.use(express.static(clientDirectory))
  app.get('*', (_request, response) => response.sendFile(path.join(clientDirectory, 'index.html')))
  app.listen(port, () => console.log(`Veda Electronics API running at http://localhost:${port}`))
}

export default app