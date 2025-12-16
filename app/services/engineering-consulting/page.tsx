function useInViewOnce<T extends HTMLElement>(threshold = 0.25, rootMargin = "0px") {
  const [node, setNode] = useState<T | null>(null)
  const [inView, setInView] = useState(false)
  const rafRef = useRef<number | null>(null)

  const ref = useCallback((el: T | null) => {
    setNode(el)
  }, [])

  useEffect(() => {
    if (!node || inView) return

    // ✅ IMPORTANT: declare observer BEFORE cleanup/trigger (prevents TDZ crash)
    let observer: IntersectionObserver | null = null

    const isVisible = () => {
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      return rect.top < vh && rect.bottom > 0
    }

    const cleanup = () => {
      window.removeEventListener("scroll", onCheck)
      window.removeEventListener("resize", onCheck)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      if (observer) observer.disconnect()
      observer = null
    }

    const trigger = () => {
      setInView(true)
      cleanup()
    }

    const onCheck = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        if (isVisible()) trigger()
      })
    }

    // Immediate check
    if (isVisible()) {
      trigger()
      return
    }

    // Fallback listeners
    window.addEventListener("scroll", onCheck, { passive: true })
    window.addEventListener("resize", onCheck)

    // IntersectionObserver
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) trigger()
        },
        { threshold, rootMargin }
      )
      observer.observe(node)
    }

    // Extra delayed checks (covers late layout/font/image paint)
    const t1 = window.setTimeout(onCheck, 50)
    const t2 = window.setTimeout(onCheck, 200)
    const t3 = window.setTimeout(onCheck, 600)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      cleanup()
    }
  }, [node, inView, threshold, rootMargin])

  return { ref, inView }
}
