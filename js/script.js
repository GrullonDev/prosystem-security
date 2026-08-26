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
  initCCTVQuoteWizard();
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
  if (!form) return;

  const note = document.getElementById("formNote");
  const wrapper = document.querySelector(".contact-form-wrapper");
  const steps = Array.from(form.querySelectorAll(".form-step"));
  const indicators = Array.from(document.querySelectorAll(".form-step-indicator"));
  const lines = Array.from(document.querySelectorAll(".form-step-line"));
  const serviceCards = Array.from(form.querySelectorAll(".form-service-card"));
  const urgencyPills = Array.from(form.querySelectorAll(".form-urgency-pill"));
  const messageField = document.getElementById("message");
  const charCount = document.getElementById("messageCharCount");
  const summaryBox = document.getElementById("formSummary");
  const whatsappBtn = document.getElementById("contactWhatsappBtn");
  const submitBtn = form.querySelector('button[type="submit"]');

  const serviceLabels = {
    informatica: "Informática",
    finanzas: "Finanzas",
    seguridad: "Seguridad",
    visitas: "Visitas Técnicas",
    electrico: "Eléctrico",
    otro: "Otro",
  };

  const urgencyLabels = {
    hoy: "Hoy mismo (urgente)",
    semana: "Esta semana",
    cotizando: "Solo estoy cotizando",
  };

  let currentStep = 1;

  function goToStep(n) {
    currentStep = n;
    steps.forEach((panel) => {
      panel.classList.toggle(
        "active",
        Number(panel.dataset.stepPanel) === n
      );
    });
    indicators.forEach((ind) => {
      const stepNum = Number(ind.dataset.step);
      ind.classList.toggle("active", stepNum === n);
      ind.classList.toggle("completed", stepNum < n);
    });
    lines.forEach((line, i) => {
      line.classList.toggle("completed", i + 1 < n);
    });
    if (n === 3) renderSummary();
    if (wrapper) wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  serviceCards.forEach((card) => {
    const input = card.querySelector("input");
    input.addEventListener("change", () => {
      serviceCards.forEach((c) =>
        c.classList.toggle("selected", c.querySelector("input").checked)
      );
    });
  });

  urgencyPills.forEach((pill) => {
    const input = pill.querySelector("input");
    input.addEventListener("change", () => {
      urgencyPills.forEach((p) =>
        p.classList.toggle("selected", p.querySelector("input").checked)
      );
    });
  });

  if (messageField && charCount) {
    messageField.addEventListener("input", () => {
      charCount.textContent = `${messageField.value.length}/500`;
      if (messageField.value.trim().length >= 10) {
        setFieldValid("messageError", messageField);
      }
    });
  }

  function setFieldError(errorId, field, message) {
    const errorEl = document.getElementById(errorId);
    const group = field ? field.closest(".form-group") : null;
    if (group) group.classList.add("error");
    if (errorEl) errorEl.textContent = message;
  }

  function setFieldValid(errorId, field) {
    const errorEl = document.getElementById(errorId);
    const group = field ? field.closest(".form-group") : null;
    if (group) group.classList.remove("error");
    if (errorEl) errorEl.textContent = "";
  }

  function validateService() {
    const checked = form.querySelector('input[name="service"]:checked');
    if (!checked) {
      setFieldError("serviceError", null, "Selecciona un servicio.");
      return false;
    }
    setFieldValid("serviceError", null);
    return true;
  }

  function validateMessage() {
    const value = messageField.value.trim();
    if (!value) {
      setFieldError("messageError", messageField, "Cuéntanos qué necesitas.");
      return false;
    }
    if (value.length < 10) {
      setFieldError(
        "messageError",
        messageField,
        "Danos un poco más de detalle (mínimo 10 caracteres)."
      );
      return false;
    }
    setFieldValid("messageError", messageField);
    return true;
  }

  function validateName() {
    const field = document.getElementById("name");
    const value = field.value.trim();
    if (!value) {
      setFieldError("nameError", field, "Ingresa tu nombre completo.");
      return false;
    }
    if (value.length < 3) {
      setFieldError(
        "nameError",
        field,
        "El nombre debe tener al menos 3 caracteres."
      );
      return false;
    }
    setFieldValid("nameError", field);
    return true;
  }

  function validateEmail(isRequired) {
    const field = document.getElementById("email");
    const value = field.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      if (isRequired) {
        setFieldError("emailError", field, "Ingresa tu correo electrónico.");
        return false;
      }
      setFieldValid("emailError", field);
      return true;
    }
    if (!re.test(value)) {
      setFieldError(
        "emailError",
        field,
        "Ingresa un correo electrónico válido."
      );
      return false;
    }
    setFieldValid("emailError", field);
    return true;
  }

  function validatePhone() {
    const field = document.getElementById("phone");
    const value = field.value.trim();
    if (!value) {
      setFieldValid("phoneError", field);
      return true;
    }
    const re = /^[+\d\s-]{8,15}$/;
    if (!re.test(value)) {
      setFieldError("phoneError", field, "Ingresa un teléfono válido.");
      return false;
    }
    setFieldValid("phoneError", field);
    return true;
  }

  ["name", "email", "phone"].forEach((id) => {
    const field = document.getElementById(id);
    field.addEventListener("blur", () => {
      if (id === "name") validateName();
      if (id === "email") validateEmail(false);
      if (id === "phone") validatePhone();
    });
    field.addEventListener("input", () => {
      const group = field.closest(".form-group");
      if (!group || !group.classList.contains("error")) return;
      if (id === "name") validateName();
      if (id === "email") validateEmail(false);
      if (id === "phone") validatePhone();
    });
  });

  form.querySelectorAll(".form-next").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep === 1 && !validateService()) return;
      if (currentStep === 2 && !validateMessage()) return;
      goToStep(Number(btn.dataset.next));
    });
  });

  form.querySelectorAll(".form-prev").forEach((btn) => {
    btn.addEventListener("click", () => goToStep(Number(btn.dataset.prev)));
  });

  function renderSummary() {
    if (!summaryBox) return;
    const service = form.querySelector('input[name="service"]:checked');
    const urgency = form.querySelector('input[name="urgency"]:checked');
    const rows = [
      [
        "Servicio",
        service ? serviceLabels[service.value] || service.value : "—",
      ],
      [
        "Prioridad",
        urgency ? urgencyLabels[urgency.value] : urgencyLabels.cotizando,
      ],
      ["Mensaje", messageField.value.trim() || "—"],
    ];

    summaryBox.innerHTML = "";
    rows.forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "form-summary-row";
      const labelEl = document.createElement("span");
      labelEl.className = "form-summary-label";
      labelEl.textContent = label;
      const valueEl = document.createElement("span");
      valueEl.className = "form-summary-value";
      valueEl.textContent = value;
      row.appendChild(labelEl);
      row.appendChild(valueEl);
      summaryBox.appendChild(row);
    });
  }

  function buildMessageParts() {
    const data = Object.fromEntries(new FormData(form));
    return {
      data,
      serviceLabel: serviceLabels[data.service] || data.service || "No especificado",
      urgencyLabel: urgencyLabels[data.urgency] || urgencyLabels.cotizando,
    };
  }

  function showNote(text, success) {
    note.textContent = text;
    note.classList.toggle("success", !!success);
  }

  function resetAfterSend() {
    setTimeout(() => {
      form.reset();
      serviceCards.forEach((c) => c.classList.remove("selected"));
      urgencyPills.forEach((p) => p.classList.remove("selected"));
      const defaultUrgency = form.querySelector(
        'input[name="urgency"][value="cotizando"]'
      );
      if (defaultUrgency) {
        defaultUrgency.checked = true;
        defaultUrgency.closest(".form-urgency-pill").classList.add("selected");
      }
      if (charCount) charCount.textContent = "0/500";
      showNote("", false);
      goToStep(1);
    }, 8000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validName = validateName();
    const validEmail = validateEmail(true);
    const validPhone = validatePhone();
    if (!validName || !validEmail || !validPhone) return;

    const { data, serviceLabel, urgencyLabel } = buildMessageParts();
    const subject = `Solicitud de contacto - ${serviceLabel}`;
    const bodyLines = [
      `Nombre: ${data.name}`,
      `Correo: ${data.email}`,
      data.phone ? `Teléfono: ${data.phone}` : null,
      `Servicio de interés: ${serviceLabel}`,
      `Prioridad: ${urgencyLabel}`,
      "",
      data.message,
    ].filter(Boolean);

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailtoLink;

    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Solicitud Lista
    `;

    showNote(
      "Se abrió tu cliente de correo. Completa el envío desde ahí.",
      true
    );

    setTimeout(() => {
      submitBtn.innerHTML = originalHTML;
    }, 8000);
    resetAfterSend();
  });

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      const validName = validateName();
      const validPhone = validatePhone();
      if (!validName || !validPhone) return;

      const { data, serviceLabel, urgencyLabel } = buildMessageParts();
      const lines = [
        `Hola, soy ${data.name}.`,
        `Servicio de interés: ${serviceLabel}`,
        `Prioridad: ${urgencyLabel}`,
        data.phone ? `Teléfono: ${data.phone}` : null,
        data.email ? `Correo: ${data.email}` : null,
        "",
        data.message,
      ].filter(Boolean);

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        lines.join("\n")
      )}`;
      window.open(url, "_blank", "noopener");

      showNote("Se abrió WhatsApp con tu mensaje listo para enviar.", true);
      resetAfterSend();
    });
  }
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
  const summaryTotal = document.getElementById("quoteSummaryTotal");
  const summaryTotalPrice = document.getElementById("quoteSummaryTotalPrice");
  const summaryDisclaimer = document.getElementById("quoteSummaryDisclaimer");
  const noteField = document.getElementById("quoteNote");
  const whatsappBtn = document.getElementById("quoteWhatsappBtn");
  const clearBtn = document.getElementById("quoteClearBtn");

  function formatQ(amount) {
    return `Q${amount.toLocaleString("es-GT")}`;
  }

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
      summaryTotal.hidden = true;
      summaryDisclaimer.hidden = true;
      return;
    }

    summaryEmpty.style.display = "none";
    whatsappBtn.disabled = false;

    let total = 0;

    checked.forEach((cb) => {
      const price = Number(cb.dataset.price) || 0;
      total += price;

      const item = document.createElement("div");
      item.className = "quote-summary-item";

      const info = document.createElement("div");
      const areaLabel = document.createElement("span");
      areaLabel.className = "quote-summary-area";
      areaLabel.textContent = cb.dataset.area;
      const serviceLabel = document.createElement("span");
      serviceLabel.className = "quote-summary-service";
      serviceLabel.textContent = cb.value;
      const priceLabel = document.createElement("span");
      priceLabel.className = "quote-summary-price";
      priceLabel.textContent = price > 0 ? `Desde ${formatQ(price)}` : "Gratis";
      info.appendChild(areaLabel);
      info.appendChild(serviceLabel);
      info.appendChild(priceLabel);

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

    summaryTotal.hidden = false;
    summaryDisclaimer.hidden = false;
    summaryTotalPrice.textContent =
      total > 0 ? `Desde ${formatQ(total)}` : "Gratis";
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
    let total = 0;
    checked.forEach((cb) => {
      const area = cb.dataset.area;
      const price = Number(cb.dataset.price) || 0;
      total += price;
      if (!grouped[area]) grouped[area] = [];
      grouped[area].push({ name: cb.value, price });
    });

    const lines = ["Hola, quisiera solicitar una cotización para:", ""];
    Object.keys(grouped).forEach((area) => {
      lines.push(`*${area}*`);
      grouped[area].forEach((service) =>
        lines.push(
          `- ${service.name} (${
            service.price > 0 ? `Desde ${formatQ(service.price)}` : "Gratis"
          })`
        )
      );
      lines.push("");
    });

    lines.push(
      `*Total aproximado: ${total > 0 ? `Desde ${formatQ(total)}` : "Gratis"}*`
    );
    lines.push("(Precio referencial, sujeto a confirmación final)");
    lines.push("");

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

/* ---------- CCTV Quote Wizard ----------
   Pricing here is an editable example, calibrated so a 4-camera
   Full/analog kit with audio = Q2,700. Update the numbers in
   CCTV_CONFIG once real prices are confirmed. */
const CCTV_CONFIG = {
  sizes: [4, 8, 16],
  volumeDiscount: { 4: 1, 8: 0.95, 16: 0.9 },
  audioPerUnit: 50,
  tech: {
    analog: {
      label: "Análogas (HD-CVI/TVI)",
      surcharge: 0,
      wiring:
        "Usan cable coaxial (RG59) + fuente de poder y se conectan a un DVR. Ideal si ya existe cableado coaxial instalado o buscas el costo más bajo.",
    },
    ip: {
      label: "IP (Red)",
      surcharge: 150,
      wiring:
        "Usan cable de red UTP Cat6 y se conectan a un NVR con switch PoE (un solo cable lleva datos y energía). Mejor resolución y calidad de video remoto.",
    },
  },
  tiers: {
    full: {
      label: "Full",
      desc: "Kit completo: mayor resolución, visión nocturna mejorada y más días de grabación.",
      perCamera: 625,
    },
    estandar: {
      label: "Estándar",
      desc: "Cobertura básica de accesos y áreas comunes, resolución HD.",
      perCamera: 500,
    },
    dual: {
      label: "Dual (audio bidireccional)",
      desc: "Cámaras con audio de dos vías (habla y escucha en tiempo real). Ideal para portones y recepción.",
      perCamera: 750,
      includesAudio: true,
    },
    perimetral: {
      label: "Perimetral",
      desc: "Enfocado en el perímetro exterior: mayor alcance IR, detección de movimiento y resistencia a la intemperie.",
      perCamera: 900,
      unitLabel: "puntos",
    },
  },
};

function initCCTVQuoteWizard() {
  const wizard = document.getElementById("cctvWizard");
  if (!wizard) return;

  const sizeContainer = document.getElementById("cctvSizeOptions");
  const techContainer = document.getElementById("cctvTechOptions");
  const wiringNote = document.getElementById("cctvWiringNote");
  const tierContainer = document.getElementById("cctvTierOptions");
  const audioRow = document.getElementById("cctvAudioRow");
  const audioToggle = document.getElementById("cctvAudioToggle");
  const audioHint = document.getElementById("cctvAudioHint");
  const result = document.getElementById("cctvResult");
  const resultSummary = document.getElementById("cctvResultSummary");
  const resultPrice = document.getElementById("cctvResultPrice");
  const whatsappBtn = document.getElementById("cctvWhatsappBtn");

  const state = { size: 4, tech: "analog", tier: "full", audio: false };

  function unitLabel() {
    return CCTV_CONFIG.tiers[state.tier].unitLabel || "cámaras";
  }

  function computePrice() {
    const tier = CCTV_CONFIG.tiers[state.tier];
    const tech = CCTV_CONFIG.tech[state.tech];
    const volume = CCTV_CONFIG.volumeDiscount[state.size] || 1;
    let total = (tier.perCamera + tech.surcharge) * state.size * volume;
    if (state.audio && !tier.includesAudio) {
      total += CCTV_CONFIG.audioPerUnit * state.size;
    }
    return Math.round(total / 10) * 10;
  }

  function renderSizeOptions() {
    sizeContainer.innerHTML = "";
    CCTV_CONFIG.sizes.forEach((size) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cctv-option" + (state.size === size ? " active" : "");
      btn.textContent = `${size} ${unitLabel()}`;
      btn.addEventListener("click", () => {
        state.size = size;
        renderSizeOptions();
        update();
      });
      sizeContainer.appendChild(btn);
    });
  }

  function renderTechOptions() {
    techContainer.innerHTML = "";
    Object.keys(CCTV_CONFIG.tech).forEach((key) => {
      const tech = CCTV_CONFIG.tech[key];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cctv-option" + (state.tech === key ? " active" : "");
      btn.textContent = tech.label;
      btn.addEventListener("click", () => {
        state.tech = key;
        renderTechOptions();
        update();
      });
      techContainer.appendChild(btn);
    });
  }

  function renderTierOptions() {
    tierContainer.innerHTML = "";
    Object.keys(CCTV_CONFIG.tiers).forEach((key) => {
      const tier = CCTV_CONFIG.tiers[key];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cctv-option" + (state.tier === key ? " active" : "");
      btn.innerHTML = `<span class="cctv-option-name">${tier.label}</span><span class="cctv-option-desc">${tier.desc}</span>`;
      btn.addEventListener("click", () => {
        state.tier = key;
        renderTierOptions();
        renderSizeOptions();
        update();
      });
      tierContainer.appendChild(btn);
    });
  }

  function update() {
    wiringNote.textContent = CCTV_CONFIG.tech[state.tech].wiring;
    wiringNote.hidden = false;

    const tier = CCTV_CONFIG.tiers[state.tier];
    if (tier.includesAudio) {
      audioToggle.checked = true;
      audioToggle.disabled = true;
      audioRow.classList.add("disabled");
      audioHint.textContent = "Audio bidireccional incluido en este sistema.";
    } else {
      audioToggle.disabled = false;
      audioRow.classList.remove("disabled");
      audioHint.textContent = `+ Q${
        CCTV_CONFIG.audioPerUnit * state.size
      } por audio en las ${state.size} ${unitLabel()}`;
    }

    const price = computePrice();
    const label = unitLabel();
    const audioActive = tier.includesAudio || state.audio;

    resultSummary.innerHTML = `Kit de <strong>${state.size} ${label}</strong> · Tecnología <strong>${
      CCTV_CONFIG.tech[state.tech].label
    }</strong> · Sistema <strong>${tier.label}</strong> · Audio: <strong>${
      audioActive ? "Sí" : "No"
    }</strong>`;
    resultPrice.textContent = `Q${price.toLocaleString("es-GT")}`;
    result.hidden = false;
  }

  audioToggle.addEventListener("change", () => {
    state.audio = audioToggle.checked;
    update();
  });

  whatsappBtn.addEventListener("click", () => {
    const tier = CCTV_CONFIG.tiers[state.tier];
    const tech = CCTV_CONFIG.tech[state.tech];
    const price = computePrice();
    const audioActive = tier.includesAudio || state.audio;
    const label = unitLabel();

    const lines = [
      "Hola, quisiera solicitar esta cotización de cámaras CCTV:",
      "",
      `- Kit: ${state.size} ${label}`,
      `- Tecnología: ${tech.label}`,
      `- Sistema: ${tier.label}`,
      `- Audio: ${audioActive ? "Sí" : "No"}`,
      `- Precio estimado: Q${price.toLocaleString("es-GT")}`,
      "",
      "¿Podrían confirmar disponibilidad y coordinar una visita técnica?",
    ];

    const message = encodeURIComponent(lines.join("\n"));
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener"
    );
  });

  renderSizeOptions();
  renderTechOptions();
  renderTierOptions();
  update();
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

