// Original particles.js background configuration (saved for reference).
// This was previously at the bottom of js/script.js.

window.addEventListener('load', function() {
  if (!window.particlesJS) {
    console.warn('particlesJS is not available. Check that vendor/particles/particles.min.js is loaded before script.js');
    return;
  }

  // If your #particles-js has pointer-events: none or is covered by overlays,
  // you can switch detect_on to 'window' for reliable hover/click detection.
  const interactivityDetectTarget = 'canvas'; // 'canvas' or 'window'

  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#4f8cff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#4f8cff', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: interactivityDetectTarget,
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        repulse: { distance: 120, duration: 0.4 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
});

