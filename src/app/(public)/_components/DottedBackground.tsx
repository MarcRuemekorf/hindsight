"use client";

import { useEffect, useRef } from "react";

const DottedBackground = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            el.style.setProperty("--mouse-x", `${e.clientX}px`);
            el.style.setProperty("--mouse-y", `${e.clientY}px`);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const sharedStyles: React.CSSProperties = {
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        backgroundSize: "18px 18px",
    };

    return (
        <>
            {/* Base layer: dim dots everywhere */}
            <div style={{
                ...sharedStyles,
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
            }} />
            {/* Spotlight layer: bright dots, masked to cursor area only */}
            <div
                ref={ref}
                style={{
                    ...sharedStyles,
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)",
                    // Mask reveals bright dots only near the cursor — background between dots is unaffected
                    WebkitMaskImage: "radial-gradient(circle 400px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), black 0%, transparent 80%)",
                    maskImage: "radial-gradient(circle 400px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), black 0%, transparent 80%)",
                }}
            />
        </>
    );
};

export default DottedBackground;
