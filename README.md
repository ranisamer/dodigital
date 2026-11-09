# DoDigital — dodigital.me

The DoDigital website as plain HTML/CSS (Arabic, RTL), hosted free on **GitHub Pages**.
Same look and identity as the old WordPress site, without WordPress.

## Pages
| File | Page |
|---|---|
| `index.html` | Home |
| `products.html` | Products (guides, courses, consulting) |
| `product-chatgpt.html` | ChatGPT passive-income book |
| `course-marketing-strategy.html` | Marketing strategy course |
| `blog.html` | Blog |
| `contact.html` | Contact (form sends the message on WhatsApp) |
| `404.html` | Not-found page |
| `shop/`, `contact/`, `blog/`, `my-account/`, `dashboard/` | Redirects from the old WordPress links |

## Where things live
- **Colours & fonts:** top of `assets/css/style.css` (`:root` variables). Change once, the whole site updates.
- **WhatsApp number & email used by forms:** top of `assets/js/main.js`.
- **Images:** `assets/img/`
- **Header and footer** are repeated in every page. When you change them, change all pages.

## Editing with AI
Open this repo in Claude Code (or any AI coding tool) and ask in plain words, e.g.
"change the book price to 59", "add a new product page", "replace the hero image".
Push to `main` and GitHub Pages updates the live site in about a minute.

## Domain
`CNAME` holds `dodigital.me`. DNS (at Hostinger): four `A` records on `@` →
185.199.108.153 / 109.153 / 110.153 / 111.153, and `CNAME www` → `ranisamer.github.io`.
