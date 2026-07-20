/* ========================================
   Pro System Security - JavaScript
   ======================================== */

const CONTACT_EMAIL = "info@prosystem-security.com";
const WHATSAPP_NUMBER = "50249095105";

document.addEventListener("DOMContentLoaded", () => {
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
  initQuoteBuilder();
  initCoverageChecker();
  initCurrentYear();
});

/* ---------- Preloader ---------- */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  document.body.classList.add("loading");

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
      document.body.classList.remove("loading");
    }, 600);
  });

  setTimeout(() => {
    preloader.classList.add("hidden");
    document.body.classList.remove("loading");
  }, 3000);
}

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const backdrop = document.getElementById("mobileBackdrop");
  const navLinks = navMenu.querySelectorAll(".nav-link");

  function openMenu() {
    navMenu.classList.add("open");
    navToggle.classList.add("active");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  navToggle.addEventListener("click", () => {
    if (navMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener("click", closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    if (
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target) &&
      !backdrop.contains(e.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu.classList.contains("open")) {
      closeMenu();
    }
  });
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    ".service-card, .process-step, .about-value, .about-stat-card, .project-card, .testimonial-card, .faq-item, .contact-item, .contact-form-wrapper, .cta-card, .quote-main, .quote-summary, .coverage-widget"
  );

  elements.forEach((el) => el.classList.add("fade-in"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
    observer.observe(el);
  });
}

/* ---------- Active Nav Link on Scroll ---------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "-80px 0px -50% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Service Card Tilt ---------- */
function initServiceCardTilt() {
  const cards = document.querySelectorAll(".service-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * -8;
      const rotateY = (x / rect.width - 0.5) * 8;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ---------- Counter Animation ---------- */
function initCounterAnimation() {
  const counters = document.querySelectorAll(".trust-number[data-target]");

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

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
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
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem
          .querySelector(".faq-question")
          .setAttribute("aria-expanded", "false");
      });

      if (!isActive) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* ---------- Back to Top ---------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Contact Form Validation & Submission ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  const validators = {
    name: (value) => {
      if (!value.trim()) return "Ingresa tu nombre completo.";
      if (value.trim().length < 3)
        return "El nombre debe tener al menos 3 caracteres.";
      return "";
    },
    email: (value) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) return "Ingresa tu correo electrónico.";
      if (!re.test(value.trim()))
        return "Ingresa un correo electrónico válido.";
      return "";
    },
    phone: (value) => {
      if (!value.trim()) return "";
      const re = /^[+\d\s-]{8,15}$/;
      if (!re.test(value.trim())) return "Ingresa un teléfono válido.";
      return "";
    },
    service: (value) => {
      if (!value) return "Selecciona un servicio.";
      return "";
    },
    message: (value) => {
      if (!value.trim()) return "Cuéntanos qué necesitas.";
      if (value.trim().length < 10)
        return "Danos un poco más de detalle (mínimo 10 caracteres).";
      return "";
    },
  };

  Object.keys(validators).forEach((fieldName) => {
    const field = form.elements[fieldName];
    if (!field) return;
    field.addEventListener("blur", () => validateField(fieldName));
    field.addEventListener("input", () => {
      const group = field.closest(".form-group");
      if (group && group.classList.contains("error")) {
        validateField(fieldName);
      }
    });
  });

  function validateField(fieldName) {
    const field = form.elements[fieldName];
    const errorEl = document.getElementById(`${fieldName}Error`);
    const group = field.closest(".form-group");
    const message = validators[fieldName](field.value);

    if (message) {
      group.classList.add("error");
      errorEl.textContent = message;
    } else {
      group.classList.remove("error");
      errorEl.textContent = "";
    }
    return !message;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fieldsValid = Object.keys(validators).map(validateField);
    if (fieldsValid.includes(false)) {
      note.textContent = "Revisa los campos marcados antes de continuar.";
      note.classList.remove("success");
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const serviceLabels = {
      informatica: "Informática",
      finanzas: "Finanzas",
      seguridad: "Seguridad",
      visitas: "Visitas Técnicas",
      electrico: "Eléctrico",
      otro: "Otro",
    };

    const subject = `Solicitud de cotización - ${
      serviceLabels[data.service] || data.service
    }`;
    const bodyLines = [
      `Nombre: ${data.name}`,
      `Correo: ${data.email}`,
      data.phone ? `Teléfono: ${data.phone}` : null,
      `Servicio de interés: ${serviceLabels[data.service] || data.service}`,
      "",
      data.message,
    ].filter(Boolean);

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailtoLink;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Solicitud Lista
    `;
    submitBtn.style.background = "linear-gradient(135deg, #17d3ff, #0a58ff)";

    note.textContent =
      "Se abrió tu cliente de correo. Completa el envío desde ahí, o escríbenos directo por WhatsApp.";
    note.classList.add("success");

    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalHTML;
      submitBtn.style.background = "";
      note.textContent = "";
      note.classList.remove("success");
    }, 8000);
  });
}

/* ---------- Smooth Scroll for Anchor Links ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* ---------- Dynamic Footer Year ---------- */
function initCurrentYear() {
  const yearEl = document.getElementById("currentYear");
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
}

/* ---------- Quote Builder (Cotizador Interactivo) ---------- */
function initQuoteBuilder() {
  const tabs = document.querySelectorAll(".quote-tab");
  const panels = document.querySelectorAll(".quote-panel");
  const checkboxes = document.querySelectorAll('input[name="quoteService"]');
  const summaryList = document.getElementById("quoteSummaryList");
  const summaryEmpty = document.getElementById("quoteSummaryEmpty");
  const noteField = document.getElementById("quoteNote");
  const whatsappBtn = document.getElementById("quoteWhatsappBtn");
  const clearBtn = document.getElementById("quoteClearBtn");

  if (!tabs.length || !checkboxes.length || !whatsappBtn) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const area = tab.getAttribute("data-area");

      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      panels.forEach((panel) => {
        panel.classList.toggle(
          "active",
          panel.getAttribute("data-area") === area
        );
      });
    });
  });

  function renderSummary() {
    const checked = Array.from(checkboxes).filter((cb) => cb.checked);

    summaryList
      .querySelectorAll(".quote-summary-item")
      .forEach((item) => item.remove());

    if (checked.length === 0) {
      summaryEmpty.style.display = "";
      whatsappBtn.disabled = true;
      return;
    }

    summaryEmpty.style.display = "none";
    whatsappBtn.disabled = false;

    checked.forEach((cb) => {
      const item = document.createElement("div");
      item.className = "quote-summary-item";

      const info = document.createElement("div");
      const areaLabel = document.createElement("span");
      areaLabel.className = "quote-summary-area";
      areaLabel.textContent = cb.dataset.area;
      const serviceLabel = document.createElement("span");
      serviceLabel.className = "quote-summary-service";
      serviceLabel.textContent = cb.value;
      info.appendChild(areaLabel);
      info.appendChild(serviceLabel);

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "quote-summary-remove";
      removeBtn.setAttribute("aria-label", `Quitar ${cb.value}`);
      removeBtn.innerHTML =
        '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
      removeBtn.addEventListener("click", () => {
        cb.checked = false;
        cb.closest(".quote-pill").classList.remove("checked");
        renderSummary();
      });

      item.appendChild(info);
      item.appendChild(removeBtn);
      summaryList.appendChild(item);
    });
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      cb.closest(".quote-pill").classList.toggle("checked", cb.checked);
      renderSummary();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      checkboxes.forEach((cb) => {
        cb.checked = false;
        cb.closest(".quote-pill").classList.remove("checked");
      });
      if (noteField) noteField.value = "";
      renderSummary();
    });
  }

  whatsappBtn.addEventListener("click", () => {
    const checked = Array.from(checkboxes).filter((cb) => cb.checked);
    if (checked.length === 0) return;

    const grouped = {};
    checked.forEach((cb) => {
      const area = cb.dataset.area;
      if (!grouped[area]) grouped[area] = [];
      grouped[area].push(cb.value);
    });

    const lines = ["Hola, quisiera solicitar una cotización para:", ""];
    Object.keys(grouped).forEach((area) => {
      lines.push(`*${area}*`);
      grouped[area].forEach((service) => lines.push(`- ${service}`));
      lines.push("");
    });

    const note = noteField ? noteField.value.trim() : "";
    if (note) {
      lines.push(`Detalles adicionales: ${note}`);
      lines.push("");
    }
    lines.push("Quedo atento(a) a su respuesta. ¡Gracias!");

    const message = encodeURIComponent(lines.join("\n"));
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener"
    );
  });

  renderSummary();
}

/* ---------- Coverage Checker (Verificador de Cobertura) ---------- */
function initCoverageChecker() {
  const select = document.getElementById("coverageZone");
  const btn = document.getElementById("coverageCheckBtn");
  const result = document.getElementById("coverageResult");

  if (!select || !btn || !result) return;

  const ICONS = {
    direct:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15.5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/></svg>',
    extended:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6V11C4 16.5 7.4 21.3 12 22.5C16.6 21.3 20 16.5 20 11V6L12 2Z" stroke="currentColor" stroke-width="1.5"/></svg>',
    check:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M9.5 9.5C9.5 8 10.6 7 12 7C13.4 7 14.5 8 14.5 9.3C14.5 10.6 12 10.8 12 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16.2" r="0.9" fill="currentColor"/></svg>',
  };

  const MESSAGES = {
    direct: {
      title: "¡Cobertura confirmada!",
      text: (zone) =>
        `Atendemos ${zone} de forma directa, con visita técnica el mismo día hábil.`,
      cta: (zone) =>
        `Hola, quisiera confirmar cobertura y agendar una visita en ${zone}.`,
    },
    extended: {
      title: "Cobertura extendida",
      text: (zone) =>
        `${zone} está dentro de nuestra zona de cobertura extendida. Coordinamos la visita según disponibilidad.`,
      cta: (zone) =>
        `Hola, quisiera confirmar disponibilidad de cobertura extendida en ${zone}.`,
    },
    check: {
      title: "Consultemos tu zona",
      text: (zone) =>
        `Aún no tenemos ${zone} registrada. Escríbenos y confirmamos disponibilidad en minutos.`,
      cta: (zone) =>
        `Hola, quisiera consultar si tienen cobertura en ${zone}.`,
    },
  };

  function showResult() {
    const option = select.options[select.selectedIndex];
    if (!option || !option.value) {
      select.focus();
      return;
    }

    const tier = option.dataset.tier || "check";
    const zone = option.textContent.trim();
    const data = MESSAGES[tier];
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      data.cta(zone)
    )}`;

    result.hidden = false;
    result.className = `coverage-result coverage-result-${tier}`;
    result.innerHTML = `
      <div class="coverage-result-icon">${ICONS[tier]}</div>
      <div class="coverage-result-body">
        <h3>${data.title}</h3>
        <p>${data.text(zone)}</p>
        <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn coverage-result-cta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20.5 12C20.5 16.7 16.7 20.5 12 20.5C10.5 20.5 9.1 20.13 7.9 19.44L3.5 20.5L4.6 16.24C3.83 14.98 3.5 13.55 3.5 12C3.5 7.3 7.3 3.5 12 3.5C16.7 3.5 20.5 7.3 20.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Confirmar por WhatsApp
        </a>
      </div>
    `;
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  btn.addEventListener("click", showResult);
  select.addEventListener("change", () => {
    if (!result.hidden) showResult();
  });
}
