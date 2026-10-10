import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Message from './models/Message.js'

const app = express()
const origins = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map(s => s.trim())
app.use(cors({ origin: origins }))
app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))

// On Vercel this file runs as a serverless function, so connect to MongoDB on demand and reuse the connection.
let connecting
function connectDB() {
  if (!connecting) {
    connecting = mongoose.connect(process.env.MONGODB_URI).catch(err => { connecting = null; throw err })
  }
  return connecting
}
app.use(async (_req, res, next) => {
  try { await connectDB(); next() }
  catch (err) {
    console.error('MongoDB connection failed:', err.message)
    res.status(500).json({ error: 'Database connection failed.' })
  }
})

// Save a contact form submission to MongoDB
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {}
  if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || '') || !message?.trim()) {
    return res.status(400).json({ error: 'Name, a valid email and a message are required.' })
  }
  try {
    await Message.create({ name, email, message })
    res.status(201).json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not save your message. Please try again.' })
  }
})

// Read saved messages (send the ADMIN_KEY in the x-admin-key header)
app.get('/api/messages', async (req, res) => {
  if (!process.env.ADMIN_KEY || req.get('x-admin-key') !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  res.json(await Message.find().sort({ createdAt: -1 }).limit(200))
})

// Local development: start a normal server. On Vercel the exported app is used instead.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`API running on port ${PORT}`)))
    .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1) })
}

export default app