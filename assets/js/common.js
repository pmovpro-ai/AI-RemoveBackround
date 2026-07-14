document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguageRedirect();
  initMobileMenu();
  initFAQ();
});

/* Theme Management (Dark / Light Mode) */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  
  // Check local storage or system preferences
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark-theme');
    updateThemeIcons(true);
  } else {
    document.documentElement.classList.remove('dark-theme');
    updateThemeIcons(false);
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
      showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'success');
    });
  });
}

function updateThemeIcons(isDark) {
  const icons = document.querySelectorAll('.theme-toggle i');
  icons.forEach(icon => {
    if (isDark) {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });
}

/* Language Auto-Redirect on First Visit */
function initLanguageRedirect() {
  const path = window.location.pathname;
  const currentLang = document.documentElement.getAttribute('lang') || 'en';
  
  // Store preference based on currently loaded language
  localStorage.setItem('lang_preference', currentLang);

  const hasRedirected = localStorage.getItem('lang_redirected');
  
  // Detect first visit on English index and auto-redirect Arabic users
  if (currentLang === 'en' && !hasRedirected) {
    const isIndexPage = path === '/' || path === '' || path.endsWith('/index.html') || path.endsWith('/');
    if (isIndexPage) {
      const userLang = navigator.language || navigator.userLanguage;
      if (userLang && userLang.startsWith('ar')) {
        localStorage.setItem('lang_redirected', 'true');
        localStorage.setItem('lang_preference', 'ar');
        
        // Compute relative path to /ar/index.html based on current URL path
        let target = 'ar/index.html';
        if (path.endsWith('index.html')) {
          target = path.replace('index.html', 'ar/index.html');
        } else if (path.endsWith('/')) {
          target = path + 'ar/index.html';
        } else {
          target = '/ar/index.html';
        }
        window.location.href = target;
      }
    }
  }
}

/* Mobile Menu Toggle */
function initMobileMenu() {
  const mobileToggles = document.querySelectorAll('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  mobileToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (mobileNav) {
        mobileNav.classList.toggle('open');
        const icon = toggle.querySelector('i');
        if (icon) {
          if (mobileNav.classList.contains('open')) {
            icon.className = 'fas fa-times';
          } else {
            icon.className = 'fas fa-bars';
          }
        }
      }
    });
  });
}

/* FAQ Accordion Toggle */
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other FAQs
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
      });
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* Global Toast Notification System */
window.showToast = function(message, type = 'success') {
  const container = document.getElementById('toastNotification');
  if (!container) return;

  const iconEl = container.querySelector('.notification-icon i');
  const textEl = container.querySelector('.notification-text');

  container.className = `notification ${type}`;
  
  if (iconEl) {
    if (type === 'success') {
      iconEl.className = 'fas fa-check-circle';
    } else if (type === 'error') {
      iconEl.className = 'fas fa-exclamation-circle';
    } else {
      iconEl.className = 'fas fa-info-circle';
    }
  }

  if (textEl) {
    textEl.textContent = message;
  }

  container.style.display = 'flex';
  // Force reflow
  container.offsetHeight;
  container.classList.add('show');

  // Auto hide after 4 seconds
  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }

  window.toastTimeout = setTimeout(() => {
    container.classList.remove('show');
    setTimeout(() => {
      container.style.display = 'none';
    }, 300);
  }, 4000);
};
