// Load GSAP and ScrollTrigger from CDN if not available
(function() {
  function loadScript(src, cb) {
    const s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    document.head.appendChild(s);
  }

  function animateSections() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    // Limpiar animaciones previas
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    // Añadir la clase invisible solo a las secciones que NO están en el viewport
    const sections = gsap.utils.toArray('section');
    const firstSection = sections[0];
    sections.forEach((section, idx) => {
      if (idx !== 0) {
        section.classList.add('is-invisible');
      } else {
        section.classList.remove('is-invisible');
      }
    });
    sections.forEach((section, idx) => {
      if (idx > 1) {
        gsap.fromTo(section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            onStart: () => section.classList.remove('is-invisible'),
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    });
  }

  function setup() {
    animateSections();
    window.addEventListener('astro:after-swap', animateSections);
  }
  if (!window.gsap) {
    loadScript('https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js', function() {
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js', setup);
    });
  } else if (!window.ScrollTrigger) {
    loadScript('https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js', setup);
  } else {
    setup();
  }
})();
