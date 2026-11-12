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

  // prompt library: open in AI, category tabs + search
  document.querySelectorAll(".prompt [data-ai]").forEach(a => {
    const q = encodeURIComponent(a.closest(".prompt").querySelector("pre").innerText.trim());
    a.href = a.dataset.ai === "claude" ? "https://claude.ai/new?q=" + q : "https://chatgpt.com/?q=" + q;
  });
  const tabs = document.querySelectorAll("[data-filter]");
  const search = document.querySelector("[data-prompt-search]");
  const count = document.querySelector("[data-prompt-count]");
  const none = document.querySelector("[data-no-results]");
  let filter = "all";
  const applyPrompts = () => {
    const q = search ? search.value.trim().toLowerCase() : "";
    let n = 0;
    document.querySelectorAll(".prompt[data-cat]").forEach(p => {
      const show = (filter === "all" || p.dataset.cat === filter) && (!q || p.textContent.toLowerCase().includes(q));
      p.hidden = !show; if (show) n++;
    });
    if (count) count.textContent = n + " برومبت";
    if (none) none.hidden = n > 0;
  };
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.toggle("active", t === tab));
    filter = tab.dataset.filter; applyPrompts();
  }));
  if (search) search.addEventListener("input", applyPrompts);
  document.querySelectorAll("[data-goto]").forEach(b => b.addEventListener("click", () => {
    const t = document.querySelector('[data-filter="' + b.dataset.goto + '"]');
    if (t) { t.click(); t.scrollIntoView({ behavior: "smooth", block: "center" }); }
  }));
  const hashTab = location.hash && document.querySelector('[data-filter="' + location.hash.slice(1) + '"]');
  if (hashTab) hashTab.click();

  // 3D book viewer: drag to rotate, click/Enter to flip, gentle idle sway
  document.querySelectorAll("[data-book3d]").forEach(book => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ry = -28, rx = 4, idle = !reduce, t0 = performance.now(), drag = null;
    const set = () => { book.style.setProperty("--ry", ry + "deg"); book.style.setProperty("--rx", rx + "deg"); };
    const tick = now => { if (idle) { ry = -24 + Math.sin((now - t0) / 1400) * 16; set(); } requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
    const flip = () => { idle = false; book.classList.add("anim"); ry += 180; rx = 4; set(); };
    book.addEventListener("pointerdown", e => { idle = false; book.classList.remove("anim"); drag = { x: e.clientX, y: e.clientY, ry, rx, moved: false }; book.setPointerCapture(e.pointerId); book.classList.add("dragging"); });
    book.addEventListener("pointermove", e => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) drag.moved = true;
      ry = drag.ry + dx * 0.6; rx = Math.max(-25, Math.min(25, drag.rx - dy * 0.3)); set();
    });
    const end = () => { if (!drag) return; const wasClick = !drag.moved; drag = null; book.classList.remove("dragging"); if (wasClick) flip(); };
    book.addEventListener("pointerup", end); book.addEventListener("pointercancel", end);
    book.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") { idle = false; book.classList.add("anim"); ry += e.key === "ArrowLeft" ? -30 : 30; set(); }
    });
  });

  // look-inside gallery lightbox
  document.querySelectorAll("[data-inside]").forEach(gal => {
    const items = [...gal.querySelectorAll("button")];
    const box = document.createElement("div"); box.className = "lightbox"; box.hidden = true;
    box.innerHTML = '<img alt=""><button type="button" aria-label="إغلاق"><i class="fas fa-xmark"></i></button><button type="button" class="nav nav--prev" aria-label="السابق"><i class="fas fa-chevron-right"></i></button><button type="button" class="nav nav--next" aria-label="التالي"><i class="fas fa-chevron-left"></i></button>';
    document.body.appendChild(box);
    const img = box.querySelector("img"); let i = 0;
    const show = n => { i = (n + items.length) % items.length; img.src = items[i].dataset.full; img.alt = items[i].querySelector("img").alt; box.hidden = false; };
    items.forEach((b, n) => b.addEventListener("click", () => show(n)));
    const [close, prev, next] = box.querySelectorAll("button");
    close.addEventListener("click", () => { box.hidden = true; });
    prev.addEventListener("click", () => show(i - 1)); next.addEventListener("click", () => show(i + 1));
    box.addEventListener("click", e => { if (e.target === box) box.hidden = true; });
    document.addEventListener("keydown", e => { if (box.hidden) return; if (e.key === "Escape") box.hidden = true; if (e.key === "ArrowLeft") show(i + 1); if (e.key === "ArrowRight") show(i - 1); });
  });

  // ===== Leads (free gift + newsletter) =====
  // Fill these from the Google Form "pre-filled link" to save every signup silently into Google Sheets.
  // While FORM is empty, signups are sent to DoDigital's WhatsApp instead, so no lead is lost.
  const LEADS = {
    FORM: "",          // e.g. "https://docs.google.com/forms/d/e/XXXX/formResponse"
    NAME: "",          // e.g. "entry.1111111111"
    EMAIL: "",         // e.g. "entry.2222222222"
    SOURCE: ""         // optional, e.g. "entry.3333333333"
  };
  const saveLead = async (name, email, source) => {
    if (LEADS.FORM && LEADS.EMAIL) {
      const fd = new FormData();
      if (LEADS.NAME) fd.append(LEADS.NAME, name || "");
      fd.append(LEADS.EMAIL, email);
      if (LEADS.SOURCE) fd.append(LEADS.SOURCE, source);
      try { await fetch(LEADS.FORM, { method: "POST", mode: "no-cors", body: fd }); } catch (_) {}
      return;
    }
    const msg = `مرحباً DoDigital 👋\n${source === "gift" ? "أرغب بالهدية المجانية (عينة مخطط 2027)" : "أرغب بالاشتراك في النشرة البريدية"}\nالاسم: ${name || "-"}\nالبريد: ${email}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };
  const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  // free gift: name + email required before the download appears
  document.querySelectorAll("[data-gift-form]").forEach(form => {
    const box = form.closest("[data-gift]"), done = box && box.querySelector("[data-gift-done]");
    const unlock = () => { form.hidden = true; if (done) done.hidden = false; };
    try { if (localStorage.getItem("dd_gift") === "1") unlock(); } catch (_) {}
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const name = form.querySelector("[name=name]").value.trim(), email = form.querySelector("[name=email]").value.trim();
      const err = form.querySelector("[data-err]");
      if (name.length < 2 || !validEmail(email)) { if (err) err.hidden = false; return; }
      if (err) err.hidden = true;
      form.querySelector("button").disabled = true;
      await saveLead(name, email, "gift");
      try { localStorage.setItem("dd_gift", "1"); } catch (_) {}
      unlock();
      const a = done && done.querySelector("a[download]"); if (a) a.click();
    });
  });

  // newsletter forms
  document.querySelectorAll("[data-newsletter]").forEach(form => form.addEventListener("submit", async e => {
    e.preventDefault();
    const email = form.querySelector("input[type=email]").value.trim();
    const nameEl = form.querySelector("[name=name]");
    if (!validEmail(email)) return;
    await saveLead(nameEl ? nameEl.value.trim() : "", email, "newsletter");
    form.innerHTML = '<p class="subscribe-done"><i class="fas fa-circle-check"></i> شكرًا لاشتراكك! ستصلك رسائلنا قريبًا.</p>';
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
