#!/usr/bin/env python3
"""SEO audit for dodigital.me (static site). Run from repo root: python3 tools/seo_audit.py
Prints issues only; fixes are done by hand. No network access needed."""
import re, glob, os, collections, json
pages = sorted(p for p in glob.glob('*.html') + glob.glob('en/*.html'))
sitemap = open('sitemap.xml', encoding='utf-8').read()
issues = collections.defaultdict(list); inbound = collections.Counter(); ext = {}
for p in pages:
    s = open(p, encoding='utf-8').read(); d = os.path.dirname(p)
    noindex = 'noindex' in s or p == '404.html'
    is_post = '"BlogPosting"' in s
    t = re.search(r'<title>(.*?)</title>', s, re.S)
    md = re.search(r'<meta name="description" content="([^"]*)"', s)
    if not t: issues['missing <title>'].append(p)
    elif len(t.group(1)) > 63: issues['title > 63 chars'].append(f"{p} ({len(t.group(1))})")
    if not md: issues['missing meta description'].append(p)
    elif not (70 <= len(md.group(1)) <= 160) and not noindex: issues['description not 70-160 chars'].append(f"{p} ({len(md.group(1))})")
    if 'rel="canonical"' not in s and not noindex: issues['missing canonical'].append(p)
    if len(re.findall(r'<h1[\s>]', s)) != 1: issues['h1 count != 1'].append(p)
    if not noindex and p != 'index.html' and f"https://dodigital.me/{p}" not in sitemap: issues['not in sitemap.xml'].append(p)
    for ld in re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S):
        try: json.loads(ld)
        except Exception: issues['invalid JSON-LD'].append(p)
    for im in re.findall(r'<img\b[^>]*>', s):
        if 'alt=' not in im: issues['img without alt'].append(p); break
        src = re.search(r'src="([^"?#]+)', im)
        if src and not src.group(1).startswith(('http', 'data:')) and not os.path.exists(os.path.normpath(os.path.join(d, src.group(1)))):
            issues['missing image file'].append(f"{p} -> {src.group(1)}")
    ids = set(re.findall(r'id="([^"]+)"', s))
    for a in set(re.findall(r'href="#([^"]+)"', s)):
        if a not in ids: issues['broken #anchor'].append(f"{p} -> #{a}")
    body = re.sub(r'<header\b.*?</header>|<footer\b.*?</footer>|<nav\b.*?</nav>', '', s, flags=re.S)
    for h in re.findall(r'href="([^"#?:]+\.html)', s):
        tgt = os.path.normpath(os.path.join(d, h))
        if not os.path.exists(tgt): issues['broken internal link'].append(f"{p} -> {h}")
    for h in re.findall(r'href="([^"#?:]+\.html)', body):
        tgt = os.path.normpath(os.path.join(d, h))
        if tgt != p: inbound[tgt] += 1
    art = re.search(r'<article class="prose">(.*?)</article>', s, re.S)
    if art and is_post:
        a = re.sub(r'<figcaption>.*?</figcaption>', '', art.group(1), flags=re.S)
        ext[p] = sorted(set(re.findall(r'href="(https?://(?!dodigital\.me)[^"]+)"', a)))
        internal = set(re.findall(r'href="([^"#:]+\.html)', a))
        if len(internal) < 3: issues['article with < 3 internal links in body'].append(f"{p} ({len(internal)})")
for p in pages:
    if p not in ('404.html', 'privacy.html', 'terms.html', 'refund.html', 'about.html') and inbound[p] < 2: issues['weak inbound links (< 2 in-content)'].append(f"{p} ({inbound[p]})")
for loc in re.findall(r'<loc>https://dodigital\.me/([^<]*)</loc>', sitemap):
    if loc and not os.path.exists(loc): issues['sitemap URL with no file'].append(loc)
print(f"Pages: {len(pages)}")
if not issues: print("No issues found.")
for k, v in issues.items(): print(f"\n## {k} ({len(v)})\n  " + "\n  ".join(v))
no_out = [p for p, l in ext.items() if not l]
if no_out: print(f"\n## articles with no outbound links to authoritative sources ({len(no_out)})\n  " + "\n  ".join(no_out))
print("\n## Outbound links to verify (curl -sI):")
for p, l in ext.items():
    for u in l: print(f"  {p}: {u}")
