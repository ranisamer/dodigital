// DoDigital — site script (no libraries)
const WHATSAPP = "971552473989"; // WhatsApp number used by every buy / contact button
const EMAIL = "info@dodigital.me";
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  // header: glass background after scrolling
  const header = document.querySelector(".header");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // mobile menu
  const nav = document.querySelector(".nav");
  document.querySelectorAll("[data-menu-open]").forEach(b => b.addEventListener("click", () => nav.classList.add("open")));
  document.querySelectorAll("[data-menu-close]").forEach(b => b.addEventListener("click", () => nav.classList.remove("open")));
  document.addEventListener("keydown", e => { if (e.key === "Escape") nav && nav.classList.remove("open"); });

  // fade-in on scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add("in"));

  // copy prompt buttons
  document.querySelectorAll("[data-copy]").forEach(btn => btn.addEventListener("click", async () => {
    const text = btn.closest(".prompt").querySelector("pre").innerText.trim();
    try { await navigator.clipboard.writeText(text); }
    catch { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }
    const old = btn.innerHTML;
    btn.classList.add("done"); btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
    setTimeout(() => { btn.classList.remove("done"); btn.innerHTML = old; }, 1800);
  }));

  // prompt category tabs
  const tabs = document.querySelectorAll("[data-filter]");
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.toggle("active", t === tab));
    const f = tab.dataset.filter;
    document.querySelectorAll(".prompt[data-cat]").forEach(p => { p.hidden = f !== "all" && p.dataset.cat !== f; });
  }));

  // newsletter → opens the visitor's email app addressed to DoDigital
  document.querySelectorAll("[data-newsletter]").forEach(form => form.addEventListener("submit", e => {
    e.preventDefault();
    const mail = form.querySelector("input").value.trim();
    if (!mail) return;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("اشتراك في النشرة البريدية")}&body=${encodeURIComponent("أرغب بالاشتراك في النشرة البريدية: " + mail)}`;
  }));

  // contact form → WhatsApp message
  const contact = document.querySelector("[data-contact-form]");
  if (contact) contact.addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(contact);
    const msg = `مرحباً DoDigital 👋\nالاسم: ${f.get("name")}\nالبريد: ${f.get("email")}\nالموضوع: ${f.get("subject") || "-"}\n\n${f.get("message")}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
});
