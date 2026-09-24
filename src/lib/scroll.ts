/**
 * Smooth-scrolls to a section on the single-page site.
 *
 * Takes the bare element id ("contact"), not the "#contact" anchor — the same
 * shape `NAV_ITEMS` hrefs reduce to.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/** Shared fade-in-on-scroll variant for Framer Motion. */
export const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/** Viewport config used by every scroll-triggered animation on the page. */
export const viewportOnce = { once: true, margin: "-50px" } as const;
