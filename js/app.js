/**
 * SHEIKH NAIM — DEVELOPER PORTFOLIO
 * Vanilla JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFilter();
  initRotatingText();
  initScrollSpy();
  initMobileMenu();
  initContactForm();
});

/* --- 1. Theme Switcher (OLED Dark / Minimal Light) --- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('theme') || 'dark-mode';
  if (savedTheme === 'light-mode') {
    body.classList.add('light-mode');
    updateThemeIcon(true);
  } else {
    body.classList.remove('light-mode');
    updateThemeIcon(false);
  }

  toggleBtn.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light-mode' : 'dark-mode');
    updateThemeIcon(isLight);
  });

  function updateThemeIcon(isLight) {
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    }
  }
}

/* --- 2. Project Category Filtering --- */
function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const match = filter === 'all' || category === filter;

        if (match) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          }, 250);
        }
      });
    });
  });
}

/* --- 3. Hero Rotating Text --- */
function initRotatingText() {
  const el = document.querySelector('.rotating-text');
  if (!el) return;

  const phrases = [
    'iOS apps in Swift',
    'Android apps in Kotlin',
    'full-stack web apps',
    'PHP & MySQL backends',
    'modern UI/UX designs',
    'scalable clean code'
  ];
  let index = 0;

  setInterval(() => {
    el.style.opacity = '0';
    setTimeout(() => {
      index = (index + 1) % phrases.length;
      el.textContent = phrases[index];
      el.style.opacity = '1';
    }, 250);
  }, 2800);
}

/* --- 4. Navigation Scroll Spy & Navbar Blur --- */
function initScrollSpy() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    let currentSection = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --- 5. Mobile Navigation Menu --- */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.className = isActive ? 'fas fa-xmark' : 'fas fa-bars';
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });
}

/* --- 6. Contact Form Submission Handler --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.classList.add('btn-success');
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('btn-success');
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}