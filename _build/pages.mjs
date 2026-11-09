import { PHONE, TEL, FB, ADDR1, ADDR2, GMAPS, AMAPS, GREVIEWS, HOURS, DAYS, SRC, GROUPS, SERVICES, TEAM, REVIEWS, LOOKS, DIMS } from './data.mjs';
import { esc, img, arr, ext, phoneI, plusI, mark, status, btn, callBtn, eyebrow, page } from './shell.mjs';

const fmtH = h => (h === 12 ? '12 PM' : h > 12 ? h - 12 + ' PM' : h + ' AM');
const hoursTable = (cls = '') => `<table class="hours ${cls}" data-hours><caption class="sr-only">Opening hours</caption><tbody>${[1, 2, 3, 4, 5, 6, 0].map(d => `<tr data-day="${d}"><th scope="row">${DAYS[d]}</th><td>${HOURS[d] ? fmtH(HOURS[d][0]) + ' – ' + fmtH(HOURS[d][1]) : 'Closed'}</td></tr>`).join('')}</tbody></table>`;
const hoursNote = `<p class="fine">Hours from our Facebook page. Each stylist keeps their own book, so call to check a time.</p>`;
const ring = (t, cls = '') => `<span class="ring ${cls}" aria-hidden="true"><span>${t}</span></span>`;

const beforeAfter = root => `<figure class="ba" data-ba>
  <div class="ba-stage" data-cursor="Drag">
    ${img(root, 'curls-before', 'Before: grown-out, straight light brown hair, seen from the side', 'ba-img ba-before', { small: true, sizes: '(min-width:1024px) 34vw, 90vw' })}
    <div class="ba-after" data-ba-after>${img(root, 'curls-after', 'After: short violet and plum curls, seen from the side', 'ba-img', { small: true, sizes: '(min-width:1024px) 34vw, 90vw' })}</div>
    <div class="ba-handle" data-ba-handle aria-hidden="true"><span></span></div>
    <span class="ba-l ba-l1" aria-hidden="true">Before</span><span class="ba-l ba-l2" aria-hidden="true">After</span>
    <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="Slide to compare before and after" data-ba-range>
  </div>
  <figcaption>Before &amp; after, from the salon&rsquo;s own photos</figcaption>
</figure>`;

