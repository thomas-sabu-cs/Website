// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  // Favicons: switch set based on theme (light/dark)
  function setFaviconsByTheme(theme) {
    const dir = theme === 'light' ? 'light' : 'dark';
    const version = theme; // cache-bust on theme change

    const map = {
      'favicon-16':  `photos/favicon/${dir}/favicon-16x16.png`,
      'favicon-32':  `photos/favicon/${dir}/favicon-32x32.png`,
      'favicon-192': `photos/favicon/${dir}/android-chrome-192x192.png`,
      'favicon-512': `photos/favicon/${dir}/android-chrome-512x512.png`,
      'apple-icon':  `photos/favicon/${dir}/apple-touch-icon.png`,
      'favicon-ico': `photos/favicon/${dir}/favicon.ico`,
    };

    Object.entries(map).forEach(([id, href]) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('href', `${href}?v=${version}`);
    });
  }

  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }

  // Set initial favicons: prefer saved, else system preference
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = (localStorage.getItem('darkMode') === 'enabled') ? 'dark' : (systemDark ? 'dark' : 'light');
  setFaviconsByTheme(initialTheme);

  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');
    if (isDark) {
      this.textContent = '☀️';
      localStorage.setItem('darkMode', 'enabled');
      setFaviconsByTheme('dark');
    } else {
      this.textContent = '🌙';
      localStorage.setItem('darkMode', null);
      setFaviconsByTheme('light');
    }
  });

  // Mobile navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    const toggleNav = () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    };
    hamburger.addEventListener('click', toggleNav);
    hamburger.addEventListener('keypress', (e) => { if (e.key === 'Enter') toggleNav(); });
  }

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  window.addEventListener('load', checkReveal);

  // Project filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Form submission (demo)
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! This is a demo form - in a real website, your message would be sent to the website owner.');
    });
  }

  // Creative Coding Viewer
  const projectSelect = document.getElementById('projectSelect');
  const projectFrame = document.getElementById('projectFrame');
  const framePlaceholder = document.getElementById('framePlaceholder');
  const openExternal = document.getElementById('openExternal');

  if (projectSelect && projectFrame) {
    // Restore last viewed project
    const savedProjectUrl = localStorage.getItem('cc_last_project_url');
    if (savedProjectUrl) {
      const opt = Array.from(projectSelect.options).find(o => o.value === savedProjectUrl);
      if (opt) {
        projectSelect.value = savedProjectUrl;
        projectFrame.src = savedProjectUrl;
        projectFrame.style.display = 'block';
        framePlaceholder.style.display = 'none';
        openExternal.href = savedProjectUrl;
        openExternal.style.display = 'inline-block';
      }
    }

    projectSelect.addEventListener('change', () => {
      const url = projectSelect.value;
      if (!url) {
        projectFrame.removeAttribute('src');
        projectFrame.style.display = 'none';
        framePlaceholder.style.display = 'grid';
        openExternal.style.display = 'none';
        localStorage.removeItem('cc_last_project_url');
        return;
      }
      // Set iframe
      projectFrame.src = url;
      projectFrame.style.display = 'block';
      framePlaceholder.style.display = 'none';
      // External link
      openExternal.href = url;
      openExternal.style.display = 'inline-block';
      // Persist
      localStorage.setItem('cc_last_project_url', url);
    });

    // Handle iframe load errors gracefully (optional)
    projectFrame.addEventListener('error', () => {
      projectFrame.style.display = 'none';
      framePlaceholder.style.display = 'grid';
      framePlaceholder.textContent = 'Could not load the project. Check that GitHub Pages is enabled and the folder has an index.html';
    });
  }
});

// Defer decorative particles until after first paint
window.addEventListener('load', function() {
  if (!window.particlesJS) {
    console.warn('particlesJS is not available. Check that vendor/particles/particles.min.js is loaded before script.js');
    return;
  }

  // If your #particles-js has pointer-events: none or is covered by overlays,
  // you can switch detect_on to 'window' for reliable hover/click detection.
  const interactivityDetectTarget = 'canvas'; // change to 'window' if needed

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
      detect_on: interactivityDetectTarget, // 'canvas' or 'window'
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
