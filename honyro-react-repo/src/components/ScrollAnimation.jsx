import React from "react";
import { useScrollAnimation } from "../hooks/scrollAnimation";

/**
 * Wrapper reutilizable:
 * <ScrollAnimation from="left" once threshold={0.5} className="mi-bloque" as="section" style={{ "--sa-dur": "1s" }}>
 *     ...children...
 * </ScrollAnimation>
 */
export default function ScrollAnimation({
    as: Comp = "div",
    className = "",
    from = "left",       // "left" | "right" | "up" | "down"
    threshold = 0.5,
    once = false,
    root = null,
    rootMargin = "0px 0px -10% 0px",
    onEnter,
    onLeave,
    style = {},
    children,
    ...rest
}) {
    const { ref, getClassName } = useScrollAnimation({ threshold, once, root, rootMargin, onEnter, onLeave });

    return (
        <Comp
            ref={ref}
            className={getClassName(className)}
            data-sa-from={from}
            style={style}
            {...rest}
        >
            {children}
        </Comp>
    );
}