/* ---------------- HOME ---------------- */
function home() {
  const root = './';
  const g = id => SERVICES.filter(s => s.g === id);
  const body = `
<section class="hero" data-hero>
  <div class="hero-stage">
    <div class="lamp" data-lamp aria-hidden="true">
      <svg viewBox="0 0 60 260" class="lamp-svg"><line x1="30" y1="0" x2="30" y2="168" stroke="currentColor" stroke-width="1.2"/><rect x="24" y="166" width="12" height="16" rx="2" fill="currentColor"/><path d="M30 182c-11 0-17 9-17 21 0 14 9 22 10 30h14c1-8 10-16 10-30 0-12-6-21-17-21z" fill="rgba(255,214,150,.16)" stroke="rgba(255,226,180,.55)" stroke-width="1"/><path d="M25 232c0-12 2-24 5-34 3 10 5 22 5 34" fill="none" stroke="#FFC274" stroke-width="1.3"/></svg>
      <span class="lamp-glow"></span>
    </div>
    <h1 class="hero-h"><span class="sr-only">Beauty Bar on the Boulevard</span><span class="hh hh-1" data-chars aria-hidden="true">Beauty</span><span class="hh hh-2" data-chars aria-hidden="true">Bar</span></h1>
    <div class="mirror" data-mirror>
      <div class="mirror-pic" data-mirror-pic>${img(root, 'int-wide', 'Inside Beauty Bar on the Boulevard: black-framed mirrors, Edison-bulb pendants, a brick wall and the shampoo chairs', '', { eager: true, sizes: '(min-width:1024px) 70vw, 120vw' })}</div>
    </div>
    <p class="hero-tag" data-track aria-hidden="true">On the Boulevard</p>
    <a class="badge" href="${TEL}" aria-label="Walk-ins welcome. Call ${PHONE}" data-magnetic>
      <svg viewBox="0 0 200 200" aria-hidden="true"><defs><path id="bc" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"/></defs><text><textPath href="#bc" textLength="460">Walk-ins welcome · Call (765) 365-5000 ·</textPath></text></svg>
      <span class="badge-c">${phoneI}</span>
    </a>
  </div>
  <div class="hero-foot">
    <p>Hair <i>·</i> Nails <i>·</i> Skin</p>
    <p class="hero-addr">${ADDR1}, Crawfordsville</p>
    ${status('status-inv')}
  </div>
</section>

<section class="intro wrap" aria-labelledby="intro-h">
  ${eyebrow('Since 2018 on South Boulevard')}
  <h2 id="intro-h" class="d-lg intro-h" data-scrub>A neighborhood salon for hair, nails and skin, where nobody rushes you out the door. Call ahead, or walk right in.</h2>
  <ul class="facts">
    <li data-rise><b>4.8</b><span>stars on Google from 50+ reviews</span></li>
    <li data-rise><b>1969</b><span>the year our owner, Rosie Keller, started doing hair</span></li>
    <li data-rise><b>Mon–Sat</b><span>open six days, walk-ins welcome</span></li>
    <li data-rise><b>Accessible</b><span>wheelchair accessible, and good for kids</span></li>
  </ul>
</section>

<section class="trio" aria-labelledby="trio-h">
  <div class="wrap trio-head">
    ${eyebrow('Three chairs, one roof')}
    <h2 id="trio-h" class="d-lg" data-chars>What we do</h2>
  </div>
  <div class="trio-row" data-trio>
    ${GROUPS.map((gr, i) => `<article class="panel panel-${gr.id}${i === 0 ? ' is-open' : ''}" data-panel>
      ${gr.id === 'skin' ? `<div class="panel-bg panel-type" aria-hidden="true">${ring('S', 'ring-xl')}</div>` : `<div class="panel-bg" data-iris>${img(root, gr.id === 'hair' ? 'curls-after' : 'nails-floral', gr.id === 'hair' ? 'Short violet curls after a color appointment' : 'Red nails with hand-painted yellow and white florals', '', { small: true, sizes: '(min-width:1024px) 50vw, 100vw' })}</div>`}
      <div class="panel-in">
        <p class="panel-n">${gr.roman}</p>
        <h3 class="panel-h">${gr.name}</h3>
        <p class="panel-l">${gr.line}</p>
        <ul class="panel-list">${g(gr.id).slice(0, 6).map(s => `<li>${s.n}</li>`).join('')}</ul>
        <a class="panel-a ul" href="${root}services/#${gr.id}">All ${gr.name.toLowerCase()} services ${arr}</a>
      </div>
    </article>`).join('')}
  </div>
</section>

<section class="mq" aria-hidden="true"><div class="mq-track" data-mq>${Array(2).fill(SERVICES.filter(s => !s.ask).map(s => `<span>${s.n}</span><i>${mark()}</i>`).join('')).join('')}</div></section>

<section class="feat wrap" aria-labelledby="feat-h">
  <div class="feat-copy">
    ${eyebrow('Color &amp; curl')}
    <h2 id="feat-h" class="d-lg" data-chars>From grown-out to <em>violet.</em></h2>
    <p>Drag across the photo. Vivid color, perms and curly hair are all on our service list. Tell us the shade you&rsquo;re after when you call.</p>
    ${btn(root + 'plan/?s=color,vivid', 'Plan a color visit', 'btn-ink')}
  </div>
  ${beforeAfter(root)}
</section>

<section class="reel" aria-labelledby="reel-h">
  <div class="wrap reel-head">
    <div>${eyebrow('Nails, painted by hand')}<h2 id="reel-h" class="d-lg" data-chars>Little works of&nbsp;art</h2></div>
    <a class="ul reel-a" href="${root}looks/">See every look ${arr}</a>
  </div>
  <div class="reel-track" data-reel data-cursor="Drag" tabindex="0" aria-label="Nail art photos, scroll sideways">
    ${LOOKS.filter(l => l.k === 'nails').map(l => `<figure class="reel-it">${img(root, l.img, l.cap, '', { small: true, sizes: '(min-width:1024px) 22vw, 64vw' })}<figcaption><span>${l.t}</span></figcaption></figure>`).join('')}
  </div>
</section>

<section class="voices" aria-labelledby="voices-h" data-voices>
  <div class="wrap voices-in">
    <div class="voices-top">
      <h2 id="voices-h" class="eb">In our clients&rsquo; words</h2>
      <a class="voices-rate ul" href="${GREVIEWS}" target="_blank" rel="noopener"><b>4.8</b> <span class="stars" aria-hidden="true">★★★★★</span> Google · 50+ reviews ${ext}</a>
    </div>
    <div class="voices-stage" aria-live="polite">
      ${REVIEWS.map((r, i) => `<blockquote class="voice${i === 0 ? ' is-on' : ''}" data-voice><p class="d-md">&ldquo;${r.q}&rdquo;</p><footer>${r.s}</footer></blockquote>`).join('')}
    </div>
    <div class="voices-ctl">
      <button type="button" class="rbtn" data-voice-prev aria-label="Previous review"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>
      <span class="voices-n"><b data-voice-n>01</b> / 0${REVIEWS.length}</span>
      <button type="button" class="rbtn" data-voice-next aria-label="Next review">${arr}</button>
      <span class="voices-bar" aria-hidden="true"><i data-voice-bar></i></span>
    </div>
  </div>
</section>

<section class="since wrap" aria-labelledby="since-h" data-since>
  <div class="since-num" aria-hidden="true"><span data-year>1969</span></div>
  <div class="since-copy">
    ${eyebrow('Our owner')}
    <h2 id="since-h" class="d-lg" data-chars>Rosie Keller has been doing hair since&nbsp;1969.</h2>
    <p>Ten years at Jean Paige, four at The Main Event, then 36 years running her own salon, Crystal Rose. In 2018 she opened Beauty Bar on the Boulevard and filled it with stylists, a nail tech and an esthetician.</p>
    <a class="ul" href="${root}team/">Meet the team ${arr}</a>
  </div>
</section>

<section class="visit-b wrap" aria-labelledby="vb-h">
  <div class="vb-pic" data-iris>${img(root, 'reception', 'The reception desk of reclaimed barn wood, with gift baskets and a polish rack', '', { small: true, sizes: '(min-width:1024px) 45vw, 100vw' })}</div>
  <div class="vb-copy">
    ${eyebrow('Visit')}
    <h2 id="vb-h" class="d-lg" data-chars>Come on in.</h2>
    ${status('status-lg')}
    ${hoursTable()}
    ${hoursNote}
    <p class="vb-addr">${ADDR1}<br>${ADDR2}</p>
    <div class="row-btns">${btn(GMAPS, 'Directions', 'btn-ink', 'target="_blank" rel="noopener"')}<a class="ul" href="${root}visit/">Parking, access &amp; FAQ ${arr}</a></div>
  </div>
</section>`;
  return page({ root, title: 'Beauty Bar on the Boulevard · Hair, nails & skin in Crawfordsville, IN', desc: 'Hair, nail and skin salon at 408 E. South Boulevard, Crawfordsville, Indiana. Walk-ins welcome, or call (765) 365-5000.', path: '', body, cls: 'p-home' });
}

