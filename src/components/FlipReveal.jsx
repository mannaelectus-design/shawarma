import { useRef, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export const FlipRevealItem = forwardRef(function FlipRevealItem({ flipKey, children, className = "", style = {}, ...props }, ref) {
    return (
        <div data-flip={flipKey} className={className} style={style} ref={ref} {...props}>
            {children}
        </div>
    );
});

export const FlipReveal = function FlipReveal({ activeCategory, children, className = "", ...props }) {
    const wrapperRef = useRef(null);

    const isShow = (key) => !!key && (activeCategory === "all" || key === activeCategory);

    useGSAP(
        () => {
            if (!wrapperRef.current) return;

            const items = gsap.utils.toArray("[data-flip]", wrapperRef.current);
            const state = Flip.getState(items);

            items.forEach((item) => {
                const key = item.getAttribute("data-flip");
                if (isShow(key)) {
                    item.style.display = ""; // Show
                } else {
                    item.style.display = "none"; // Hide
                }
            });

            Flip.from(state, {
                duration: 0.6,
                scale: true,
                ease: "power1.inOut",
                stagger: 0.05,
                onEnter: (elements) =>
                    gsap.fromTo(
                        elements,
                        { opacity: 0, scale: 0.8 },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.6,
                        },
                    ),
                onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.6 }),
            });
        },
        { scope: wrapperRef, dependencies: [activeCategory] }
    );

    return (
        <div className={className} ref={wrapperRef} {...props}>
            {children}
        </div>
    );
};
