import { skills } from '../data'

export default function Skills() {
  return (
    <section className="wrap">
      <h2 className="rv">Skills</h2>
      <div className="grid">
        {skills.map((s, i) => (
          <div className="card pad rv" style={{ transitionDelay: `${i * .12}s` }} key={s.group}>
            <h3>{s.group}</h3>
            <div className="chips">{s.items.map(x => <span key={x}>{x}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