/* ---------------- SERVICES ---------------- */
function services() {
  const root = '../';
  const srcTags = s => s.src.map(k => `<li>${SRC[k]}</li>`).join('');
  const body = `
<header class="phead wrap">
  ${eyebrow('The service menu')}
  <h1 class="d-xxl" data-chars>Everything on the&nbsp;books.</h1>
  <p class="phead-p">Our prices aren&rsquo;t online yet, so call for a quote. Tap <b>Add</b> on anything you&rsquo;re after and we&rsquo;ll put it on a call card for you.</p>
</header>
<div class="tabs-wrap"><div class="wrap"><div class="tabs" role="tablist" aria-label="Filter services" data-tabs>
  <button type="button" role="tab" aria-selected="true" data-tab="all">All <sup>${SERVICES.length}</sup></button>
  ${GROUPS.map(g => `<button type="button" role="tab" aria-selected="false" data-tab="${g.id}">${g.name} <sup>${SERVICES.filter(s => s.g === g.id).length}</sup></button>`).join('')}
</div></div></div>
<section class="menu wrap" data-menu-list>
  ${GROUPS.map(g => `<div class="mgroup" id="${g.id}" data-group="${g.id}">
    <div class="mgroup-h"><span class="mgroup-n">${g.roman}</span><h2 class="d-lg">${g.name}</h2><p>${g.line}</p></div>
    <ul class="mlist">${SERVICES.filter(s => s.g === g.id).map(s => `<li class="mrow" data-svc="${s.id}"${s.img ? ` data-preview="${root}assets/img/${s.img}-s.webp"` : ''}>
      <div class="mrow-main">
        <h3 class="mrow-n">${s.n}${s.ask ? ' <span class="tag">Ask if available</span>' : ''}</h3>
        <p class="mrow-d">${s.d}</p>
        <p class="mrow-p"><span>Good to mention:</span> ${s.prep}</p>
        <ul class="mrow-src" aria-label="Source">${srcTags(s)}</ul>
      </div>
      <button type="button" class="add" aria-pressed="false" data-add="${s.id}" aria-label="Add ${esc(s.n)} to your visit"><span class="add-i">${plusI}</span><span class="add-t">Add</span></button>
    </li>`).join('')}</ul>
  </div>`).join('')}
  <p class="fine menu-fine">Skin services are listed from our 2018 opening line-up. Call to check what&rsquo;s on the books today.</p>
</section>
<div class="tray" data-tray hidden>
  <p><b data-tray-n>0</b> <span data-tray-l>services picked</span></p>
  <a class="btn btn-light btn-sm" href="${root}plan/" data-magnetic><span class="btn-t">Make my call card</span><span class="btn-o" aria-hidden="true">${arr}</span></a>
</div>
<div class="peek" aria-hidden="true"><img alt="" data-peek></div>`;
  return page({ root, title: 'Services · Beauty Bar on the Boulevard', desc: 'Haircuts, color, perms, curly hair, kids’ cuts, extensions, manicures, pedicures, gel, acrylic, nail art and more in Crawfordsville, IN.', path: 'services/', body, cls: 'p-services' });
}

