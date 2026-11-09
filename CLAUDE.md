# Notes for AI assistants

- Static site for GitHub Pages: plain HTML, one stylesheet (`assets/css/style.css`), one script (`assets/js/main.js`). No build step, no frameworks.
- Language is Arabic, `dir="rtl"`. Keep all visible text in Arabic unless asked. Use CSS logical properties (`inset-inline-start`, `margin-inline-end`) so layout stays correct in RTL.
- Brand: logo `assets/img/logo.png`, font Tajawal, main colour `--primary: #14AECF`, logo green `--accent: #2BD97B`, dark `--ink: #0B1026`. Reuse existing classes (`.section`, `.head`, `.btn`, `.btn--grad`, `.product-card`, `.post`, `.prompt`, `.prose`, `.page-hero`) so new content matches.
- Products menu has exactly three categories: كتبنا (`books.html`), قوالب للتسويق (`templates.html`), برومبتات مجانية (`prompts.html`). The site no longer offers consulting or training courses — don't add them back unless asked.
- Blog articles are root-level pages (e.g. `copywriting-formulas.html`) using `.prose`, a sticky `.toc`, FAQ section and BlogPosting + FAQPage JSON-LD. New articles: link them from `blog.html`, the home blog section, and related articles; add to `sitemap.xml`.
- Prompts on `prompts.html` are `<article class="prompt" data-cat="...">` cards; categories: ads, social, email, seo, research, strategy.
- Header and footer are duplicated in every `.html` page — when editing them, update every page.
- Buy / register buttons open WhatsApp with a prefilled message (`https://wa.me/971552473989?text=...`). There is no cart or payment backend.
- When adding a page: copy an existing inner page (e.g. `blog.html`), add it to `sitemap.xml`, and link it from the header menu if needed.
- Never commit secrets or WordPress backups (`*.sql`, `*.sql.gz`, `wp-config.php`). The repo is public.
- Icons: Font Awesome 6 is self-hosted in `assets/vendor/fontawesome`.
- Cache busting: pages load `style.css`, `main.js` and Font Awesome with `?v=YYYYMMDDx`. Whenever you change CSS or JS, bump that version string in every `.html` page, otherwise visitors keep the old cached file and the layout breaks.
