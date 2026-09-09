# كمبيوترجي ماهر — Night City

A scroll-driven, neon-Tokyo redesign of the Computerjy Maher / Maher Tech site.
Built as a **separate project** that uses the original
(`github.com/abdullah2036/ComputerjyMaher`) purely as reference — the original
is untouched.

## Stack

Plain HTML/CSS/JS, **no build step**. Three libraries load from CDN:

| lib | why |
|---|---|
| three.js r128 | WebGL particle field |
| GSAP + ScrollTrigger 3.12.5 | scrubbed scroll animation |
| Lenis 1.1.20 | smooth scroll |

Just open `index.html` on any static host (GitHub Pages, Cloudflare Workers/Pages, etc).

## What's in it

- **WebGL particle system** that morphs shape *and* colour per section
  (globe → torus → helix → lattice → city skyline → ring) with pointer +
  scroll parallax, additive-blended shader points.
- Perspective neon **street grid**, drifting light beam, scroll-linked hue
  shift, film grain + scanlines.
- **Custom cursor**, magnetic buttons, 3D tilt + cursor-follow glow on every
  card, clip-reveal headings, side progress rail, count-up stats, a pinned
  "process" line that fills as you scroll it.
- Full `prefers-reduced-motion` path (no smooth scroll, no loops, static
  particle frame, instant reveals).
- Reveals + counters run on `IntersectionObserver`, so content can never get
  stuck hidden even if a CDN script fails.

## Content changes vs the original

- **Services** replaced with: consulting `100 SAR`, frontend building
  `150 SAR`, full-stack `300 SAR`, securing & cybersecurity testing `100 SAR`.
- **Products** kept (same items + prices) but reframed as a "bench / kit" shelf.
- **How it works** + two testimonials lightly retuned to match the new
  dev/security services.
- Projects, brand, hero copy, AR/EN + RTL, and every `wa.me/966555972970`
  WhatsApp deep link are preserved.

## Dev query params

- `?static` — disable Lenis (native scroll), useful for debugging.
- `?show` — force every reveal/animation to its end state immediately.

## Known follow-ups

- No mobile nav menu (matches the original — links just hide < 1000px).
- The statement band only drifts one direction after an EN/AR toggle.