/* ---------------- PLAN ---------------- */
const SAY = { cut: 'a haircut', kids: 'a kids’ cut', perm: 'a perm', straight: 'a straight perm', updo: 'an updo', design: 'a design cut', curly: 'a curly cut', vivid: 'vivid color', ext: 'extensions', mani: 'a manicure', manipedi: 'a manicure and pedicure', pedi: 'a pedicure', gel: 'gel nails', acrylic: 'a set of acrylic nails', fill: 'a fill-in', art: 'nail art', polish: 'a polish change', removal: 'polish removal', facewax: 'facial waxing', bodywax: 'body waxing', facial: 'a facial', tint: 'a lash and brow tint', makeup: 'makeup' };
function plan() {
  const root = '../';
  const body = `
<header class="phead wrap">
  ${eyebrow('Plan a visit')}
  <h1 class="d-xxl" data-chars>One quick call.</h1>
  <p class="phead-p">Pick what you&rsquo;d like, who with and when. We&rsquo;ll write it up as a call card, so you know exactly what to say. Nothing is sent from this page.</p>
</header>
<section class="planner wrap" data-planner>
  <form class="steps" data-plan-form onsubmit="return false">
    <fieldset class="step">
      <legend><span class="step-n">I</span>What are you coming in for?</legend>
      ${GROUPS.map(g => `<div class="chips-g"><p class="chips-l">${g.name}</p><div class="chips">${SERVICES.filter(s => s.g === g.id).map(s => `<label class="chip"><input type="checkbox" name="s" value="${s.id}"><span>${s.n}</span></label>`).join('')}</div></div>`).join('')}
    </fieldset>
    <fieldset class="step">
      <legend><span class="step-n">II</span>Anyone in particular?</legend>
      <div class="chips chips-who">
        <label class="chip"><input type="radio" name="w" value="" checked><span>First available</span></label>
        ${TEAM.map(t => `<label class="chip"><input type="radio" name="w" value="${t.id}"><span>${t.n.split(' ')[0]}</span></label>`).join('')}
      </div>
      <p class="fine" data-who-note></p>
    </fieldset>
    <fieldset class="step">
      <legend><span class="step-n">III</span>When suits you?</legend>
      <div class="chips chips-day" data-days></div>
      <div class="chips chips-time">
        <label class="chip"><input type="radio" name="t" value="" checked><span>Any time</span></label>
        <label class="chip"><input type="radio" name="t" value="morning"><span>Morning</span></label>
        <label class="chip"><input type="radio" name="t" value="afternoon"><span>Afternoon</span></label>
        <label class="chip" data-evening><input type="radio" name="t" value="evening"><span>After 5 PM</span></label>
      </div>
      <p class="fine" data-time-note></p>
    </fieldset>
    <fieldset class="step">
      <legend><span class="step-n">IV</span>Appointment or walk-in?</legend>
      <div class="chips">
        <label class="chip"><input type="radio" name="m" value="book" checked><span>Book an appointment</span></label>
        <label class="chip"><input type="radio" name="m" value="walk"><span>I&rsquo;ll walk in</span></label>
      </div>
      <div class="fields">
        <label class="field"><span>Your first name <i>(optional)</i></span><input type="text" name="name" autocomplete="given-name" maxlength="40"></label>
        <label class="field"><span>Anything else? <i>(optional)</i></span><textarea name="notes" rows="3" maxlength="300" placeholder="e.g. I&rsquo;d like to go shorter but keep my curls"></textarea></label>
      </div>
      <div class="inspo" data-inspo hidden><p class="chips-l">Looks you saved</p><ul data-inspo-list></ul></div>
    </fieldset>
  </form>
  <aside class="card" aria-labelledby="card-h" data-card>
    <div class="card-in">
      <div class="card-top">${mark('card-mark')}<div><p class="eb">Your call card</p><h2 id="card-h" class="card-h" data-card-h>Pick a service to start</h2></div></div>
      <dl class="card-dl">
        <div><dt>For</dt><dd data-c-s>—</dd></div>
        <div><dt>With</dt><dd data-c-w>First available</dd></div>
        <div><dt>When</dt><dd data-c-t>Any open day</dd></div>
      </dl>
      <div class="card-say"><p class="eb">What to say</p><p class="card-script" data-c-script>Hi! I&rsquo;d like to book a visit.</p></div>
      <div class="card-prep" data-c-prep-w hidden><p class="eb">Have ready</p><ul data-c-prep></ul></div>
      <div class="card-btns">
        <a class="btn btn-ink btn-lg btn-block" href="${TEL}" data-c-call data-magnetic><span class="btn-t" data-c-call-t>Call ${PHONE}</span><span class="btn-o" aria-hidden="true">${phoneI}</span></a>
        <button type="button" class="btn btn-ghost btn-block" data-c-copy><span class="btn-t">Copy what to say</span></button>
        <button type="button" class="linkbtn" data-c-reset>Start over</button>
      </div>
    </div>
  </aside>
</section>
<a class="card-jump" href="#card-h" data-card-jump><span data-jump-t>Your call card</span> <svg viewBox="0 0 24 24" aria-hidden="true" class="i"><path d="M12 4v15M6 13l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></a>
<script>window.__SV=${JSON.stringify(SERVICES.map(s => ({ id: s.id, g: s.g, prep: s.prep, ask: !!s.ask, say: SAY[s.id] || s.n.toLowerCase() })))}</script>`;
  return page({ root, title: 'Plan a visit · Beauty Bar on the Boulevard', desc: 'Pick your services, stylist and time, and get a call card for booking at Beauty Bar on the Boulevard in Crawfordsville.', path: 'plan/', body, cls: 'p-plan', cta: false });
}

