/* ============================================
   REACH CONSTRUCTION — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initStatCounters();
  initProjectFilters();
  initContactForm();
  initSmoothScroll();
});

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled state
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.mobile-overlay');
  const links = document.querySelectorAll('.nav-links a');

  if (!hamburger) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

/* ---------- Scroll Reveal (Intersection Observer) ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---------- Animated Stat Counters ---------- */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-count]');

  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* ---------- Project Gallery Filter ---------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;

    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = {
      name: form.querySelector('#name').value,
      email: form.querySelector('#email').value,
      phone: form.querySelector('#phone').value,
      subject: form.querySelector('#subject').value,
      message: form.querySelector('#message').value,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast('success', '✓ Message sent successfully! We\'ll get back to you soon.');
        form.reset();
      } else {
        showToast('error', '✕ ' + (data.error || 'Something went wrong. Please try again.'));
      }
    } catch (err) {
      showToast('error', '✕ Network error. Please check your connection and try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

/* ---------- Toast Notification ---------- */
function showToast(type, message) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}
