// DoDigital — small site script (no libraries needed)
const WHATSAPP = "971568841083"; // WhatsApp number used by every "buy / contact" button
const EMAIL = "info@dodigital.me";

document.addEventListener("DOMContentLoaded", () => {
  // sticky header (home page only — inner pages already have a solid header)
  const header = document.querySelector(".header");
  if (header && !header.classList.contains("header--solid")) {
    const onScroll = () => header.classList.toggle("is-sticky", window.scrollY > 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // mobile menu
  const nav = document.querySelector(".nav");
  document.querySelectorAll("[data-menu-open]").forEach(b => b.addEventListener("click", () => nav.classList.add("open")));
  document.querySelectorAll("[data-menu-close]").forEach(b => b.addEventListener("click", () => nav.classList.remove("open")));

  // fade-in on scroll + counters
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  function countUp(el) {
    const target = parseInt(el.dataset.count, 10);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = target.toLocaleString("en-US"); return; }
    const start = performance.now(), dur = 1600;
    const tick = now => {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // newsletter → opens the visitor's email app addressed to DoDigital
  document.querySelectorAll("[data-newsletter]").forEach(form => form.addEventListener("submit", e => {
    e.preventDefault();
    const mail = form.querySelector("input").value.trim();
    if (!mail) return;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("اشتراك في النشرة البريدية")}&body=${encodeURIComponent("أرغب بالاشتراك في النشرة البريدية: " + mail)}`;
  }));

  // contact form → sends the message on WhatsApp
  const contact = document.querySelector("[data-contact-form]");
  if (contact) contact.addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(contact);
    const msg = `مرحباً DoDigital 👋\nالاسم: ${f.get("name")}\nالبريد: ${f.get("email")}\nالموضوع: ${f.get("subject")}\n\n${f.get("message")}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });

  // year in footer
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
});
