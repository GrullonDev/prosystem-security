/* ========================================
   Pro System Security - JavaScript
   ======================================== */

const CONTACT_EMAIL = 'info@prosystem-security.com';

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initActiveNavOnScroll();
  initContactForm();
  initServiceCardTilt();
  initSmoothScroll();
  initBackToTop();
  initFAQ();
  initCounterAnimation();
});

/* ---------- Preloader ---------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 600);
  });

  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 3000);
}

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const backdrop = document.getElementById('mobileBackdrop');
  const navLinks = navMenu.querySelectorAll('.nav-link');

  function openMenu() {
    navMenu.classList.add('open');
    navToggle.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && !backdrop.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.service-card, .process-step, .about-value, .about-stat-card, .project-card, .testimonial-card, .faq-item, .contact-item, .contact-form-wrapper, .cta-card'
  );

  elements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
    observer.observe(el);
  });
}

/* ---------- Active Nav Link on Scroll ---------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* ---------- Service Card Tilt ---------- */
function initServiceCardTilt() {
  const cards = document.querySelectorAll('.service-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---------- Counter Animation ---------- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.trust-number[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  function updateCounter() {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(updateCounter);
}

/* ---------- FAQ Accordion ---------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------- Back to Top ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Contact Form Validation & Submission ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  const validators = {
    name: (value) => {
      if (!value.trim()) return 'Ingresa tu nombre completo.';
      if (value.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
      return '';
    },
    email: (value) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) return 'Ingresa tu correo electrónico.';
      if (!re.test(value.trim())) return 'Ingresa un correo electrónico válido.';
      return '';
    },
    phone: (value) => {
      if (!value.trim()) return '';
      const re = /^[+\d\s-]{8,15}$/;
      if (!re.test(value.trim())) return 'Ingresa un teléfono válido.';
      return '';
    },
    service: (value) => {
      if (!value) return 'Selecciona un servicio.';
      return '';
    },
    message: (value) => {
      if (!value.trim()) return 'Cuéntanos qué necesitas.';
      if (value.trim().length < 10) return 'Danos un poco más de detalle (mínimo 10 caracteres).';
      return '';
    }
  };

  Object.keys(validators).forEach(fieldName => {
    const field = form.elements[fieldName];
    if (!field) return;
    field.addEventListener('blur', () => validateField(fieldName));
    field.addEventListener('input', () => {
      const group = field.closest('.form-group');
      if (group && group.classList.contains('error')) {
        validateField(fieldName);
      }
    });
  });

  function validateField(fieldName) {
    const field = form.elements[fieldName];
    const errorEl = document.getElementById(`${fieldName}Error`);
    const group = field.closest('.form-group');
    const message = validators[fieldName](field.value);

    if (message) {
      group.classList.add('error');
      errorEl.textContent = message;
    } else {
      group.classList.remove('error');
      errorEl.textContent = '';
    }
    return !message;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fieldsValid = Object.keys(validators).map(validateField);
    if (fieldsValid.includes(false)) {
      note.textContent = 'Revisa los campos marcados antes de continuar.';
      note.classList.remove('success');
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const serviceLabels = {
      informatica: 'Informática',
      finanzas: 'Finanzas',
      seguridad: 'Seguridad',
      visitas: 'Visitas Técnicas',
      electrico: 'Eléctrico',
      otro: 'Otro'
    };

    const subject = `Solicitud de cotización - ${serviceLabels[data.service] || data.service}`;
    const bodyLines = [
      `Nombre: ${data.name}`,
      `Correo: ${data.email}`,
      data.phone ? `Teléfono: ${data.phone}` : null,
      `Servicio de interés: ${serviceLabels[data.service] || data.service}`,
      '',
      data.message
    ].filter(Boolean);

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    window.location.href = mailtoLink;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Solicitud Lista
    `;
    submitBtn.style.background = 'linear-gradient(135deg, #17d3ff, #0a58ff)';

    note.textContent = 'Se abrió tu cliente de correo. Completa el envío desde ahí, o escríbenos directo por WhatsApp.';
    note.classList.add('success');

    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalHTML;
      submitBtn.style.background = '';
      note.textContent = '';
      note.classList.remove('success');
    }, 8000);
  });
}

/* ---------- Smooth Scroll for Anchor Links ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}