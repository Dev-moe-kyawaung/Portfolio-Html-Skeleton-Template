const particlesConfig = {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: '#6c63ff' },
    shape: { type: 'circle' },
    opacity: { value: 0.4, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1 } },
    size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.5 } },
    line_linked: { enable: true, distance: 150, color: '#6c63ff', opacity: 0.2, width: 1 },
    move: { enable: true, speed: 1.5, direction: 'none', random: true, out_mode: 'out' }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
    modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
  },
  retina_detect: true
};
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) particlesJS('particles-js', particlesConfig);
