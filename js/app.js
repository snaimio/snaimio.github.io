
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFilter();
  initScrollEffects();
  initMobileMenu();
  initRotatingText();
  initSmoothScroll();
  initContactForm();
});

// --- 1. Theme Toggle ---
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = btn.querySelector('i');

  const saved = localStorage.getItem('theme') || 'light-mode';
  body.className = saved;
  icon.className = saved === 'light-mode' ? 'fas fa-moon' : 'fas fa-circle-half-stroke';

  btn.addEventListener('click', () => {
    const isLight = body.classList.contains('light-mode');
    body.classList.replace(
      isLight ? 'light-mode' : 'dark-mode',
      isLight ? 'dark-mode' : 'light-mode'
    );
    icon.className = isLight ? 'fas fa-circle-half-stroke' : 'fas fa-moon';
    localStorage.setItem('theme', isLight ? 'dark-mode' : 'light-mode');
  });
}

// --- 2. Project Filter ---
function initFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;

        if (match) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = '';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => { card.style.display = 'none'; }, 280);
        }
      });
    });
  });
}

// --- 3. Scroll Effects ---
function initScrollEffects() {
  const nav = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 160) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }, { passive: true });
}

// --- 4. Mobile Menu ---
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    menuBtn.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuBtn.querySelector('i').className = 'fas fa-bars';
    });
  });
}

// --- 5. Rotating Text ---
function initRotatingText() {
  const el = document.querySelector('.rotating-text');
  if (!el) return;

  const phrases = [
    'mobile experiences',
    'iOS apps in Swift',
    'Android apps in Kotlin',
    'UI/UX prototypes',
    'clean, testable code',
  ];
  let index = 0;

  setInterval(() => {
    el.style.opacity = '0';
    setTimeout(() => {
      index = (index + 1) % phrases.length;
      el.textContent = phrases[index];
      el.style.opacity = '1';
    }, 220);
  }, 3000);
}

// --- 6. Smooth Scroll ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// --- 7. Contact Form ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}