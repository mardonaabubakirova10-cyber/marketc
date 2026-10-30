"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver that adds `.is-visible` to each
 * element with the given selector inside the root ref.
 * Pairs with `.reveal` / `.reveal-scale` CSS classes in globals.css.
 */
export function useReveal(selector = ".reveal, .reveal-scale") {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current ?? document;
    const els = root.querySelectorAll<HTMLElement>(selector);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);

  return ref;
}
