import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import * as THREE from 'three'

const ROUTES = ['/', '/about', '/skills', '/projects', '/contact']

// Each page sits at its own depth: changing route flies the camera through a gold ring.
export default function Background() {
  const ref = useRef()
  const idx = useRef(0)
  const { pathname } = useLocation()
  idx.current = Math.max(0, ROUTES.indexOf(pathname))

  useEffect(() => {
    const R = new THREE.WebGLRenderer({ canvas: ref.current, antialias: true })
    R.setPixelRatio(Math.min(devicePixelRatio, 2)); R.setClearColor(0x07060a)
    const S = new THREE.Scene(); S.fog = new THREE.FogExp2(0x07060a, 0.022)
    const C = new THREE.PerspectiveCamera(65, 1, 0.1, 300)
    const N = 2500, pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - .5) * 70; pos[i * 3 + 1] = (Math.random() - .5) * 50; pos[i * 3 + 2] = 20 - Math.random() * 170 }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    S.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xf3e3bf, size: 0.09 })))
    const rings = ROUTES.map((_, i) => {
      const m = new THREE.Mesh(new THREE.TorusGeometry(7 + (i % 2) * 2, 0.04, 8, 120), new THREE.MeshBasicMaterial({ color: 0xe0b45a }))
      m.position.z = -i * 25 - 12; S.add(m); return m
    })
    const crystal = new THREE.Mesh(new THREE.IcosahedronGeometry(3, 1), new THREE.MeshBasicMaterial({ color: 0xe0b45a, wireframe: true, transparent: true, opacity: .45 }))
    crystal.position.z = -14; S.add(crystal)
    let mx = 0, my = 0, z = 0, raf
    const size = () => { R.setSize(innerWidth, innerHeight, false); C.aspect = innerWidth / innerHeight; C.updateProjectionMatrix() }
    const move = e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5 }
    const loop = () => {
      const max = Math.max(1, document.body.scrollHeight - innerHeight)
      z += (-(idx.current * 25) - (scrollY / max) * 18 - z) * 0.05
      C.position.set(mx * 2, -my * 1.4, z); C.rotation.z = Math.sin(z * .08) * .12
      rings.forEach((r, i) => (r.rotation.z += 0.002 * (i % 2 ? 1 : -1)))
      crystal.rotation.x += .003; crystal.rotation.y += .005
      R.render(S, C); raf = requestAnimationFrame(loop)
    }
    size(); loop()
    addEventListener('resize', size); addEventListener('pointermove', move)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); removeEventListener('pointermove', move); R.dispose() }
  }, [])

  return <canvas ref={ref} className="bg" />
}
