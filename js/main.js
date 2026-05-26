// ─── Theme ────────────────────────────────────────────────────────────────────

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('slon-theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('slon-theme');
  applyTheme(saved || getSystemTheme());
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

initTheme();
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Sync if OS preference changes and user hasn't manually set
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('slon-theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// ─── Language ───────────────────────────────────────────────────────────────

function detectLang() {
  const saved = localStorage.getItem("slon-lang");
  if (saved) return saved;
  const browser = (navigator.language || navigator.userLanguage || "").toLowerCase();
  return browser.startsWith("ru") ? "ru" : "en";
}

let currentLang = detectLang();

function applyLang(lang) {
  const t = window.translations[lang];
  if (!t) return;
  currentLang = lang;
  localStorage.setItem("slon-lang", lang);

  // page meta
  document.documentElement.lang = lang;
  document.title = t["page.title"];
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = t["page.desc"];

  // all data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // lang toggle button label
  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = t["lang.toggle"];

  // legal name
  const legalName = document.getElementById("legalName");
  if (legalName) legalName.textContent = t["legal.name"];

  // footer name
  const footerName = document.getElementById("footerName");
  if (footerName) footerName.textContent = t["footer.name"];

  // logo swap (ready for EN logo)
  const logoEl = document.getElementById("logoImg");
  if (logoEl && window.logoAssets && window.logoAssets[lang]) {
    logoEl.src = window.logoAssets[lang].src;
    logoEl.alt = window.logoAssets[lang].alt;
  }
}

document.getElementById("langToggle").addEventListener("click", () => {
  applyLang(currentLang === "ru" ? "en" : "ru");
});

// ─── Scroll header shadow ────────────────────────────────────────────────────

const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  header.classList.toggle("header--scrolled", window.scrollY > 20);
}, { passive: true });

// ─── Intersection reveal ─────────────────────────────────────────────────────

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".card, .value, .about__text, .about__logo-wrap, .contact__inner").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

// ─── Smooth scroll for nav links ─────────────────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ─── Init ────────────────────────────────────────────────────────────────────

applyLang(currentLang);
