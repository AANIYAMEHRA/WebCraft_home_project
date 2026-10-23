import { useEffect } from "react";

/**
 * Magnetic button: the button follows the mouse while it is inside `wrapRef`.
 */
export default function useMagnet(wrapRef, btnRef) {
    useEffect(() => {
        const wrap = wrapRef.current;
        const btn = btnRef.current;
        if (!wrap || !btn) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const onMove = (e) => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
        };
        const onLeave = () => {
            btn.style.transform = "";
        };
        wrap.addEventListener("mousemove", onMove);
        wrap.addEventListener("mouseleave", onLeave);
        return () => {
            wrap.removeEventListener("mousemove", onMove);
            wrap.removeEventListener("mouseleave", onLeave);
        };
    }, [wrapRef, btnRef]);
}