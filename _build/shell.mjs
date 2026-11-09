import { DIMS, BASE, CHECKED, PHONE, TEL, FB, ADDR1, ADDR2, GMAPS } from './data.mjs';
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const img = (root, n, alt = '', cls = '', { small = false, eager = false, sizes = '' } = {}) => {
  const [w, h] = DIMS[n] || [800, 1000];
  const sm = `${root}assets/img/${n}-s.webp`, lg = `${root}assets/img/${n}.webp`;
  return `<img src="${small ? sm : lg}" srcset="${sm} 800w, ${lg} ${w}w" sizes="${sizes || (small ? '(min-width:1024px) 30vw, 80vw' : '100vw')}" alt="${esc(alt)}" width="${w}" height="${h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${cls ? ` class="${cls}"` : ''}>`;
};
export const arr = `<svg class="i-arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
export const ext = `<svg class="i-arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
export const phoneI = `<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5l2.6.3 1.2 4-2 1.6a12 12 0 006.2 6.2l1.6-2 4 1.2.3 2.6c0 1-.9 2-2 2C10.8 19.4 4.6 13.2 4.6 5.5c0-1.1 1-2 2-2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
export const plusI = `<svg class="i i-plus" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
export const mark = (cls = '') => `<span class="mark ${cls}" aria-hidden="true"></span>`;
export const status = (cls = '') => `<span class="status ${cls}" data-status><i></i><span data-status-t>Open Mon–Sat</span></span>`;
export const btn = (href, label, cls = '', attrs = '') => `<a class="btn ${cls}" href="${href}" data-magnetic ${attrs}><span class="btn-t">${label}</span><span class="btn-o" aria-hidden="true">${arr}</span></a>`;
export const callBtn = (cls = '', label = 'Call ' + PHONE) => `<a class="btn btn-call ${cls}" href="${TEL}" data-magnetic><span class="btn-t">${label}</span><span class="btn-o" aria-hidden="true">${phoneI}</span></a>`;
export const eyebrow = (t, cls = '') => `<p class="eb ${cls}">${t}</p>`;

const NAV = [['Services', 'services/'], ['Looks', 'looks/'], ['Team', 'team/'], ['Visit', 'visit/']];
const FONTS = 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..800;1,6..96,400..700&family=Jost:wght@300..600&display=swap';

export function head({ root, title, desc, path = '' }) {
  const url = BASE + path;
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#141312">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website"><meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}assets/img/og.jpg">
<meta name="format-detection" content="telephone=no">
<link rel="canonical" href="${url}">
<link rel="icon" href="${root}assets/img/favicon.png" type="image/png"><link rel="apple-touch-icon" href="${root}assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${root}assets/css/site.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BeautySalon","name":"Beauty Bar on the Boulevard","telephone":"+1-765-365-5000","address":{"@type":"PostalAddress","streetAddress":"408 E. South Boulevard","addressLocality":"Crawfordsville","addressRegion":"IN","postalCode":"47933","addressCountry":"US"},"geo":{"@type":"GeoCoordinates","latitude":40.025111,"longitude":-86.89572},"sameAs":["${FB}"],"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday"],"opens":"09:00","closes":"19:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":["Friday","Saturday"],"opens":"09:00","closes":"15:00"}]}</script>
<script>(function(d,w){var h=d.documentElement;h.className=h.className.replace('no-js','js');var rm=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm){h.classList.add('motion');try{if(sessionStorage.getItem('bb-pt')==='1')h.classList.add('pt-in')}catch(e){}}else{h.classList.add('no-motion')}setTimeout(function(){if(!w.__bbReady){h.classList.remove('motion','pt-in');h.classList.add('no-motion')}},4000)})(document,window)</script>
</head>`;
}

export function chrome(root, path) {
  const cur = p => (path.startsWith(p) ? ' aria-current="page"' : '');
  return `<div class="iris" aria-hidden="true"><div class="iris-mark">${mark()}</div></div>
<a class="skip" href="#main">Skip to content</a>
<aside class="rail" aria-label="Site">
  <a class="rail-home" href="${root}" aria-label="Beauty Bar on the Boulevard, home">${mark()}</a>
  <nav class="rail-nav" aria-label="Primary">${NAV.map(([t, h]) => `<a href="${root}${h}"${cur(h)}><span>${t}</span></a>`).join('')}</nav>
  <a class="rail-call" href="${TEL}" aria-label="Call ${PHONE}">${phoneI}</a>