/* ---------------- LOOKS ---------------- */
function looks() {
  const root = '../';
  const body = `
<header class="phead wrap">
  ${eyebrow('Looks')}
  <h1 class="d-xxl" data-chars>From the&nbsp;chair.</h1>
  <p class="phead-p">Real work and real rooms, from the salon&rsquo;s own photos. Tap a look to see it big, then save it to show us when you book.</p>
</header>
<section class="wrap looks-ba">${beforeAfter(root)}<div class="looks-ba-c"><h2 class="d-md">Color &amp; curl</h2><p>Vivid color and a curly cut, before and after.</p><button type="button" class="btn btn-ghost" data-save-look="curls-after" data-save-t="Violet curls"><span class="btn-t">Save this look</span><span class="btn-o" aria-hidden="true">${plusI}</span></button></div></section>
<div class="tabs-wrap"><div class="wrap"><div class="tabs" role="tablist" aria-label="Filter looks" data-ltabs>
  ${[['all', 'All'], ['nails', 'Nails'], ['hair', 'Hair'], ['salon', 'The salon']].map(([k, t], i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-ltab="${k}">${t}</button>`).join('')}
</div></div></div>
<section class="wrap grid" data-grid>
  ${LOOKS.map((l, i) => `<figure class="gi" data-k="${l.k}" data-i="${i}">
    <button type="button" class="gi-b" data-open="${i}" data-cursor="View" aria-label="View ${esc(l.t)}">
      <span class="gi-pic" data-iris>${img(root, l.img, l.cap, '', { small: true, sizes: '(min-width:1024px) 30vw, 50vw' })}</span>
    </button>
    <figcaption><span class="gi-t">${l.t}</span><span class="gi-k">${l.k === 'salon' ? 'The salon' : l.k[0].toUpperCase() + l.k.slice(1)}</span></figcaption>
  </figure>`).join('')}
