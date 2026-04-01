import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DrawSVGProps {
  path: string;
  className?: string;
}

export function DrawSVG({ path, className }: DrawSVGProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.fromTo(
      pathRef.current,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: pathRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="3">
      <path ref={pathRef} d={path} />
    </svg>
  );
}
