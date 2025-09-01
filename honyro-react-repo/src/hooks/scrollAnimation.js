// src/hooks/useScrollAnimation.js
import { useEffect, useRef, useState } from "react";

export function useScrollAnimation(options = {}) {
    const {
        threshold = 0.5,
        enterRootMargin = "0px 0px -10% 0px",
        once = false,
        exitTopOffset = 80,
        onEnter,
        onLeave,
        onGone
    } = options;

    const ref = useRef(null);
    const [phase, setPhase] = useState("initial"); // "initial" | "in" | "out" | "gone"

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Observer para entrada/salida alrededor del centro del viewport controlado por enterRootMargin
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setPhase("in");
                        onEnter?.(entry);
                        if (once) io.unobserve(entry.target);
                    } else {
                        // Si el elemento ya cruzó hacia arriba (top < 0) → "out"
                        if (entry.boundingClientRect.top < 0) {
                            setPhase((prev) => (prev === "gone" ? "gone" : "out"));
                        } else {
                            // Aún no ha cruzado, vuelve a initial
                            setPhase("initial");
                        }
                        onLeave?.(entry);
                    }
                }
            },
            { threshold, root: null, rootMargin: enterRootMargin }
        );

        io.observe(el);

        // Listener ligero de scroll para detectar "gone" (totalmente fuera por arriba)
        const onScroll = () => {
            const r = el.getBoundingClientRect();
            // bottom < -offset ⇒ el elemento entero ya quedó por arriba
            if (r.bottom < -exitTopOffset) {
                if (phase !== "gone") {
                    setPhase("gone");
                    onGone?.();
                }
            }
        };

        // Solo nos importa "gone" después de haber estado visible o saliendo
        const onScrollBound = () => {
            if (phase === "in" || phase === "out") onScroll();
        };

        window.addEventListener("scroll", onScrollBound, { passive: true });

        return () => {
            io.disconnect();
            window.removeEventListener("scroll", onScrollBound);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threshold, enterRootMargin, once, exitTopOffset, onEnter, onLeave, onGone, phase]);

    const getClassName = (base = "") =>
        [base, "sa",
            phase === "in" && "sa--in",
            phase === "out" && "sa--out",
            phase === "gone" && "sa--gone"
        ].filter(Boolean).join(" ");

    return { ref, phase, getClassName, setPhase };
}