</aside>
<div class="topr">
  ${status('topr-status')}
  <a class="btn btn-sm btn-ink topr-plan" href="${root}plan/" data-magnetic${cur('plan/')}><span class="btn-t">Plan a visit</span><span class="btn-o" aria-hidden="true">${arr}</span></a>
</div>
<nav class="dock" aria-label="Quick">
  <a class="dock-home" href="${root}" aria-label="Home">${mark()}</a>
  <a class="dock-b" href="${TEL}">${phoneI}<span>Call</span></a>
  <a class="dock-b dock-plan" href="${root}plan/"${cur('plan/')}><span>Plan</span><b class="dock-n" data-tray-n hidden>0</b></a>
  <button class="dock-b dock-menu" type="button" aria-expanded="false" aria-controls="sheet" data-sheet-btn><span class="dm-i"><i></i><i></i></span><span class="dm-t">Index</span></button>
</nav>
<div class="sheet" id="sheet" data-sheet aria-hidden="true">
  <div class="sheet-in">
    <nav class="sheet-nav" aria-label="Mobile">${[['Home', ''], ...NAV, ['Plan a visit', 'plan/']].map(([t, h], i) => `<a href="${root}${h}"><em>${['I', 'II', 'III', 'IV', 'V', 'VI'][i]}</em><span>${t}</span></a>`).join('')}</nav>
    <div class="sheet-foot">
      ${status()}
      <p>${ADDR1}<br>${ADDR2}</p>
      <a class="ul" href="${TEL}">${PHONE}</a>
    </div>
  </div>
</div>`;
}

export function footer(root, { cta = true } = {}) {
  return `${cta ? `<section class="cta" aria-labelledby="cta-h">
  <div class="cta-in wrap">
    ${status('status-inv')}
    <h2 id="cta-h" class="d-xl" data-chars>Pull up a&nbsp;chair.</h2>
    <p class="cta-p">Call to book, or walk on in. We&rsquo;d love to have you.</p>
    <div class="cta-btns">${callBtn('btn-light btn-lg')}${btn(root + 'plan/', 'Plan your visit first', 'btn-ghost-inv btn-lg')}</div>
  </div>
</section>` : ''}
<footer class="ftr">
  <div class="wrap ftr-top">
    <div class="ftr-brand">
      <img class="ftr-logo" src="${root}assets/img/logo.png" alt="Beauty Bar on the Boulevard logo" width="750" height="437" loading="lazy">
      <p>Hair, nails and skin at ${ADDR1}, Crawfordsville, Indiana.</p>
    </div>
    <div class="ftr-cols">
      <div><p class="eb">Book</p><ul><li><a class="ul" href="${TEL}">${PHONE}</a></li><li><a class="ul" href="${root}plan/">Plan a visit</a></li><li><a class="ul" href="${root}services/">Services</a></li></ul></div>
      <div><p class="eb">Salon</p><ul><li><a class="ul" href="${root}looks/">Looks</a></li><li><a class="ul" href="${root}team/">Team</a></li><li><a class="ul" href="${root}visit/">Hours &amp; directions</a></li></ul></div>
      <div><p class="eb">Find us</p><ul><li><a class="ul" href="${GMAPS}" target="_blank" rel="noopener">${ADDR1}</a></li><li><a class="ul" href="${FB}" target="_blank" rel="noopener">Facebook</a></li></ul></div>
    </div>
  </div>
  <div class="ftr-wm" aria-hidden="true"><span data-track-wm>On the Boulevard</span></div>
  <div class="wrap ftr-base"><span>© 2026 Beauty Bar on the Boulevard</span><span>Concept site · details checked ${CHECKED}</span></div>
</footer>
<div class="cur" aria-hidden="true"><span class="cur-t"></span></div>
<div class="toast" role="status" aria-live="polite" data-toast></div>
<script src="${root}assets/vendor/gsap.min.js" defer></script>
<script src="${root}assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="${root}assets/vendor/lenis.min.js" defer></script>
<script src="${root}assets/js/site.js" defer></script>`;
}

export const page = ({ root, title, desc, path, body, cta = true, cls = '' }) => `${head({ root, title, desc, path })}
<body class="${cls}">
${chrome(root, path)}
<main id="main">
${body}
</main>
${footer(root, { cta })}
</body>
</html>`;
