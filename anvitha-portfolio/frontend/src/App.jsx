import { useEffect } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Background from './Background'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import { profile } from './data'

const links = [['/', 'Home'], ['/about', 'About'], ['/skills', 'Skills'], ['/projects', 'Projects'], ['/contact', 'Contact']]

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.15 })
    document.querySelectorAll('.rv').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
  return (
    <>
      <Background />
      <div className="vig" />
      <header className="nav">
        <NavLink to="/" className="logo">AP.</NavLink>
        <nav>{links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}</nav>
      </header>
      <main key={pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="foot">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </footer>
    </>
  )
}
