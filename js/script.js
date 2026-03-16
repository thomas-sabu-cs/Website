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
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }

  // Set initial favicons: prefer saved, else system preference
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = (localStorage.getItem('darkMode') === 'enabled') ? 'dark' : (systemDark ? 'dark' : 'light');
  setFaviconsByTheme(initialTheme);

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');

      const isDark = document.body.classList.contains('dark-mode');
      if (isDark) {
        this.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
        setFaviconsByTheme('dark');
      } else {
        this.textContent = '🌙';
        localStorage.removeItem('darkMode');
        setFaviconsByTheme('light');
      }
    });
  }

  // Mobile navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
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

  // Project filters + Creative Viewer visibility
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');
  const creativeViewer = document.getElementById('creativeViewer'); // section placed after </main>

  function applyFilter(category) {
    // Toggle project cards
    projectCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const show = category === 'all' || category === cat;
      // Use empty string to let CSS layout decide default (e.g., flex/grid)
      card.style.display = show ? '' : 'none';
    });

    // Toggle Creative Viewer visibility (only for 'all' or 'creative')
    if (creativeViewer) {
      const shouldShowViewer = category === 'all' || category === 'creative';
      creativeViewer.hidden = !shouldShowViewer;
    }
  }

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Apply selected filter
        const filter = this.getAttribute('data-filter');
        applyFilter(filter);
      });
    });

    // Initialize filter state to match the currently active button (defaults to 'all')
    const activeBtn = document.querySelector('.filter-btn.active');
    applyFilter(activeBtn ? activeBtn.dataset.filter : 'all');
  } else {
    // If no filters on this page, ensure viewer is hidden by default (if present)
    if (creativeViewer) creativeViewer.hidden = true;
  }

  // Contact form submission (real, via Formspree)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      if (!contactForm.action || contactForm.action.includes('your-form-id-here')) {
        if (formStatus) {
          formStatus.textContent = 'Form backend not configured yet.';
        }
        return;
      }

      if (formStatus) {
        formStatus.textContent = 'Sending...';
      }

      const data = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          if (formStatus) {
            formStatus.textContent = 'Thanks for your message! I will get back to you soon.';
          }
          contactForm.reset();
        } else {
          if (formStatus) {
            formStatus.textContent = 'Oops, something went wrong. Please try again later.';
          }
        }
      } catch (err) {
        if (formStatus) {
          formStatus.textContent = 'Network error. Please check your connection and try again.';
        }
      }
    });
  }

  // Creative Coding Viewer wiring
  const projectSelect = document.getElementById('projectSelect');
  const projectFrame = document.getElementById('projectFrame');
  const framePlaceholder = document.getElementById('framePlaceholder');
  const openExternal = document.getElementById('openExternal');

  if (projectSelect && projectFrame && framePlaceholder && openExternal) {
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
        openExternal.style.display = 'inline-flex';
      }
    }

    projectSelect.addEventListener('change', () => {
      const url = projectSelect.value;
      if (!url) {
        projectFrame.removeAttribute('src');
        projectFrame.style.display = 'none';
        framePlaceholder.style.display = 'grid';
        openExternal.style.display = 'none';
        openExternal.href = '#';
        localStorage.removeItem('cc_last_project_url');
        return;
      }
      // Set iframe
      projectFrame.src = url;
      projectFrame.style.display = 'block';
      framePlaceholder.style.display = 'none';
      // External link
      openExternal.href = url;
      openExternal.style.display = 'inline-flex';
      // Persist selection
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

// Starfield background (replacing particles.js)
// Dark mode: black background with white stars
// Light mode: white background with black stars
window.addEventListener('load', function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'starfield-canvas';
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  const scale = 1;
  let stars = [];
  let pointerX = null;
  let pointerY = null;
  let touchInput = false;
  const velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };
  let frameId = 0;

  const STAR_COLOR_DARK = '#ffffff';
  const STAR_COLOR_LIGHT = '#000000';
  const STAR_SIZE = 3;
  const STAR_MIN_SCALE = 0.2;
  const OVERFLOW_THRESHOLD = 50;
  const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

  function currentTheme() {
    return document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  }

  function placeStar(star) {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  }

  function recycleStar(star) {
    let direction = 'z';
    const vx = Math.abs(velocity.x);
    const vy = Math.abs(velocity.y);

    if (vx > 1 || vy > 1) {
      let axis;
      if (vx > vy) {
        axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
      } else {
        axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
      }

      if (axis === 'h') direction = velocity.x > 0 ? 'l' : 'r';
      else direction = velocity.y > 0 ? 't' : 'b';
    }

    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

    if (direction === 'z') {
      star.z = 0.1;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    } else if (direction === 'l') {
      star.x = -OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === 'r') {
      star.x = width + OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === 't') {
      star.x = width * Math.random();
      star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === 'b') {
      star.x = width * Math.random();
      star.y = height + OVERFLOW_THRESHOLD;
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    if (!stars.length) {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        const star = { x: 0, y: 0, z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE) };
        placeStar(star);
        stars.push(star);
      }
    } else {
      stars.forEach(placeStar);
    }
  }

  function movePointer(x, y) {
    if (typeof pointerX === 'number' && typeof pointerY === 'number') {
      const ox = x - pointerX;
      const oy = y - pointerY;
      velocity.tx = velocity.tx + (ox / (8 * scale)) * (touchInput ? 1 : -1);
      velocity.ty = velocity.ty + (oy / (8 * scale)) * (touchInput ? 1 : -1);
    }
    pointerX = x;
    pointerY = y;
  }

  function onMouseMove(event) {
    touchInput = false;
    movePointer(event.clientX, event.clientY);
  }

  function onTouchMove(event) {
    touchInput = true;
    const t = event.touches[0];
    movePointer(t.clientX, t.clientY);
    event.preventDefault();
  }

  function onMouseLeave() {
    pointerX = null;
    pointerY = null;
  }

  function update() {
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;
    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;

    stars.forEach((star) => {
      star.x += velocity.x * star.z;
      star.y += velocity.y * star.z;
      star.x += (star.x - width / 2) * velocity.z * star.z;
      star.y += (star.y - height / 2) * velocity.z * star.z;
      star.z += velocity.z;

      if (
        star.x < -OVERFLOW_THRESHOLD ||
        star.x > width + OVERFLOW_THRESHOLD ||
        star.y < -OVERFLOW_THRESHOLD ||
        star.y > height + OVERFLOW_THRESHOLD
      ) {
        recycleStar(star);
      }
    });
  }

  function render() {
    const theme = currentTheme();
    const starColor = theme === 'light' ? STAR_COLOR_LIGHT : STAR_COLOR_DARK;
    const bgColor = theme === 'light' ? '#ffffff' : '#000000';

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    stars.forEach((star) => {
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineWidth = STAR_SIZE * star.z * scale;
      ctx.globalAlpha = 0.5 + 0.5 * Math.random();
      ctx.strokeStyle = starColor;

      ctx.beginPath();
      ctx.moveTo(star.x, star.y);

      let tailX = velocity.x * 2;
      let tailY = velocity.y * 2;
      if (Math.abs(tailX) < 0.1) tailX = 0.5;
      if (Math.abs(tailY) < 0.1) tailY = 0.5;

      ctx.lineTo(star.x + tailX, star.y + tailY);
      ctx.stroke();
    });
  }

  function step() {
    update();
    render();
    frameId = requestAnimationFrame(step);
  }

  resize();
  step();

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onMouseLeave);
  document.addEventListener('mouseleave', onMouseLeave);

  window.addEventListener('beforeunload', function() {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onMouseLeave);
    document.removeEventListener('mouseleave', onMouseLeave);
  });
});
