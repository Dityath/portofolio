import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// GSAP Animation Utilities

/**
 * Fade in up animation with ScrollTrigger
 */
export const initFadeInUp = () => {
  const elements = document.querySelectorAll(".fade-in-up");

  elements.forEach((el) => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });
};

/**
 * Glitch text effect
 */
export const glitchText = (element: HTMLElement) => {
  const tl = gsap.timeline({ repeat: 3, repeatDelay: 0.1 });

  tl.to(element, {
    x: -2,
    skewX: 5,
    duration: 0.05,
  })
    .to(element, {
      x: 2,
      skewX: -5,
      duration: 0.05,
    })
    .to(element, {
      x: 0,
      skewX: 0,
      duration: 0.05,
    });

  return tl;
};

/**
 * Infinite horizontal scroll
 */
export const infiniteScroll = (element: HTMLElement, duration: number = 20) => {
  return gsap.to(element, {
    x: "-50%",
    duration,
    ease: "none",
    repeat: -1,
  });
};

/**
 * Counter animation
 */
export const animateCounter = (element: HTMLElement, target: number) => {
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: target,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      once: true,
    },
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString();
    },
  });
};

/**
 * Stagger animation for children
 */
export const staggerIn = (container: string | HTMLElement, options = {}) => {
  const defaults = {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
  };

  const settings = { ...defaults, ...options };

  return gsap.from(`${container} > *`, settings);
};

/**
 * Parallax effect
 */
export const parallax = (element: HTMLElement, speed: number = 0.5) => {
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

/**
 * Magnetic hover effect
 */
export const magneticHover = (element: HTMLElement, strength: number = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

/**
 * Timeline line drawing animation
 */
export const drawTimeline = (line: HTMLElement) => {
  return gsap.from(line, {
    scaleY: 0,
    transformOrigin: "top",
    duration: 1.5,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: line,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
    },
  });
};

/**
 * Cleanup all ScrollTriggers
 */
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

/**
 * Refresh ScrollTriggers
 */
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};

// Export GSAP and ScrollTrigger
export { gsap, ScrollTrigger };