</section>
<dialog class="lb" data-lb aria-label="Look viewer">
  <div class="lb-in">
    <button type="button" class="lb-x" data-lb-close aria-label="Close"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>
    <div class="lb-pic"><img alt="" data-lb-img></div>
    <div class="lb-c">
      <p class="eb" data-lb-k></p>
      <h2 class="d-md" data-lb-t></h2>
      <p data-lb-cap></p>
      <div class="lb-btns">
        <button type="button" class="btn btn-light" data-lb-save><span class="btn-t">Save this look</span><span class="btn-o" aria-hidden="true">${plusI}</span></button>
        <div class="lb-nav"><button type="button" class="rbtn rbtn-inv" data-lb-prev aria-label="Previous look"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button><button type="button" class="rbtn rbtn-inv" data-lb-next aria-label="Next look">${arr}</button></div>
      </div>
    </div>
  </div>
</dialog>
<script type="application/json" id="looks-data">${JSON.stringify(LOOKS.map(l => ({ src: `${root}assets/img/${l.img}.webp`, img: l.img, t: l.t, k: l.k === 'salon' ? 'The salon' : l.k[0].toUpperCase() + l.k.slice(1), cap: l.cap, w: DIMS[l.img][0], h: DIMS[l.img][1] })))}</script>`;
  return page({ root, title: 'Looks · Beauty Bar on the Boulevard', desc: 'Nail art, color and the salon itself, from Beauty Bar on the Boulevard in Crawfordsville, IN.', path: 'looks/', body, cls: 'p-looks' });
}

/* ---------------- TEAM ---------------- */
function team() {
  const root = '../';
  const steps = [
    ['1969', 'Graduates from Lafayette Beauty Academy', 'Rosie Keller starts her career.'],
    ['10 yrs', 'Jean Paige salon', 'Her first chair, straight out of school.'],
    ['4 yrs', 'The Main Event', 'On to a new salon.'],
    ['36 yrs', 'Crystal Rose', 'Her own salon, later with a sister salon, Angel Hair.'],
    ['2018', 'Beauty Bar on the Boulevard', 'Opens at 408 E. South Boulevard with stylists, a nail tech and an esthetician.'],
  ];
  const body = `
