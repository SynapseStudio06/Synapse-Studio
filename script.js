// =====================================================
// SYNAPSE STUDIO - PREMIUM CREATIVE AGENCY
// Vanilla JavaScript - Animations, Scroll, Interactions
// =====================================================

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initParallax();
  initStats();
  initPortfolioFilter();
  initFormHandler();
  initNumberCounter();
});

// ===== NAVBAR =====

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      mobileMenu?.classList.remove('active');
    });
  });
}

// ===== SCROLL ANIMATIONS with Intersection Observer =====

function initScrollAnimations() {
  const revealElements = document.querySelectorAll(
    '.reveal-up, .reveal-scale, .story-panel'
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        if (entry.target.classList.contains('reveal-up')) {
          entry.target.style.transform = 'translateY(0)';
        } else if (entry.target.classList.contains('reveal-scale')) {
          entry.target.style.transform = 'scale(1)';
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    observer.observe(el);
  });
}

// ===== PARALLAX SCROLLING =====

function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    parallaxElements.forEach(el => {
      const speed = el.dataset.parallax || 0.5;
      el.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  });

  // Add parallax to orbs and video sections
  const orbs = document.querySelectorAll('.orb');
  orbs.forEach(orb => {
    orb.setAttribute('data-parallax', '0.3');
  });

  const bgVideo = document.getElementById('bgVideo');
  if (bgVideo) {
    bgVideo.parentElement.setAttribute('data-parallax', '-0.2');
  }
}

// ===== STATS COUNTER ANIMATION =====

function initStats() {
  const statNumbers = document.querySelectorAll('.stat-num');

  const counterObserverOptions = {
    threshold: 0.5
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        entry.target.classList.add('counted');
        counterObserver.unobserve(entry.target);
      }
    });
  }, counterObserverOptions);

  statNumbers.forEach(num => {
    counterObserver.observe(num);
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 30; // 30 frames
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 50);
}

// ===== PORTFOLIO FILTER =====

function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-cat');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Re-trigger animation
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===== FORM HANDLER =====

function initFormHandler() {
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Show success message
      const message = document.createElement('div');
      message.textContent = 'Message sent! We\'ll get back to you soon.';
      message.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #a855f7, #ec4899);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 2000;
        animation: slideDown 0.5s ease-out;
      `;

      document.body.appendChild(message);

      // Remove message after 4 seconds
      setTimeout(() => {
        message.style.animation = 'slideUp 0.5s ease-out';
        setTimeout(() => message.remove(), 500);
      }, 4000);

      // Reset form
      form.reset();

      // Log data (in real app, send to server)
      console.log('Form submitted:', data);
    });
  }
}

// ===== NUMBER COUNTER (for stats) =====

function initNumberCounter() {
  const counterElements = document.querySelectorAll('[data-target]');

  const options = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        if (!entry.target.classList.contains('started')) {
          countUp(entry.target, target);
          entry.target.classList.add('started');
        }
      }
    });
  }, options);

  counterElements.forEach(el => observer.observe(el));
}

function countUp(element, target) {
  let current = 0;
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = target / steps;
  const stepDuration = duration / steps;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepDuration);
}

// ===== SMOOTH SCROLL HELPER =====

function smoothScroll(target, duration = 1000) {
  const startPosition = window.scrollY;
  const element = document.querySelector(target);

  if (!element) return;

  const endPosition = element.getBoundingClientRect().top + window.scrollY - 80;
  const distance = endPosition - startPosition;
  let start = null;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / duration;

    window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  });
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ===== CUSTOM SCROLL ANIMATIONS =====

// Animate elements on scroll
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;

  // Parallax effect for video section
  const videoSection = document.getElementById('video-section');
  if (videoSection) {
    const rect = videoSection.getBoundingClientRect();
    if (rect.top < windowHeight && rect.bottom > 0) {
      const parallaxValue = (rect.bottom / windowHeight) * 30;
      videoSection.style.setProperty('--parallax', `${parallaxValue}px`);
    }
  }
});

// ===== ADD REQUIRED ANIMATIONS TO CSS (via script) =====

const slideAnimations = document.createElement('style');
slideAnimations.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  /* Smooth scroll state */
  .scroll-smooth {
    scroll-behavior: smooth;
  }
`;

document.head.appendChild(slideAnimations);

// ===== LAZY LOADING IMAGES (optional enhancement) =====

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ===== PERFORMANCE OPTIMIZATION: Debounce =====

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== ON RESIZE HANDLER (Debounced) =====

window.addEventListener('resize', debounce(() => {
  // Re-calculate parallax on resize if needed
}, 250));

// ===== CUSTOM CURSOR EFFECT (Optional Enhancement) =====

function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--neon-purple);
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
    display: none;
    box-shadow: 0 0 10px var(--neon-purple);
  `;

  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX - 4 + 'px';
    cursor.style.top = e.clientY - 4 + 'px';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
  });
}

// Initialize custom cursor on interactive devices
if (window.matchMedia('(pointer:fine)').matches) {
  // initCustomCursor(); // Uncomment if desired
}

// ===== SCROLL TO TOP BUTTON =====

function initScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #a855f7, #ec4899);
    color: white;
    border: none;
    cursor: pointer;
    z-index: 999;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    font-size: 1.5rem;
    font-weight: bold;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
    display: none;
  `;

  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'block';
      scrollBtn.style.opacity = '1';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.display = 'none';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.15)';
  });

  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1)';
  });
}

initScrollToTop();

// ===== REVEAL ANIMATIONS ON PAGE LOAD =====

window.addEventListener('load', () => {
  // Trigger initial animations
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');
  revealElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
    }, index * 50);
  });
});

// ===== HANDLE MOBILE VIDEO AUTOPLAY =====

function handleMobileVideo() {
  const videos = document.querySelectorAll('video');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  videos.forEach(video => {
    if (isMobile) {
      video.removeAttribute('autoplay');
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
    }
  });
}

handleMobileVideo();

// ===== EXPORT FOR TESTING (if needed) =====

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    smoothScroll,
    initNavbar,
    initScrollAnimations,
    initParallax,
    initStats
  };
}

console.log('🎨 SYNAPSE STUDIO loaded. Ready to dominate.');
