(function() {
  'use strict';

  // ============================================================
  // [CONFIG]
  // ============================================================
  const CONFIG = {
    preloaderTimeout: 5000,
    navbarScrollThreshold: 80,
    scrollRevealThreshold: 0.08,
    counterDuration: 1500,
    typingSpeed: 80,
    typingDeleteSpeed: 40,
    typingPauseEnd: 2000,
    typingPauseStart: 400,
    carouselInterval: 5000,
    carouselScrollAmount: 360,
    backToTopThreshold: 400,
    parallaxSpeed: 0.3,
    formSuccessDuration: 5000,
    newsletterSuccessDuration: 4000
  };

  // ============================================================
  // [1] PRELOADER
  // ============================================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => setTimeout(() => preloader.classList.add('hidden'), 500));
    setTimeout(() => { if (!preloader.classList.contains('hidden')) preloader.classList.add('hidden'); }, CONFIG.preloaderTimeout);
  }

  // ============================================================
  // [2] CUSTOM CURSOR
  // ============================================================
  const cursor = document.getElementById('cursor');
  if (cursor && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
    document.querySelectorAll('a, button, .glass-card, .btn, .app-card, .cert-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ============================================================
  // [3] THEME TOGGLE
  // ============================================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  let currentTheme = html.getAttribute('data-theme') || 'dark';
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) { currentTheme = savedTheme; html.setAttribute('data-theme', savedTheme); if (themeToggle && savedTheme === 'light') themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (currentTheme === 'dark') { html.setAttribute('data-theme', 'light'); themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; currentTheme = 'light'; }
      else { html.setAttribute('data-theme', 'dark'); themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; currentTheme = 'dark'; }
      localStorage.setItem('theme', currentTheme);
    });
  }

  // ============================================================
  // [4] NAVBAR
  // ============================================================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (navbar) { window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.pageYOffset > CONFIG.navbarScrollThreshold); }, { passive: true }); }
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      hamburger.classList.toggle('active');
    });
    navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { if (window.innerWidth <= 991) { navMenu.classList.remove('mobile-open'); hamburger.classList.remove('active'); } }));
  }
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  function highlightNav() { let current = ''; sections.forEach(s => { if (window.pageYOffset >= s.offsetTop - 120) current = s.getAttribute('id'); }); navLinks.forEach(l => { l.classList.remove('active'); if (l.getAttribute('href') === '#' + current) l.classList.add('active'); }); }
  window.addEventListener('scroll', highlightNav, { passive: true });
  window.addEventListener('load', highlightNav);

  // ============================================================
  // [5] SMOOTH SCROLL
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); const navHeight = navbar ? navbar.offsetHeight : 70; const pos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16; window.scrollTo({ top: pos, behavior: 'smooth' }); }
    });
  });

  // ============================================================
  // [6] TYPING ANIMATION
  // ============================================================
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const phrases = ['Android Developer | Kotlin', 'Jetpack Compose Expert', 'MVVM | Clean Architecture', 'Firebase | CI/CD Specialist', '12+ Years Experience'];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;
    function type() {
      const current = phrases[phraseIndex];
      typingElement.textContent = isDeleting ? current.substring(0, charIndex - 1) : current.substring(0, charIndex + 1);
      charIndex += isDeleting ? -1 : 1;
      let delay = 80;
      if (!isDeleting && charIndex === current.length) { isDeleting = true; delay = 2000; }
      else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 400; }
      if (isDeleting) delay = 40;
      setTimeout(type, delay);
    }
    type();
  }

  // ============================================================
  // [7] ANIMATED COUNTERS
  // ============================================================
  const counterValues = document.querySelectorAll('.counter-value');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        if (!isNaN(target)) {
          let current = 0;
          const increment = Math.ceil(target / 60);
          const timer = setInterval(() => { current += increment; if (current >= target) { current = target; clearInterval(timer); } el.textContent = current; }, 16);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counterValues.forEach(el => counterObserver.observe(el));

  // Progress rings
  function animateRings() {
    ['ring-1', 'ring-2', 'ring-3', 'ring-4'].forEach((id, i) => {
      const ring = document.getElementById(id);
      if (ring) {
        const vals = [85, 92, 78, 95];
        const circum = 2 * Math.PI * 35;
        ring.style.strokeDasharray = circum;
        setTimeout(() => { ring.style.strokeDashoffset = circum - (vals[i] / 100) * circum; ring.style.transition = 'stroke-dashoffset 2s ease'; }, 300);
      }
    });
  }
  const counterSection = document.querySelector('.counter-section');
  if (counterSection) { const obs = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) { animateRings(); obs.unobserve(counterSection); } }, { threshold: 0.3 }); obs.observe(counterSection); }

  // ============================================================
  // [8] SCROLL REVEAL
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================================
  // [9] FAQ ACCORDION
  // ============================================================
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const answer = document.getElementById(button.getAttribute('aria-controls'));
      document.querySelectorAll('.faq-question').forEach(btn => {
        if (btn !== button) { btn.setAttribute('aria-expanded', 'false'); const oa = document.getElementById(btn.getAttribute('aria-controls')); if (oa) oa.classList.remove('open'); }
      });
      if (expanded) { button.setAttribute('aria-expanded', 'false'); if (answer) answer.classList.remove('open'); }
      else { button.setAttribute('aria-expanded', 'true'); if (answer) answer.classList.add('open'); }
    });
  });

  // ============================================================
  // [10] CONTACT FORM
  // ============================================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const subject = contactForm.querySelector('[name="subject"]');
      const message = contactForm.querySelector('[name="message"]');
      let isValid = true;
      const showError = (id, show) => { const el = document.getElementById(id); if (el) { if (show) el.classList.add('show'); else el.classList.remove('show'); } };
      if (!name.value.trim()) { showError('nameError', true); isValid = false; } else showError('nameError', false);
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) { showError('emailError', true); isValid = false; } else showError('emailError', false);
      if (!subject.value.trim()) { showError('subjectError', true); isValid = false; } else showError('subjectError', false);
      if (!message.value.trim()) { showError('messageError', true); isValid = false; } else showError('messageError', false);
      if (isValid) { if (formSuccess) formSuccess.style.display = 'block'; contactForm.reset(); setTimeout(() => { if (formSuccess) formSuccess.style.display = 'none'; }, CONFIG.formSuccessDuration); }
    });
  }

  // ============================================================
  // [11] NEWSLETTER
  // ============================================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterMessage = document.getElementById('newsletterMessage');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => { e.preventDefault(); if (newsletterMessage) newsletterMessage.style.display = 'block'; newsletterForm.reset(); setTimeout(() => { if (newsletterMessage) newsletterMessage.style.display = 'none'; }, CONFIG.newsletterSuccessDuration); });
  }

  // ============================================================
  // [12] COPY EMAIL
  // ============================================================
  document.querySelectorAll('.email-text').forEach(element => {
    element.addEventListener('click', async () => {
      const email = element.getAttribute('data-email');
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        const original = element.textContent;
        element.textContent = '✓ Copied!';
        element.style.color = 'var(--color-success)';
        setTimeout(() => { element.textContent = original; element.style.color = ''; }, 1500);
      } catch (err) { const ta = document.createElement('textarea'); ta.value = email; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
    });
  });

  // ============================================================
  // [13] BACK TO TOP
  // ============================================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => { backToTop.classList.toggle('show', window.pageYOffset > CONFIG.backToTopThreshold); }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ============================================================
  // [14] STICKY CTA
  // ============================================================
  const stickyCta = document.getElementById('stickyCta');
  if (stickyCta) {
    const heroSection = document.getElementById('hero');
    if (heroSection) { window.addEventListener('scroll', () => { stickyCta.classList.toggle('show', heroSection.getBoundingClientRect().bottom < 0); }, { passive: true }); }
    stickyCta.addEventListener('click', () => { const contact = document.getElementById('contact'); if (contact) { const navHeight = navbar ? navbar.offsetHeight : 70; const pos = contact.getBoundingClientRect().top + window.pageYOffset - navHeight - 16; window.scrollTo({ top: pos, behavior: 'smooth' }); } });
  }

  // ============================================================
  // [15] TESTIMONIAL CAROUSEL
  // ============================================================
  const carousel = document.querySelector('.testimonials-carousel');
  if (carousel && carousel.children.length > 1) {
    let intervalId;
    function start() { intervalId = setInterval(() => { if (document.hidden) return; const max = carousel.scrollWidth - carousel.clientWidth; if (carousel.scrollLeft >= max - 20) carousel.scrollTo({ left: 0, behavior: 'smooth' }); else carousel.scrollBy({ left: 360, behavior: 'smooth' }); }, 5000); }
    function stop() { clearInterval(intervalId); }
    start();
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('touchstart', stop, { passive: true });
    carousel.addEventListener('touchend', start);
  }

  // ============================================================
  // [16] LIGHTBOX
  // ============================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeLightbox = document.getElementById('closeLightbox');
  document.querySelectorAll('.hero-image-wrapper img, .about-image-wrapper img, .blog-image img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => { if (lightbox && lightboxImg) { lightboxImg.src = img.src; lightbox.classList.add('open'); } });
  });
  if (closeLightbox) closeLightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox) lightbox.classList.remove('open'); });

  // ============================================================
  // [17] PARALLAX
  // ============================================================
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollY < window.innerHeight) heroContent.style.transform = `translateY(${scrollY * CONFIG.parallaxSpeed}px)`;
  }, { passive: true });

  // ============================================================
  // [18] SKILL BARS
  // ============================================================
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.style.width;
          if (width) { bar.style.width = '0'; setTimeout(() => { bar.style.width = width; }, 200); }
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => observer.observe(bar));
  }

  // ============================================================
  // [19] ACCESSIBILITY
  // ============================================================
  document.addEventListener('keydown', (e) => { if (e.key === 'Tab') document.body.classList.add('keyboard-nav'); });
  document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-nav'));

  // ============================================================
  // [20] CONSOLE BRANDING
  // ============================================================
  console.log('%c🚀 Moe Kyaw Aung — Portfolio v2.0', 'background:#6c63ff;color:white;font-size:1.2rem;padding:8px 16px;border-radius:4px;');
  console.log('%c📱 Senior Android Developer | Kotlin | Jetpack Compose', 'color:#a78bfa;font-size:0.9rem;');
  console.log('%c🔗 https://github.com/Dev-moe-kyawaung', 'color:#34d399;font-size:0.8rem;');
  console.log('%c📧 moekyawaung@programmer.net', 'color:#f59e0b;font-size:0.8rem;');

})();