<header class="phead wrap">
  ${eyebrow('Team')}
  <h1 class="d-xxl" data-chars>Behind the&nbsp;chairs.</h1>
  <p class="phead-p">Ask for anyone by name when you call. Each stylist keeps their own book, so who&rsquo;s in can change. Call to check.</p>
</header>
<section class="team wrap">
  ${TEAM.map(t => `<article class="tm" data-rise>
    ${ring(t.n[0], 'ring-lg')}
    <div class="tm-c">
      <p class="tm-since">${t.since}</p>
      <h2 class="tm-n">${t.n}</h2>
      <p class="tm-r">${t.role}</p>
      <p class="tm-d">${t.d}</p>
      <p class="tm-src">Source: ${t.src}</p>
      <div class="tm-a">${t.tel ? `<a class="ul" href="${t.tel}">Her direct line, ${t.phone}</a>` : ''}<a class="ul" href="${root}plan/?w=${t.id}">Plan a visit with ${t.n.split(' ')[0]} ${arr}</a></div>
    </div>
  </article>`).join('')}
</section>
<section class="story" aria-labelledby="story-h" data-story>
  <div class="story-pin">
    <div class="wrap story-head">${eyebrow('Our owner’s story')}<h2 id="story-h" class="d-lg" data-chars>Five decades of&nbsp;hair.</h2></div>
    <ol class="story-track" data-story-track>
      ${steps.map(([y, h, p]) => `<li class="st"><span class="st-y">${y}</span><span class="st-dot" aria-hidden="true"></span><h3>${h}</h3><p>${p}</p></li>`).join('')}
    </ol>
  </div>
</section>
<section class="wrap team-pic"><div data-iris>${img(root, 'int-wide', 'The salon floor with mirrors, hood dryers and shampoo chairs', '', { sizes: '(min-width:1024px) 85vw, 100vw' })}</div><p class="fine">Source for Rosie&rsquo;s story: Journal Review, &ldquo;Beauty Bar announces its staff,&rdquo; July 17, 2018.</p></section>`;
  return page({ root, title: 'Team · Beauty Bar on the Boulevard', desc: 'The stylists and nail techs at Beauty Bar on the Boulevard, and owner Rosie Keller’s story.', path: 'team/', body, cls: 'p-team' });
}

/* ---------------- VISIT ---------------- */
function visit() {
  const root = '../';
  const faq = [
    ['Do you take walk-ins?', 'Yes. Walk on in any day we&rsquo;re open. If you&rsquo;re after a particular stylist or a longer service like color, calling ahead is the surest way to get a chair.'],
    ['How much does it cost?', 'Our prices aren&rsquo;t online yet. Call <a class="ul" href="' + TEL + '">' + PHONE + '</a> and we&rsquo;ll give you a quote for what you have in mind.'],
    ['Can I book a specific stylist?', 'Yes, ask for them by name. Ashley also takes bookings on her direct line, <a class="ul" href="tel:+17657191140">765-719-1140</a>. See the <a class="ul" href="' + root + 'team/">team</a>.'],
    ['Do you cut kids&rsquo; hair?', 'Yes. Kids&rsquo; cuts are on our service list, and our Google profile lists us as good for kids.'],
    ['Is the salon accessible?', 'Yes. The salon is wheelchair accessible.'],
    ['Do you have Wi-Fi?', 'Yes, free Wi-Fi while you wait or sit under the dryer.'],
  ];
  const body = `
