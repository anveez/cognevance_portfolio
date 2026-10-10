import { useEffect, useRef } from 'react'

// Tall "stage" element + sticky child. Calls onT(t) with t = 0..1 as you scroll through the stage.
export default function useScrollStage(onT) {
  const ref = useRef()
  useEffect(() => {
    let raf
    const run = () => {
      const r = ref.current.getBoundingClientRect()
      onT(Math.min(1, Math.max(0, -r.top / (r.height - innerHeight))))
    }
    const h = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(run) }
    run()
    addEventListener('scroll', h, { passive: true }); addEventListener('resize', h)
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', h); removeEventListener('resize', h) }
  }, [])
  return ref
}
