import { useRef } from 'react'
import { projects } from '../data'
import useScrollStage from '../useScrollStage'

const cl = v => Math.min(1, Math.max(0, v))
const N = projects.length

export default function Projects() {
  const refs = useRef([])
  const stage = useScrollStage(t => {
    refs.current.forEach((c, i) => {
      if (!c) return
      const u = t * (N + 0.9) - i - 0.15, side = i % 2 ? 1 : -1, narrow = innerWidth < 700
      c.style.opacity = cl(u / 0.35) * (1 - cl((u - 1.1) / 0.35))   // each card flies in from the dark
      c.style.transform = `translate(-50%,-50%) translate3d(${narrow ? 0 : side * 22 + side * cl(u - 1) * 60}vw,${narrow ? 0 : side * 4}vh,${-2600 + u * 2600}px) rotateY(${-side * 18 * (1 - cl(u))}deg) rotateZ(${side * 2}deg)`
      c.style.pointerEvents = u > 0.7 && u < 1.2 ? 'auto' : 'none'
    })
  })
  return (
    <div className="stage" ref={stage} style={{ height: `${(N + 1) * 85}vh` }}>
      <div className="pin persp">
        <h2 className="ttl">Projects</h2>
        {projects.map((p, i) => (
          <article className="card float" key={p.title} ref={el => (refs.current[i] = el)}>
            <div className="art" style={{ background: `radial-gradient(circle at 35% 40%, ${p.bg}, #0d0b10 75%)` }}>
              {/* Put a screenshot in public/projects/. If the file is missing the gradient shows instead. */}
              <img src={p.image} alt={`${p.title} screenshot`} onError={e => e.currentTarget.remove()} />
            </div>
            <div className="pad">
              <h3>{p.title}</h3>
              <p className="muted">{p.desc}</p>
              <div className="chips">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
