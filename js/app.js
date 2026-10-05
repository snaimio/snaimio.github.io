/**
 * SHEIKH NAIM — DEVELOPER PORTFOLIO
 * Production-Grade Vanilla JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initProjectFiltering();
  initCopyEmail();
  initScrollSpy();
  initMobileDrawer();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. THEME ENGINE (Dark / Light Mode with System Preference & LocalStorage)
   -------------------------------------------------------------------------- */
function initThemeEngine() {
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('theme-preference');
  const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    body.classList.add('light-theme');
    updateThemeIcon(true);
  } else {
    body.classList.remove('light-theme');
    updateThemeIcon(false);
  }

  themeBtn.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-theme');
    localStorage.setItem('theme-preference', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
    showToast(isLight ? 'Switched to Light Theme' : 'Switched to Dark Theme', 'info');
  });

  function updateThemeIcon(isLight) {
    const icon = themeBtn.querySelector('i');
    if (icon) {
      icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    }
  }
}

/* --------------------------------------------------------------------------
   2. PROJECT CATEGORY FILTERING (Smooth CSS Transition)
   -------------------------------------------------------------------------- */
function initProjectFiltering() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const allProjectItems = document.querySelectorAll('[data-category]');

  if (!filterTabs.length || !allProjectItems.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedFilter = tab.getAttribute('data-filter');

      allProjectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const matches = selectedFilter === 'all' || itemCategory === selectedFilter;

        if (matches) {
          item.style.display = '';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          setTimeout(() => {
            if (item.style.opacity === '0') {
              item.style.display = 'none';
            }
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. 1-CLICK COPY & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const copyVal = btn.getAttribute('data-copy') || 'https://www.linkedin.com/in/snaimio';
      try {
        await navigator.clipboard.writeText(copyVal);
        showToast(`Copied to clipboard!`, 'success');
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = copyVal;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied to clipboard!`, 'success');
      }
    });
  });
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
  toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

/* --------------------------------------------------------------------------
   4. SCROLL-SPY & HEADER ELEVATION
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header glassmorphism on scroll
    if (header) {
      header.classList.toggle('scrolled', scrollY > 40);
    }

    // Scroll spy section highlighting
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 140;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   5. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isActive = drawer.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', String(isActive));
  });

  // Close when tapping links
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('active')) {
      drawer.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM SUBMISSION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    if (!btn) return;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;

    showToast('Message sent! Please also connect directly via LinkedIn.', 'success');

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
      }, 3000);
    }, 1000);
  });
}