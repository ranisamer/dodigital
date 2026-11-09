# Notes for AI assistants

- Static site for GitHub Pages: plain HTML, one stylesheet (`assets/css/style.css`), one script (`assets/js/main.js`). No build step, no frameworks.
- Language is Arabic, `dir="rtl"`. Keep all visible text in Arabic unless asked. Use CSS logical properties (`inset-inline-start`, `margin-inline-end`) so layout stays correct in RTL.
- Brand: logo `assets/img/logo.png`, font Tajawal, main colour `--primary: #14AECF`, logo green `--accent: #2BD97B`. Reuse the existing classes (`.btn`, `.card`, `.section`, `.row-head`, `.cards`) for new content so it matches.
- Header and footer are duplicated in every `.html` page — when editing them, update every page.
- Buy / register buttons open WhatsApp with a prefilled message (`https://wa.me/971552473989?text=...`). There is no cart or payment backend.
- When adding a page: copy an existing inner page (e.g. `blog.html`), add it to `sitemap.xml`, and link it from the header menu if needed.
- Never commit secrets or WordPress backups (`*.sql`, `*.sql.gz`, `wp-config.php`). The repo is public.
- Icons: Font Awesome 6 is self-hosted in `assets/vendor/fontawesome`.
