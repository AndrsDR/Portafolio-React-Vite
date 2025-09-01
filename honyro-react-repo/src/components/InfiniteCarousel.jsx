import React, { useEffect, useRef } from 'react'
import './InfiniteCarousel.css'

export function InfiniteCarousel({ children, speed = 1 }) {
    const containerRef = useRef(null)
    const contentRef = useRef(null)
    const speedRef = useRef(speed)

    const childArray = Array.isArray(children) ? children : [children]

    const duplicatedChildren = [
        ...childArray,
        ...childArray.map((child, i) => {
            const key = (child?.key ?? i) + '-dup'
            return React.isValidElement(child)
                ? React.cloneElement(child, { key })
                : child
        })
    ]

    useEffect(() => {
        const container = containerRef.current
        const content = contentRef.current
        if (!container || !content) return

        let offset = container.scrollLeft
        let animationId

        const half = () => content.scrollWidth / 2

        const step = () => {
            if (speedRef.current > 0) {
                offset += speedRef.current
                if (offset >= half()) {
                    offset = 0
                }
                container.scrollLeft = offset
            }
            animationId = requestAnimationFrame(step)
        }

        animationId = requestAnimationFrame(step)

        const handleScroll = () => {
            const maxScroll = half()
            if (container.scrollLeft >= maxScroll) {
                container.scrollLeft = container.scrollLeft - maxScroll
            }
            offset = container.scrollLeft
        }

        const handleWheel = (e) => {
            e.preventDefault()
            const delta =
                Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
            container.scrollLeft += delta
            offset = container.scrollLeft
        }

        container.addEventListener('scroll', handleScroll)
        container.addEventListener('wheel', handleWheel, { passive: false })

        return () => {
            cancelAnimationFrame(animationId)
            container.removeEventListener('scroll', handleScroll)
            container.removeEventListener('wheel', handleWheel)
        }
    }, [])

    useEffect(() => {
        speedRef.current = speed
    }, [speed])

    return (
        <div
            className="carousel-container"
            ref={containerRef}
            onMouseEnter={() => (speedRef.current = 0)}
            onMouseLeave={() => (speedRef.current = speed)}
        >
            <div className="carousel-content" ref={contentRef}>
                {duplicatedChildren}
            </div>
        </div>
    )
}

