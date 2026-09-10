# excogita.al

A single static page introducing Alban Xhafa - software engineer and team lead -
built to hand to employers and clients who ask for a link.

Plain HTML, Tailwind CSS compiled to one stylesheet, and about 30 lines of
vanilla JavaScript. No framework, no runtime build step, no server.

---

## ⚠️ This site must stay unindexed

This page is shared **by link only**. It is not meant to appear in search
results, in an AI answer, or in a web archive. Three independent layers enforce
that, because any one of them can be ignored on its own:

| Layer | File | What it does |
| --- | --- | --- |
| Page meta tags | `index.html` | `noindex, nofollow, noarchive, nosnippet, noimageindex` for all robots, plus explicit `googlebot` and `bingbot` directives |
| Crawl blocklist | `robots.txt` | `Disallow: /` for every user-agent, then named entries for search, archive, SEO and AI-training crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot, Bytespider, Applebot-Extended and others) |
| Absence | - | No `sitemap.xml`, no canonical link, no Open Graph or Twitter card tags, no JSON-LD structured data |

**Do not add any of the following back:**

- `sitemap.xml` or a `Sitemap:` line in `robots.txt`
- `<link rel="canonical">`
- `<script type="application/ld+json">` / schema.org markup
- a `<meta name="description">`
- analytics, tag managers, or verification tokens for Search Console / Bing
  Webmaster Tools - registering the domain there invites a crawl

**The one deliberate exception is link previews.** The page carries `og:*` and
`twitter:image` tags pointing at `assets/og.png`, so sharing the link in Slack,
WhatsApp, LinkedIn or iMessage produces a card instead of a bare URL. These are
read by unfurlers, not by search indexers, and the `noindex` meta tags and the
`X-Robots-Tag` header still apply to every one of them.

For those cards to actually render, the bottom of `robots.txt` allows nine
preview bots through (`Slackbot`, `Twitterbot`, `LinkedInBot`, `WhatsApp`,
`facebookexternalhit`, `TelegramBot`, `Discordbot`, `SkypeUriPreview`) with an
empty `Disallow:`. **A blanket `Disallow: /` would have silently broken every
preview** - most of these bots honour robots.txt and would simply not fetch the
page. Note the pairs that look similar but are not: `Slackbot` unfurls while
`Slurp` crawls; `facebookexternalhit` unfurls while `FacebookBot` crawls. The
crawlers stay blocked.

If you ever decide you want no previews either, delete the `og:*` block from
`index.html` and the preview-bot section from `robots.txt` together - leaving
one without the other just produces broken cards.

There is deliberately **no fourth layer**: a `_headers` file used to declare
`X-Robots-Tag`, but GitHub Pages ignores it, so it was deleted rather than left
as decoration. See the deployment notes for how to restore real headers.

Also worth knowing: `robots.txt` and `noindex` are requests, not enforcement.
Well-behaved crawlers honour them; hostile scrapers do not. Anything on this
page should be information you are comfortable being public. That is why the
page carries an email address and a GitHub profile, and no phone number, home
address or CV download.

---

## Before you publish

**Check the freelance date.** The page says *Full-stack web developer, Freelance,
remote - 2025 - now*, taken verbatim from the CV. The earlier version of the CV
said 2019, and 2019 is what makes the "seven years" in the intro paragraph add
up. If 2025 is a typo, fix it in the `HISTORY` list.

**Two companies are unlinked.** Cria.al, RentMe.al and Klinika KEIT link to
their sites; ReserveBar and LiquidCommerce do not, because those URLs were not
in the CV and are not worth guessing. Add them to the `role` string of the
relevant work panels if you want them linked.

Contact details on the page, for reference:

- Email - `xhafaa0@gmail.com`
- GitHub - `github.com/albanxhafa` (personal, not the `-swe` work account)
- LinkedIn - `linkedin.com/in/albanxhafa`

Your phone number is deliberately not on the page: the link is shareable and
`robots.txt` is a request, not enforcement.

## Working on it

