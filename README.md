# DoDigital — dodigital.me

DoDigital website: plain HTML/CSS (Arabic, RTL), hosted free on **GitHub Pages**.

## Pages
| File | Page |
|---|---|
| `index.html` | Home |
| `products.html` | Products overview |
| `books.html` | كتبنا (books) |
| `product-chatgpt.html` | ChatGPT passive-income book |
| `templates.html` | قوالب للتسويق (coming soon) |
| `prompts.html` | برومبتات مجانية (24 free prompts with copy buttons and category tabs) |
| `blog.html` | Blog index |
| `digital-marketing-strategy.html`, `chatgpt-for-marketing.html`, `copywriting-formulas.html` | Blog articles |
| `contact.html` | Contact (form sends the message on WhatsApp) |
| `404.html` | Not-found page |
| `shop/`, `contact/`, `blog/`, `my-account/`, `dashboard/` | Redirects from old WordPress links |

## Where things live
- **Colours & fonts:** top of `assets/css/style.css` (`:root`).
- **WhatsApp number & email:** top of `assets/js/main.js` (and the links in each page).
- **Images:** `assets/img/` · **Icons:** Font Awesome 6, self-hosted in `assets/vendor/fontawesome`.
- **Header and footer** are repeated in every page — change all pages together.

## Editing with AI
Open this repo in Claude Code (or any AI coding tool) and ask in plain words, e.g.
"add a new book", "write a new article about email marketing", "add 5 prompts".
Push to `main` and GitHub Pages updates the live site in about a minute.

## Domain
`CNAME` holds `dodigital.me`. DNS at Hostinger: four `A` records on `@` →
185.199.108.153 / 109.153 / 110.153 / 111.153, and `CNAME www` → `ranisamer.github.io`.