<header class="phead wrap">
  ${eyebrow('Visit')}
  <h1 class="d-xxl" data-chars>On South Boulevard.</h1>
  <p class="phead-p">${ADDR1}, ${ADDR2}.</p>
</header>
<section class="wrap vgrid">
  <div class="vcard">
    ${status('status-lg')}
    <p class="vnext" data-next></p>
    ${hoursTable('hours-lg')}
    ${hoursNote}
    <div class="row-btns">${callBtn('btn-ink')}</div>
  </div>
  <div class="vmap">
    <div class="map" data-cursor="Map"><iframe title="Map showing 408 E. South Boulevard, Crawfordsville" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-86.9030%2C40.0215%2C-86.8885%2C40.0287&amp;layer=mapnik&amp;marker=40.025111%2C-86.89572"></iframe></div>
    <div class="row-btns">${btn(GMAPS, 'Google Maps', 'btn-ghost', 'target="_blank" rel="noopener"')}${btn(AMAPS, 'Apple Maps', 'btn-ghost', 'target="_blank" rel="noopener"')}</div>
  </div>
</section>
<section class="wrap know" aria-labelledby="know-h">
  <h2 id="know-h" class="eb">Good to know</h2>
  <ul class="know-l">
    ${[['Walk-ins welcome', 'Monday to Saturday'], ['Wheelchair accessible', 'Clients say so too'], ['Good for kids', 'Kids&rsquo; cuts on the menu'], ['Free Wi-Fi', 'For the wait'], ['Bike parking', 'Ride on over']].map(([a, b]) => `<li data-rise><b>${a}</b><span>${b}</span></li>`).join('')}
  </ul>
</section>
<section class="wrap faq" aria-labelledby="faq-h">
  <h2 id="faq-h" class="d-lg" data-chars>Questions</h2>
  <div class="faq-l">${faq.map(([q, a]) => `<details class="qa"><summary><span>${q}</span><i aria-hidden="true"></i></summary><div class="qa-a"><p>${a}</p></div></details>`).join('')}</div>
</section>
<section class="wrap vpic"><div data-iris>${img(root, 'holiday', 'The front window decorated for the holidays, with stockings and the salon’s lettering on the glass', '', { small: true, sizes: '(min-width:1024px) 40vw, 100vw' })}</div><div class="vpic-c"><p class="d-md">Look for the reclaimed-wood desk and the Edison bulbs.</p><a class="ul" href="${FB}" target="_blank" rel="noopener">Follow us on Facebook ${ext}</a></div></section>`;
  return page({ root, title: 'Hours & directions · Beauty Bar on the Boulevard', desc: 'Find Beauty Bar on the Boulevard at 408 E. South Boulevard, Crawfordsville, IN 47933. Hours, map and FAQ.', path: 'visit/', body, cls: 'p-visit' });
}

function notFound() {
  const root = '/beauty-bar-boulevard/';
  const body = `<section class="nf wrap">${mark('nf-mark')}<h1 class="d-xxl" data-chars>This chair&rsquo;s empty.</h1><p class="phead-p">The page you&rsquo;re after isn&rsquo;t here. Try the home page, or give us a call.</p><div class="row-btns">${btn(root, 'Back to the salon', 'btn-ink')}${callBtn('btn-ghost')}</div></section>`;
  return page({ root, title: 'Not found · Beauty Bar on the Boulevard', desc: 'Page not found.', path: '404.html', body, cls: 'p-404', cta: false });
}

export const PAGES = { 'index.html': home, 'services/index.html': services, 'plan/index.html': plan, 'looks/index.html': looks, 'team/index.html': team, 'visit/index.html': visit, '404.html': notFound };