Requires [pnpm](https://pnpm.io) and Node 18+.

```bash
pnpm install     # once
pnpm dev         # Vite on http://localhost:4173 + Tailwind rebuilding on change
pnpm build       # minified production stylesheet
```

`pnpm dev` runs two watchers side by side: the Tailwind CLI recompiling
`assets/css/main.css`, and Vite serving the folder with live reload. Vite is
only a dev server - it does not bundle anything, and there is no `vite build`
step. What you deploy is exactly the files in this directory.

```bash
pnpm assets      # regenerate assets/og.png and assets/icon-180.png
```

You only need `pnpm assets` after changing the card or icon design - both PNGs
are committed. It needs Google Chrome; set `CHROME=/path/to/chrome` if yours is
somewhere unusual.

`assets/css/main.css` is a build output but is **committed on purpose** - it
means the site can be deployed straight from the repo with no build step. Run
`pnpm build` and commit the result whenever you change classes in `index.html`
or tokens in `src/input.css`.

## Layout

```
index.html            the whole page
src/input.css         Tailwind entry + design tokens (@theme) + custom CSS
assets/css/main.css   compiled stylesheet - committed, do not edit by hand
assets/js/main.js     copy-to-clipboard + accordion fallback (~40 lines)
assets/favicon.svg    the AXH mark
assets/icon-180.png   iOS home-screen icon
assets/og.png         1200x630 link-preview card
robots.txt            crawl blocklist, plus the allowed preview bots
vite.config.js        dev server only
tools/og.html         source for the link-preview card
tools/icon.html       source for the iOS icon raster
tools/render-assets.sh regenerates both PNGs with headless Chrome
```

## Design notes

So future edits stay coherent:

- **Why Tailwind, given all the custom CSS.** The custom CSS looks like a lot
  but is not: `src/input.css` holds 11 component classes and about 36
  declarations, all for things utilities genuinely cannot express - the
  keyframes, the `::before` dot that hangs into the margin, the disclosure
  chevron rotation, the chip treatment. The markup meanwhile makes **751
  utility applications across 120 distinct utilities**, 25 of them responsive
  variants. Dropping Tailwind would mean hand-writing all of that, and the
  compiled stylesheet is only 14KB. It earns its place - keep it.

- **Palette.** Warm paper (`#fbfaf7`) and soft ink (`#17191b`), with one quiet
  green (`--color-moss`, `#2d6a4f`) as the only accent. Moss appears in three
  places and nowhere else: the section dots, the project fact lines, and the
  contact panel. If you add a fourth use, take one away.
- **Type.** Newsreader (serif) for the name and section headings - the one
  place the page allows itself some elegance. Instrument Sans for everything
  else. Body copy sits at a normal reading size; nothing is oversized.
- **Structure.** Two columns on desktop: who you are pinned on the left, what
  you have done scrolling on the right. Below `lg` it stacks into one column in
  the same order. There is no navigation - the page is short enough not to need
  it.
- **The pinned column.** The identity column uses `.pin`, not a Tailwind
  `lg:sticky`, because sticking is conditional: it only pins at `min-width:
  1024px` **and** `min-height: 820px`. The column is ~703px tall, and a sticky
  element taller than the viewport strands its own lower half below the fold
  where nobody can scroll to it. On a short screen it just scrolls normally.
  The breakpoint is the column height plus the 6rem offset plus a little
  slack - if you add anything to that column, measure it and move the
  breakpoint to match.
- **The dots.** Each section heading carries a small moss dot that hangs into
  the left margin (`.marked::before`, `left: -1.15rem`). It marks structure
  without needing a label above the heading. It hangs *outside* the text
  column on purpose, so headings and body copy share one left edge - do not
  add an indent to compensate for it.
- **The experience accordion.** One section covers employers and projects
  together. Each role is a `<details name="roles">`; the four ReserveBar
  products are a second level of `<details name="rb-projects">` nested inside
  it. Opening one closes its siblings without any JavaScript - the browser
  does it, and the two levels are independent because they use different
  `name`s. **Every accordion selector in `input.css` is scoped with `>`**
  (`.acc[open] > summary .chev`, `.acc[open] > .acc-body`); a descendant
  selector would rotate every nested chevron when a parent opened.
  `assets/js/main.js` only closes siblings manually on browsers that lack
  `details[name]` support, and is a no-op everywhere else. The first panel
  ships open. Keyboard and screen-reader behaviour comes free with the
  element; do not rebuild this with divs and click handlers.
- **Icons and the share card.** `assets/favicon.svg` is the AXH mark, black on
  white, sized with `textLength` so the three letters fill the square whatever
  font the renderer picks - it stays legible at 16px. `assets/icon-180.png` is
  the same mark rasterised for iOS home screens. `assets/og.png` (1200×630) is
  the share card: same paper, ink, moss and Newsreader as the site, listing the
  four capability lines. Both PNGs are generated from HTML with headless
  Chrome - regenerate them the same way if the design changes, and keep the OG
  image at exactly 1200×630.
- **The footer prompt.** `root@excogita:~#` with a blinking block cursor, in a
  system monospace stack (no extra webfont). It is the only thing on the page
  that moves continuously, and `prefers-reduced-motion` freezes it visible.
- **Motion.** One load moment: the columns rise in a short stagger. Nothing
  animates on its own after that, and `prefers-reduced-motion` disables it.
- **Responsive.** Verified with no horizontal overflow from 320px up.

## Deploying

The site is hosted on **GitHub Pages** at `albanxhafa/excogita.al`, deployed by
`.github/workflows/deploy.yml` on every push to `main`. The workflow installs
with pnpm, runs `pnpm build` (so a forgotten local build can never ship stale
CSS), assembles `dist/` with `tools/build-dist.sh`, and publishes that.

`dist/` holds only what the browser needs - `index.html`, `assets/`,
`robots.txt`, `CNAME` and `.nojekyll`. Never `node_modules`, `src/`
or `tools/`.

`tools/build-dist.sh` also drops a `.nojekyll` into `dist/`. It is only
insurance for the day Pages is switched from the Actions artifact back to a
branch source, where Jekyll would otherwise run.

### ⚠️ GitHub Pages costs you the header layer

**GitHub Pages cannot set custom response headers**, so this site sends no
`X-Robots-Tag`, and no `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy` or `Permissions-Policy` either. There was a `_headers` file
here declaring all of them; it was deleted because Pages ignores it completely,
and a config that looks like it is protecting the site while doing nothing is
worse than none at all.

The repository is also **public**, so the page's content is readable - and
indexable - on github.com regardless of what this site says.

To get headers back, either put Cloudflare in front of the Pages site and add a
Transform Rule → *Modify Response Header*, or move to a host that reads a
`_headers` file (Cloudflare Pages, Netlify). The set worth restoring:

```
X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Permissions-Policy: geolocation=(), camera=(), microphone=()
```

### DNS for the apex domain

`excogita.al` is an apex domain, so it needs A/AAAA records rather than a
CNAME. Point it at GitHub's Pages addresses:

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
AAAA  @     2606:50c0:8000::153
AAAA  @     2606:50c0:8001::153
AAAA  @     2606:50c0:8002::153
AAAA  @     2606:50c0:8003::153
CNAME www   albanxhafa.github.io.
```

The domain carries no email, so the zone also states that explicitly - a null
`MX 0 .`, `SPF v=spf1 -all`, and a `p=reject` DMARC record. Without them anyone
can forge `@excogita.al` as a sender and receivers have no instruction to
refuse it. Replace all three if you ever add a mail provider.

If the DNS sits on Cloudflare, set those records to **DNS only** (grey cloud)
until GitHub has issued the TLS certificate, then turn the proxy back on if you
want the Transform Rule above.

### Checking it worked

```bash
curl -sI https://excogita.al/ | grep -i x-robots-tag   # empty on Pages; set once Cloudflare proxies
curl -s  https://excogita.al/robots.txt
```
