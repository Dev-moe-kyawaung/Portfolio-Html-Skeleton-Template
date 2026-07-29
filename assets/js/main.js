/**
 * ============================================================
 * MOE KYAW AUNG — PORTFOLIO MAIN JAVASCRIPT
 * Version: 2.0 | Professional Edition
 * ============================================================
 */

(function() {
  'use strict';

  // ============================================================
  // [1] PRELOADER
  // ============================================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 500);
    });
    setTimeout(() => {
      if (!preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
      }
    }, 5000);
  }

  // ============================================================
  // [2] CUSTOM CURSOR
  // ============================================================
  const cursor = document.getElementById('cursor');
  if (cursor && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
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

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    currentTheme = savedTheme;
    html.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'light' && themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        currentTheme = 'light';
      } else {
        html.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        currentTheme = 'dark';
      }
      localStorage.setItem('theme', currentTheme);
    });
  }

  // ============================================================
  // [4] NAVBAR
  // ============================================================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  // Scroll effect
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Hamburger menu
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      hamburger.classList.toggle('active');
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 991) {
          navMenu.classList.remove('mobile-open');
          hamburger.classList.remove('active');
        }
      });
    });
  }

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function highlightNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.pageYOffset >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

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
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const pos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // ============================================================
  // [6] TYPING ANIMATION
  // ============================================================
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const phrases = [
      'Android Developer | Kotlin',
      'Jetpack Compose Expert',
      'MVVM | Clean Architecture',
      'Firebase | CI/CD Specialist',
      '12+ Years Experience'
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
      const current = phrases[phraseIndex];
      typingElement.textContent = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);

      charIndex += isDeleting ? -1 : 1;

      let delay = 80;
      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        delay = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

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
          animateCounter(el, target);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterValues.forEach(el => counterObserver.observe(el));

  function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = current;
    }, 16);
  }

  // Progress rings animation
  function animateRings() {
    const rings = ['ring-1', 'ring-2', 'ring-3', 'ring-4'];
    const values = [85, 92, 78, 95];
    rings.forEach((id, i) => {
      const ring = document.getElementById(id);
      if (ring) {
        const circumference = 2 * Math.PI * 35;
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = circumference;
        setTimeout(() => {
          ring.style.strokeDashoffset = circumference - (values[i] / 100) * circumference;
          ring.style.transition = 'stroke-dashoffset 2s ease';
        }, 500);
      }
    });
  }

  // Observe counters container for ring animation
  const counterSection = document.querySelector('.counter-section');
  if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateRings();
        observer.unobserve(counterSection);
      }
    }, { threshold: 0.3 });
    observer.observe(counterSection);
  }

  // ============================================================
  // [8] SCROLL REVEAL
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target
