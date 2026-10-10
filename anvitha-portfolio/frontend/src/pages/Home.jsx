import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../data'
import useScrollStage from '../useScrollStage'

const WORDS = 'I turn ideas into products that work, and I never stop learning.'.split(' ')
const cl = v => Math.min(1, Math.max(0, v))

export default function Home() {
  const a = useRef(), b = useRef(), w = useRef([])
  const [first, last] = profile.name.split(' ')
  const stage = useScrollStage(t => {
    const o = cl(t / 0.4)                       // hero zooms past the camera and blurs away
    a.current.style.opacity = 1 - o
    a.current.style.transform = `scale(${1 + o * 1.5})`
    a.current.style.filter = `blur(${o * 14}px)`
    const k = cl((t - 0.35) / 0.65)             // statement fades in, word by word
    b.current.style.opacity = cl(k * 3)
    b.current.style.transform = `scale(${0.8 + cl(k * 2) * 0.2})`
    b.current.style.pointerEvents = k > 0.5 ? 'auto' : 'none'
    w.current.forEach((el, i) => el && el.classList.toggle('lit', k * 1.15 > (i + 1) / WORDS.length))
  })
  return (
    <div className="stage" ref={stage} style={{ height: '380vh' }}>
      <div className="pin">
        <section className="layer" ref={a}>
          <img className="avatar" src="/photo.jpg" alt="Anvitha Prasad" />
          <p className="muted">{profile.role}</p>
          <h1>{first} <span className="gold">{last}</span></h1>
          <p className="lead">{profile.tagline}</p>
          <p className="scrollhint">SCROLL ↓</p>
        </section>
        <section className="layer" ref={b} style={{ opacity: 0 }}>
          <h2 className="statement">{WORDS.map((x, i) => <span key={i} ref={el => (w.current[i] = el)} className="wd">{x} </span>)}</h2>
          <div className="row">
            <Link className="btn" to="/projects">See my projects</Link>
            <Link className="btn ghost" to="/contact">Contact me</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
