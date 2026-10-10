import { useState } from 'react'
import { profile } from '../data'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: 'idle', text: '' })
  const set = k => e => setForm({ ...form, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setStatus({ type: 'busy', text: 'Sending...' })
    try {
      const res = await fetch(`${API}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setForm({ name: '', email: '', message: '' })
      setStatus({ type: 'ok', text: 'Message sent. Thank you, I will reply soon.' })
    } catch (err) {
      setStatus({ type: 'err', text: err.message === 'Failed to fetch' ? 'Could not reach the server. Please try again, or email me directly.' : err.message })
    }
  }

  return (
    <section className="wrap narrow">
      <h2 className="rv">Let's talk</h2>
      <p className="lead">Send me a message and it goes straight to my inbox.</p>
      <form className="form rv" onSubmit={submit}>
        <label>Name<input required maxLength={100} value={form.name} onChange={set('name')} /></label>
        <label>Email<input required type="email" maxLength={150} value={form.email} onChange={set('email')} /></label>
        <label>Message<textarea required rows={5} maxLength={2000} value={form.message} onChange={set('message')} /></label>
        <button className="btn" disabled={status.type === 'busy'}>{status.type === 'busy' ? 'Sending...' : 'Send message'}</button>
        {status.text && <p role="status" className={`status ${status.type}`}>{status.text}</p>}
      </form>
      <p className="muted">Or find me on <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>, <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> or at {profile.location}.</p>
    </section>
  )
}
