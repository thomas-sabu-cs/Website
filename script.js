// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize particles.js
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#4f8cff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#4f8cff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
      detect_on: "canvas",
      events: { 
        onhover: { enable: true, mode: "repulse" }, 
        onclick: { enable: true, mode: "push" } 
      }
    }
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }
  
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      this.textContent = '☀️';
      localStorage.setItem('darkMode', 'enabled');
    } else {
      this.textContent = '🌙';
      localStorage.setItem('darkMode', null);
    }
  });

  // Mobile navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
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
  
  // Form submission (you'll need to add backend functionality)
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would typically send the form data to a server
      // For now, we'll just show an alert
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

