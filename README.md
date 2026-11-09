# Beauty Bar on the Boulevard — concept website

A pitch-quality website for **Beauty Bar on the Boulevard**, a hair, nail and skin salon at 408 E. South Boulevard, Crawfordsville, IN 47933 · (765) 365-5000.
They have no website today: only a Facebook page (facebook.com/beautybarontheboulevard) and directory listings.

Live: https://justuseflint.github.io/beauty-bar-boulevard/

## Pages
- `/` Home: "mirror" hero with the salon's own interior photo and a swaying Edison-bulb pendant, live open/closed status, Hair · Nails · Skin panels, before/after color slider, nail-art reel, Google review quotes, owner Rosie Keller's story, hours and directions
- `/services/` The full service list (24 services) with filters, "good to mention" notes and a source tag on every service; **Add** builds a call card. No prices (none are published)
- `/plan/` Visit planner: services, stylist, day (only open days, evening only Mon–Thu) and appointment vs walk-in → a call card with a ready-to-say script, what to have ready and a Call button (Ashley's picks call her direct line). Saved in the browser; nothing is sent
- `/looks/` Gallery of the salon's own photos with filters and a lightbox; **Save this look** adds it to the call card
- `/team/` People named in the salon's 2025–26 posts and reviews, plus Rosie Keller's career timeline (horizontal scroll on desktop)
- `/visit/` Live status, hours with today highlighted, map, "good to know" and FAQ

## Sources
See `research/notes.md`. Owner story: Journal Review, "Beauty Bar announces its staff," Jul 17, 2018. Team: the salon's Facebook posts (Apr–Jul 2026) and Google reviews. Services: Yelp (verified by business), Google profile attributes, the 2018 article. Rating: Google 4.8 from 53 reviews (Nov 2026).

## Images
All photos are the salon's own, from their Google listing (via loc8nearme/localdatacdn). They need the owner's OK before launch:
`int-wide`, `reception`, `holiday`, `curls-before`, `curls-after`, `nails-*`. `logo.png`, `mark.png`, `favicon.png` and `apple-touch-icon.png` are traced from their Facebook profile logo. `og.jpg` is a share card built from their photo and logo.
**No AI-generated images are used.**
Left out on purpose: a pole sign for a California "Boulevard Beauty Bar" that is mixed into their listing photos, and photos that don't match their salon.

## Needs from the owner
- **Hours**: Facebook and Yelp say Mon–Thu 9–7, Fri–Sat 9–3; Google says Mon–Fri 10–5, Sat 8–12. The site uses Facebook's. Which is right?
- Current team and who does what (Ashley, Kira, Jennie, Marcie, Rosie are from public posts and reviews); photos of each person
- Prices, or "starting at" prices
- Whether skin services (waxing, facials, lash & brow) are still offered
- Payment methods (a review says a new client wasn't told cards aren't accepted)
- Whether texting the salon number works; an online booking link, if they want one
- Remove the old number (765) 366-9540 from directories

## Stack
Plain HTML, CSS and JavaScript; no build step needed to serve. Pages are generated with `node _build/build.mjs` from `_build/data.mjs`, `_build/shell.mjs` and `_build/pages.mjs`.
Motion: GSAP + ScrollTrigger + Lenis (vendored in `assets/vendor/`). Respects `prefers-reduced-motion`. Fonts: Bodoni Moda and Jost (Google Fonts).

Concept site · details checked Nov 9, 2026.
