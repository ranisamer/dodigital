# Notes for AI assistants

- Static site for GitHub Pages: plain HTML, one stylesheet (`assets/css/style.css`), one script (`assets/js/main.js`). No build step, no frameworks.
- Language is Arabic, `dir="rtl"`. Keep all visible text in Arabic unless asked. Use CSS logical properties (`inset-inline-start`, `margin-inline-end`) so layout stays correct in RTL.
- Brand: logo `assets/img/logo.png` (pixel-D icon + DODIGITAL wordmark, for light backgrounds) and `assets/img/logo-light.png` (for the dark header; header shows both via `.logo-dark`/`.logo-light`), font Tajawal, main colour `--primary: #14AECF`, logo green `--accent: #2BD97B`, dark `--ink: #0B1026`. Reuse existing classes (`.section`, `.head`, `.btn`, `.btn--grad`, `.product-card`, `.post`, `.prompt`, `.prose`, `.page-hero`) so new content matches.
- Products menu has exactly three categories: كتبنا (`books.html`), قوالب للتسويق (`templates.html`), برومبتات مجانية (`prompts.html`). The site no longer offers consulting or training courses — don't add them back unless asked.
- Blog articles are root-level pages (e.g. `copywriting-formulas.html`) using `.prose`, a sticky `.toc`, FAQ section and BlogPosting + FAQPage JSON-LD. New articles: link them from `blog.html`, the home blog section, and related articles; add to `sitemap.xml`.
- Product pages show a draggable CSS 3D book (`.book3d`, flat covers `*-front.jpg` / `*-back.jpg`) and a "look inside" gallery of watermarked sample pages (`assets/img/products/inside/`, `data-inside`). Only watermarked samples may go in the repo, never full product files.
- Products: book `product-chatgpt.html` (70); templates: `template-instagram-planner.html` (39) and `template-tiktok-planner.html` (39), `template-planner-2027.html`, `template-facebook-planner.html`, `template-youtube-planner.html`, `template-linkedin-planner.html`, `template-x-planner.html`, `template-threads-planner.html` (all 39), `template-ramadan-planner.html` (29, own design), `template-social-media-planner.html` (49, all-platforms planner), `template-white-friday-kit.html` (49, sale campaign kit), `template-ads-planner.html` (39), `template-snapchat-planner.html` (39), bundles `template-social-bundle.html` (129, the 8 platform planners) and `template-all-bundle.html` (199, all 13 template products, product-card grid of included planners instead of the 3D book), all PDF only — its source is a PLR product whose license allows selling finished PDF/PNG only, never editable/Canva files or PLR rights). Prices in SAR. Covers live in `assets/img/products/` (`*-3d.png` transparent for cards, `*-mockup.jpg` for product pages). New product page = copy an existing product page, update head meta + Product JSON-LD, add its card to `templates.html` or `books.html`, add to `sitemap.xml`. Never put the paid product files themselves in this public repo — buyers get them via a Google Drive link after paying.
- Prompts on `prompts.html` (100+) are `<article class="prompt" data-cat="...">` cards with `<mark>[variables]</mark>`, a copy button and `data-ai="chatgpt|claude"` links (hrefs filled by main.js); fields (data-cat): marketing, business, realestate, ecommerce, sales, content, visual (= "الصور والفيديو"), income (= "صناعة المال", sub-badges like العمل الحر / الدروبشيبينغ). `prompts.html#income` opens a tab directly. Update tab counts and the totals on index.html/products.html when adding prompts.
- `free-gift.html` gates a free, complete 21-page 2027 calendar (`assets/free/dodigital-2027-calendar.pdf`, our own design, OK to be public; covers `gift-calendar-2027-front/back.jpg`) behind a name + email form (`data-gift-form`; leads and `data-newsletter` signups go to the Kit (kit.com) email list via `KIT_FORM` in main.js (form 10251067, double opt-in), optional extra copy to a Google Form via `LEADS`) — the page shows no download link: after the subscriber confirms in Kit's incentive email, Kit redirects to `gift-download.html` (noindex) with the Arabic PDF and the English `dodigital-2027-calendar-en.pdf`. Next to the newsletter form; `about.html` is the من نحن page. Both are linked in every footer.
- Header and footer are duplicated in every `.html` page — when editing them, update every page.
- Buy buttons: card payments use Stripe Payment Links (account "dodigital.me"). Each product page has the pay button written statically in its `.actions` div (`<a class="btn btn--grad" href="https://buy.stripe.com/...">ادفع بالبطاقة وحمّل فورًا</a>` + "لديك سؤال؟" contact button + `.pay-note`); there is NO "order via WhatsApp" button on product pages any more (owner's request). The `STRIPE` map in `assets/js/main.js` lists the same links for reference. After payment Stripe redirects the buyer to that product's Google Drive file (set on the Stripe link, never in this repo). There is no cart or payment backend. New product = create its Stripe product/price/payment link (SAR), put the link in the page's `.actions`, and add it to `STRIPE`.
- When adding a page: copy an existing inner page (e.g. `blog.html`), add it to `sitemap.xml`, and link it from the header menu if needed.
- Never commit secrets or WordPress backups (`*.sql`, `*.sql.gz`, `wp-config.php`). The repo is public.
- Icons: Font Awesome 6 is self-hosted in `assets/vendor/fontawesome`.
- Cache busting: pages load `style.css`, `main.js` and Font Awesome with `?v=YYYYMMDDx`. Whenever you change CSS or JS, bump that version string in every `.html` page, otherwise visitors keep the old cached file and the layout breaks.

## English blog (`/en/`)
- English articles live in `en/` (`lang="en" dir="ltr"`, English header/footer, assets via `../assets/`), index `en/blog.html`. CSS switches to LTR with `html[dir="ltr"]`. Images still go in `assets/img/blog/<slug>.jpg`. Keep `/en/` header/footer identical across English pages. Arabic `blog.html` links to `en/blog.html`.
- English routine = same steps as below, but: write natural, practical English for an international/Gulf audience (topics: digital products, social media, AI tools, e-commerce, freelancing, marketing in the Middle East); copy an existing `en/*.html` article; caption in English (`Photo: <author> via Wikimedia Commons · License <license>`); add the card to the top of `en/blog.html` and 2–3 "Related articles" cards; link to `../prompts.html`, `../templates.html` or `../product-chatgpt.html` where relevant; add to `sitemap.xml`. Do not add English articles to the Arabic `blog.html` or home page.

## Daily article routine (morning = Arabic, evening = English)
1. Read `blog.html` to see every existing article; pick a NEW practical topic for small businesses in the Arab market (e.g. email marketing, SEO basics, Instagram/TikTok growth, Google Ads, landing pages, conversion rate, branding, WhatsApp marketing, content calendars, influencer marketing, analytics, customer retention, lead magnets, pricing, AI tools for marketers). Never repeat or closely overlap an existing topic.
2. Write the article in clear Modern Standard Arabic, at least 1000 words including the FAQ: intro, 6–9 `<h2 id="...">` sections (ASCII ids, no leading digit), lists/tables/`.callout`/`blockquote` where useful, a closing `.callout`, and a 4–5 question FAQ. Practical and honest: no invented statistics, studies, quotes, case studies about real people or testimonials.
3. Internal links (3+): `prompts.html`, `product-chatgpt.html` or `books.html` where relevant, and 1–2 existing articles. Also add one natural sentence linking to the new article from 1–2 related older articles.
4. Image: a real photo from Wikimedia Commons via the API (`https://commons.wikimedia.org/w/api.php`, User-Agent `DoDigitalSiteBuilder/1.0 (https://dodigital.me)`, ≥4 s between requests, back off on 429). Only CC0, Public domain, CC BY or CC BY-SA; landscape ≥1600 px; look at it to confirm it fits the topic and has no prominent brand logos. Download the 1920px thumbnail from `https://thumb.wikimedia.org/wikipedia/commons/thumb/<a>/<ab>/<File>/1920px-<File>` (strip any `?utm...` from the file URL first), crop to 16:9, save 1600×900 JPEG (quality ~82) as `assets/img/blog/<slug>.jpg`. Credit it in the `<figure class="hero-photo">` caption exactly like the existing articles (author → Commons file page link, license → license URL). If no suitable image is found, ask nobody — use the gradient `.cover` fallback (`cover--1/2/3` + Font Awesome icon) instead.
5. Create `<slug>.html` (English kebab-case slug) by copying an existing article page and replacing: title, meta description, canonical/og URLs, breadcrumb category, date (today), read time, hero photo + caption, body, TOC links (must match the h2 ids + `#faq`), FAQ, related articles (3 others), and both JSON-LD blocks (BlogPosting incl. `image`, `datePublished`; FAQPage).
6. Add the card to the top of `blog.html`, put it first in the home page blog section (`index.html`, keep only the 3 newest there), and add the URL to `sitemap.xml`.
7. Check locally (`python3 -m http.server`) that every internal link, anchor and image returns 200 and the page renders. Then commit (`git -c user.name=ranisamer -c user.email=ranisamer@users.noreply.github.com commit`) and `git push origin main`.

## Ebook & PDF layout rules (owner's standing rule — apply to every ebook, planner, calendar or PDF product, new or edited)
Treat alignment and reading direction as release requirements. Review the rendered pages and fix any alignment issues before delivery.

1. Arabic and English layout
- Arabic text: RTL direction and right alignment — headings, paragraphs, bullets, numbered lists, captions, tables, callouts.
- English text: LTR direction and left alignment.
- Bilingual layouts: Arabic on the right, English on the left; align corresponding headings, blocks and rows across both columns even when lengths differ.
- Preserve correct reading order for numbers, dates, percentages, currencies, URLs and English terms inside Arabic sentences; check punctuation and parentheses in mixed-language lines.

2. Numbers and inline elements
- Inline numbers sit on the same baseline as the surrounding text (numerals, currency symbols, %, punctuation not raised or lowered).
- Numbered-list markers align with the first line of each item; wrapped lines align with the item text.
- Consistent spacing and alignment for numbers in tables and repeated layouts.

3. Centering inside shapes and containers
- A number, icon, letter or object meant to sit inside a circle, badge, pill, square or other shape is centred horizontally AND vertically.
- Check the visible glyph, not the box: Tajawal's line metrics differ for Arabic vs Latin glyphs, so the same padding can look centred in Arabic and high/low in English (or vice versa) — tune per language until it looks centred.
- Same check for objects inside cards, frames and decorative containers.
- Known traps: a global `text-align-last: right` on `p` makes the last line of any centred paragraph jump right — set `text-align-last` explicitly wherever alignment changes (title, copyright pages). In Arabic text, a Latin word + punctuation + another Latin word ("Anthropic. Stripe") reverses the reading order — add an RLM (U+200F) after the punctuation, or put an Arabic word between them. Never insert RLM into copy-paste prompts or code.

4. Final visual review
- Render/export the finished file and inspect every page at normal size and zoomed in (e.g. `pdftoppm -r 150-220` crops) — check the exported output, since fonts and bidi text can render differently after export.
- Inspect circles/badges/pills, numbered lists, bilingual blocks, tables, captions, headers and page numbers; fix shifts, uneven spacing, clipped text or misalignment, then re-export and recheck the affected pages.
- When reviewing an existing ebook, preserve wording and overall design; change only what is needed for layout and alignment.
- Deliver the corrected final file. If the rendered output could not be inspected, say exactly which checks remain unverified.

## Product value & print-ready rules (owner's standing rule — applies after the layout rules above, to every ebook, guide, planner or workbook)
Treat every product as premium: it solves a specific problem for a clearly defined reader, is relevant in 2026, and stays useful when printed and filled in by hand.

1. Define the value before writing
- Identify who it is for, the problem they need to solve, and what they should be able to do or complete by the end.
- Build the content around that outcome: every section helps the reader understand something they need, make a decision, or take an action.
- Use concrete examples, actionable steps and reusable templates. Remove generic advice, repetition and pages that add length without value.
- Verify time-sensitive claims, tools, prices or platform instructions before presenting them as current for 2026.

2. Design it for printing and handwriting
- Give a clear place to write wherever the reader is asked to answer, plan, calculate, reflect or take notes.
- Match space to the task: short field for a date, several lines or a full page for a plan; checkboxes easy to mark; table rows tall enough for handwriting.
- Include a completed example before a blank worksheet whenever it helps show what a useful answer looks like.
- Readable type, strong contrast, print-safe margins, light backgrounds; the page must work in black and white with writing lines and boxes still visible.
- Arabic worksheets start writing areas on the right; English on the left; bilingual pages keep both areas usable without squeezing writing space.

3. Review it from the reader's perspective
- Complete a representative exercise yourself: are the instructions clear, is the space sufficient, does the finished answer lead to the next step?
- Review the final PDF at actual print size; fix cramped fields, clipped elements and worksheets split awkwardly across pages.
- Before delivery, state in one sentence the practical result the reader gets, and point to the pages or tools that achieve it.
