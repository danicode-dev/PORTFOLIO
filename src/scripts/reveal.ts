const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches;

if (!reducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('reveal-enabled');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-visible', 'true');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  document
    .querySelectorAll<HTMLElement>('[data-reveal]')
    .forEach((element) => observer.observe(element));
}
