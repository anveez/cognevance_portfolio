import { profile, education, certs } from '../data'

export default function About() {
  return (
    <section className="wrap">
      <h2 className="rv">About me</h2>
      <div className="about-top rv">
        <img className="avatar lg" src="/photo.jpg" alt="Anvitha Prasad" />
        <p className="lead">{profile.about}</p>
      </div>
      <h3 className="rv">Education</h3>
      <ul className="list">{education.map(([t, s], i) => <li className="rv" style={{ transitionDelay: `${i * .12}s` }} key={t}><b>{t}</b><span>{s}</span></li>)}</ul>
      <h3 className="rv">Certifications</h3>
      <ul className="list">{certs.map((c, i) => <li className="rv" style={{ transitionDelay: `${i * .1}s` }} key={c}>{c}</li>)}</ul>
    </section>
  )
}
