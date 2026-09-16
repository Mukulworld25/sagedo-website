import React, { useState, useEffect, useRef } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in ms
  duration?: number; // duration in ms, default 300
  direction?: "up" | "none";
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  duration = 300,
  direction = "up",
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "80px" }
    );

    if (ref.current) observer.observe(ref.current);

    // Fallback timer so content is never stuck hidden
    const fallbackTimer = setTimeout(() => setIsVisible(true), 1000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const transformStyle = direction === "up" 
    ? (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")
    : (isVisible ? "opacity-100" : "opacity-0");

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out ${transformStyle} ${className}`}
    >
      {children}
    </div>
  );
}

export default RevealOnScroll;
