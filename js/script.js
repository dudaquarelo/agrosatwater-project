const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');


window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
  toggleScrollTop();
});

// Hamburger //
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu?.classList.toggle('open');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  });
});

function setActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-menu a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
setActiveNavLink();

// SCROLL TO TOP //
const scrollTopBtn = document.querySelector('.scroll-top');

function toggleScrollTop() {
  if (window.scrollY > 400) {
    scrollTopBtn?.classList.add('visible');
  } else {
    scrollTopBtn?.classList.remove('visible');
  }
}

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// REVEAL ON SCROLL //
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
  revealObserver.observe(el);
});

// FAQ ACCORDION //
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// VALIDACAO FORMULARIO DE CONTATO //
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const fields = contactForm.querySelectorAll('[required]');
    fields.forEach(field => {
      const group = field.closest('.form-group');
      const errorMsg = group?.querySelector('.error-msg');

      field.classList.remove('error');
      group?.classList.remove('invalid');

      if (!field.value.trim()) {
        field.classList.add('error');
        group?.classList.add('invalid');
        if (errorMsg) errorMsg.textContent = 'Este campo é obrigatório.';
        valid = false;
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        field.classList.add('error');
        group?.classList.add('invalid');
        if (errorMsg) errorMsg.textContent = 'Digite um e-mail válido.';
        valid = false;
      }
    });

    if (valid) {
      const formInner = contactForm.querySelector('.form-inner');
      const successMsg = contactForm.querySelector('.form-success');
      if (formInner) formInner.style.display = 'none';
      if (successMsg) successMsg.style.display = 'block';
    }
  });

  contactForm.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      field.closest('.form-group')?.classList.remove('invalid');
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// MODAL //
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const modalTriggers = document.querySelectorAll('[data-modal]');

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    if (modalOverlay) {
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeModal() {
  modalOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose?.addEventListener('click', closeModal);

modalOverlay?.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ANIMACAO SENSOR BARS //
function animateSensorBars() {
  const bars = document.querySelectorAll('.sensor-bar-fill');
  bars.forEach(bar => {
    const target = bar.dataset.width || '0%';
    setTimeout(() => {
      bar.style.width = target;
    }, 600);
  });
}

const heroSection = document.querySelector('.hero');
if (heroSection) {
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateSensorBars();
      heroObserver.disconnect();
    }
  });
  heroObserver.observe(heroSection);
}

function animateChartBars() {
  const chartBars = document.querySelectorAll('.chart-bar[data-height]');
  chartBars.forEach((bar, i) => {
    const height = bar.dataset.height || '0%';
    setTimeout(() => {
      bar.style.height = height;
    }, 200 + i * 80);
  });
}

const dashSection = document.querySelector('.dashboard-section');
if (dashSection) {
  const dashObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateChartBars();
      dashObserver.disconnect();
    }
  });
  dashObserver.observe(dashSection);
}

// TABS (Solução page) //
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ANIMACAO COUNTER //
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const isFloat = el.dataset.count.includes('.');
  const duration = 1600;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isFloat ? target.toFixed(1) : target.toLocaleString();
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));