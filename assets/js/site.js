/* Beauty Bar on the Boulevard concept: interaction + motion (GSAP + ScrollTrigger + Lenis) */
(function () {
  'use strict';
  var d = document, H = d.documentElement, W = window;
  var RM = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = W.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var DESK = function () { return W.matchMedia('(min-width:1024px)').matches; };
  var hasG = !!(W.gsap && W.ScrollTrigger);
  var motion = !RM && hasG;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var lenis = null;
  W.__bbReady = true;
  H.classList.toggle('motion', motion);
  H.classList.toggle('no-motion', !motion);
  if (hasG) gsap.registerPlugin(ScrollTrigger);
  var entering = H.classList.contains('pt-in');
  try { sessionStorage.removeItem('bb-pt'); } catch (e) {}
  var ROOT = (function () { var s = $('script[src*="assets/js/site.js"]'); return s ? s.getAttribute('src').replace('assets/js/site.js', '') : './'; })();

  /* ---------- store ---------- */
  var KEY = 'bb-visit';
  function load() { try { var v = JSON.parse(localStorage.getItem(KEY) || '{}'); return { s: v.s || [], looks: v.looks || [], p: v.p || {} }; } catch (e) { return { s: [], looks: [], p: {} }; } }
  var store = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} paintCount(); }
  function paintCount() {
    var n = store.s.length;
    $$('[data-tray-n]').forEach(function (el) { el.textContent = n; if (el.classList.contains('dock-n')) el.hidden = n === 0; });
    var tray = $('[data-tray]'); if (tray) { tray.hidden = n === 0; var l = $('[data-tray-l]', tray); if (l) l.textContent = n === 1 ? 'service picked' : 'services picked'; }
  }
  paintCount();
  var toastT;
  function toast(msg) { var t = $('[data-toast]'); if (!t) return; t.textContent = msg; t.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('is-on'); }, 2600); }

  /* ---------- hours / status (America/Indianapolis) ---------- */
  var HOURS = [null, [9, 19], [9, 19], [9, 19], [9, 19], [9, 15], [9, 15]];
  var DN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var DS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function now() {
    try {
      var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Indianapolis', year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      return { y: +o.year, m: +o.month - 1, d: +o.day, wd: DS.indexOf(o.weekday), h: (+o.hour % 24) + (+o.minute) / 60 };
    } catch (e) { var n = new Date(); return { y: n.getFullYear(), m: n.getMonth(), d: n.getDate(), wd: n.getDay(), h: n.getHours() + n.getMinutes() / 60 }; }
  }
  function fh(h) { return h === 12 ? '12 PM' : h > 12 ? (h - 12) + ' PM' : h + ' AM'; }
  function addDays(t, k) { var x = new Date(Date.UTC(t.y, t.m, t.d + k)); return { y: x.getUTCFullYear(), m: x.getUTCMonth(), d: x.getUTCDate(), wd: x.getUTCDay() }; }
  function nextOpen(t) { for (var k = 1; k < 8; k++) { var x = addDays(t, k); if (HOURS[x.wd]) return { k: k, wd: x.wd }; } }
  function paintStatus() {
    var t = now(), h = HOURS[t.wd], open = h && t.h >= h[0] && t.h < h[1], soon = open && h[1] - t.h <= 1, txt, nxt = '';
    if (open) txt = (soon ? 'Closing soon · ' : 'Open now · until ') + fh(h[1]);
    else if (h && t.h < h[0]) { txt = 'Closed · opens today ' + fh(h[0]); nxt = 'Doors open at ' + fh(h[0]) + ' today.'; }
    else { var n = nextOpen(t); txt = 'Closed · opens ' + (n.k === 1 ? 'tomorrow' : DS[n.wd]) + ' ' + fh(HOURS[n.wd][0]); nxt = 'Back ' + (n.k === 1 ? 'tomorrow' : DN[n.wd]) + ' at ' + fh(HOURS[n.wd][0]) + '.'; }
    if (open) nxt = 'Walk in until ' + fh(h[1]) + ' today.';
    $$('[data-status]').forEach(function (el) { el.classList.toggle('is-open', open && !soon); el.classList.toggle('is-soon', !!soon); var s = $('[data-status-t]', el); if (s) s.textContent = txt; });
    $$('[data-hours] tr').forEach(function (r) { r.classList.toggle('is-today', +r.dataset.day === t.wd); });
    var nx = $('[data-next]'); if (nx) nx.textContent = nxt;
  }
  paintStatus(); setInterval(paintStatus, 30000);

  /* ---------- Lenis ---------- */
  if (motion && W.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); }); gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function (e) { var id = a.getAttribute('href'); if (id.length > 1 && $(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -70 }); } }); });
  }

  /* ---------- dock / top-right hide on scroll ---------- */
  var lastY = W.scrollY;
  W.addEventListener('scroll', function () { var y = W.scrollY; if (H.classList.contains('sheet-open')) return; if (y > 240 && y > lastY + 6) H.classList.add('dock-hide'); else if (y < lastY - 6 || y < 240) H.classList.remove('dock-hide'); lastY = y; }, { passive: true });

  /* ---------- index sheet ---------- */
  var sb = $('[data-sheet-btn]'), sheet = $('[data-sheet]');
  function setInert(el, on) { if (!el) return; if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert'); }
  setInert(sheet, true);
  function closeSheet() { if (!H.classList.contains('sheet-open')) return; H.classList.remove('sheet-open'); sb.setAttribute('aria-expanded', 'false'); sheet.setAttribute('aria-hidden', 'true'); setInert(sheet, true); if (lenis) lenis.start(); d.body.style.overflow = ''; }
  if (sb && sheet) {
    sb.addEventListener('click', function () {
      if (H.classList.contains('sheet-open')) return closeSheet();
      var r = sb.getBoundingClientRect(); sheet.style.setProperty('--sx', (r.left + r.width / 2) + 'px'); sheet.style.setProperty('--sy', (r.top + r.height / 2) + 'px');
      H.classList.add('sheet-open'); H.classList.remove('dock-hide'); sb.setAttribute('aria-expanded', 'true'); sheet.setAttribute('aria-hidden', 'false'); setInert(sheet, false);
      if (lenis) lenis.stop(); d.body.style.overflow = 'hidden';
      if (motion) gsap.fromTo($$('.sheet-nav a', sheet), { y: 40, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'expo.out', stagger: 0.05, delay: 0.18 });
    });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheet(); });
  }

  /* ---------- page transition: iris from the click point ---------- */
  var iris = $('.iris'), irisMark = $('.iris-mark .mark');
  if (motion && iris) {
    if (entering) {
      gsap.set(iris, { clipPath: 'circle(150% at 50% 50%)' });
      gsap.timeline({ delay: 0.05 }).to(irisMark, { opacity: 0, scale: 0.8, duration: 0.35, ease: 'power2.in' }).to(iris, { clipPath: 'circle(0% at 50% 50%)', duration: 0.95, ease: 'expo.inOut', onComplete: function () { H.classList.remove('pt-in'); gsap.set(iris, { clearProps: 'clipPath' }); } }, '-=.1');
    }
    d.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || a.target === '_blank' || a.hasAttribute('download')) return;
      var url; try { url = new URL(a.href, location.href); } catch (x) { return; }
      if (url.origin !== location.origin || !/^https?:/.test(url.protocol)) return;
      if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
      if (url.pathname === location.pathname && url.search === location.search) { e.preventDefault(); return; }
      e.preventDefault();
      var x = e.clientX || W.innerWidth / 2, y = e.clientY || W.innerHeight / 2;
      try { sessionStorage.setItem('bb-pt', '1'); } catch (x2) {}
      gsap.set(iris, { clipPath: 'circle(0% at ' + x + 'px ' + y + 'px)' });
      gsap.set(irisMark, { opacity: 0, scale: 0.8 });
      gsap.timeline({ onComplete: function () { location.href = a.href; } })
        .to(iris, { clipPath: 'circle(150% at ' + x + 'px ' + y + 'px)', duration: 0.75, ease: 'expo.in' })
        .to(irisMark, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, '-=.15');
    });
    W.addEventListener('pageshow', function (ev) { if (ev.persisted) { H.classList.remove('pt-in'); gsap.set(iris, { clipPath: 'circle(0% at 50% 50%)' }); } });
  }

  /* ---------- cursor + magnetic ---------- */
  if (motion && FINE) {
    var cur = $('.cur'), curT = $('.cur-t');
    if (cur) {
      var cx = gsap.quickTo(cur, 'x', { duration: 0.45, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: 0.45, ease: 'power3' });
      W.addEventListener('pointermove', function (e) { cx(e.clientX); cy(e.clientY); });
      d.addEventListener('pointerover', function (e) {
        var l = e.target.closest && e.target.closest('[data-cursor]'), k = e.target.closest && e.target.closest('a,button,label,summary,input');
        if (l) { cur.classList.add('is-label'); cur.classList.remove('is-link'); curT.textContent = l.dataset.cursor; }
        else { cur.classList.remove('is-label'); cur.classList.toggle('is-link', !!k); }
      });
    }
    $$('[data-magnetic]').forEach(function (el) {
      var xT = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1,.45)' }), yT = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1,.45)' });
      el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); xT((e.clientX - r.left - r.width / 2) * 0.22); yT((e.clientY - r.top - r.height / 2) * 0.35); });
      el.addEventListener('pointerleave', function () { xT(0); yT(0); });
    });
  }

  /* ---------- split helpers ---------- */
  function splitChars(el) {
    if (el.classList.contains('is-split')) return $$('.ch', el);
    var label = el.textContent.replace(/\s+/g, ' ').trim();
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = d.createDocumentFragment();
          n.textContent.split(/( +)/).forEach(function (part) {
            if (!part) return;
            if (/^ +$/.test(part)) { frag.appendChild(d.createTextNode(' ')); return; }
            var w = d.createElement('span'); w.className = 'wd';
            Array.from(part).forEach(function (c) { var s = d.createElement('span'); s.className = 'ch'; s.textContent = c; w.appendChild(s); });
            frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    })(el);
    if (!el.hasAttribute('aria-hidden') && !el.getAttribute('aria-label')) el.setAttribute('aria-label', label);
    $$('.wd', el).forEach(function (w) { w.setAttribute('aria-hidden', 'true'); });
    el.classList.add('is-split');
    return $$('.ch', el);
  }
  function splitWords(el) {
    var label = el.textContent.replace(/\s+/g, ' ').trim();
    el.innerHTML = label.split(' ').map(function (w) { return '<span class="wd scrub-w" aria-hidden="true">' + w + '</span>'; }).join(' ');
    el.setAttribute('aria-label', label);
    return $$('.wd', el);
  }

  /* ---------- reveals ---------- */
  if (motion) {
    $$('[data-chars]').forEach(function (el) {
      if (el.closest('.hero')) return;
      var ch = splitChars(el);
      gsap.fromTo(ch, { opacity: 0, yPercent: 35, filter: 'blur(10px)' }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out', stagger: { each: 0.022, from: 'start' }, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    $$('[data-scrub]').forEach(function (el) {
      var ws = splitWords(el);
      gsap.fromTo(ws, { opacity: 0.14 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
    });
    $$('[data-iris]').forEach(function (el) {
      var im = $('img', el);
      var tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
      tl.fromTo(el, { clipPath: 'circle(0% at 50% 60%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: 1.5, ease: 'expo.out' });
      if (im) tl.fromTo(im, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0);
    });
    ScrollTrigger.batch('[data-rise]', { start: 'top 90%', once: true, onEnter: function (b) { gsap.to(b, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09 }); } });
    var wm = $('[data-track-wm]');
    if (wm) gsap.fromTo(wm, { letterSpacing: '.9em', opacity: 0.2 }, { letterSpacing: '.3em', opacity: 1, ease: 'none', scrollTrigger: { trigger: wm, start: 'top bottom', end: 'bottom 85%', scrub: true } });
  } else {
    $$('[data-chars]').forEach(function (el) { el.style.opacity = 1; });
  }

  /* ---------- hero ---------- */
  var hero = $('[data-hero]');
  if (hero && motion) {
    var h1 = $('.hh-1', hero), h2 = $('.hh-2', hero), mir = $('[data-mirror]', hero), pic = $('[data-mirror-pic] img', hero), lamp = $('[data-lamp]', hero), tag = $('[data-track]', hero), badge = $('.badge', hero), foot = $('.hero-foot', hero);
    var c1 = splitChars(h1), c2 = splitChars(h2);
    gsap.set([h1, h2], { opacity: 1 });
    var tl = gsap.timeline({ delay: entering ? 0.75 : 0.2 });
    tl.fromTo(mir, { clipPath: 'inset(50% 0% 50% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' })
      .fromTo(pic, { scale: 1.45 }, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0.35)
      .fromTo(c1, { opacity: 0, x: -30, filter: 'blur(14px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', stagger: 0.05 }, 0.7)
      .fromTo(c2, { opacity: 0, x: 30, filter: 'blur(14px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', stagger: 0.06 }, 0.9)
      .fromTo(lamp, { yPercent: -110, rotation: 10 }, { yPercent: 0, rotation: 0, duration: 2.2, ease: 'elastic.out(1,.35)' }, 0.5)
      .fromTo(tag, { letterSpacing: '1.6em', opacity: 0 }, { letterSpacing: '.62em', opacity: 1, duration: 1.8, ease: 'expo.out' }, 1.1)
      .fromTo(badge, { scale: 0, rotation: -120 }, { scale: 1, rotation: 0, duration: 1.4, ease: 'expo.out' }, 1.3)
      .fromTo(foot, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, 1.4);
    // scroll: the words part like doors, the mirror leans in
    var st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to(h1, { xPercent: -28, ease: 'none', scrollTrigger: st });
    gsap.to(h2, { xPercent: 28, ease: 'none', scrollTrigger: st });
    gsap.to(mir, { scale: 1.08, yPercent: 8, ease: 'none', scrollTrigger: st });
    gsap.to($('[data-mirror-pic]', hero), { '--sh': 1, ease: 'none', scrollTrigger: st });
    // lamp sways toward the pointer and with scroll speed
    var rot = gsap.quickTo(lamp, 'rotation', { duration: 1.6, ease: 'elastic.out(1,.3)' });
    W.addEventListener('pointermove', function (e) { if (W.scrollY > W.innerHeight) return; var dx = (e.clientX - W.innerWidth / 2) / (W.innerWidth / 2); rot(-dx * 7); }, { passive: true });
    ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom top', onUpdate: function (s) { var v = s.getVelocity(); rot(gsap.utils.clamp(-14, 14, v / 120)); } });
  }

  /* ---------- marquee (speed follows scroll velocity) ---------- */
  var mq = $('[data-mq]');
  if (mq && motion) {
    var half = 0, xpos = 0, dir = -1, boost = 0;
    function measure() { half = mq.scrollWidth / 2; }
    measure(); W.addEventListener('resize', measure);
    ScrollTrigger.create({ trigger: mq, start: 'top bottom', end: 'bottom top', onUpdate: function (s) { dir = s.direction === 1 ? -1 : 1; boost = Math.min(12, Math.abs(s.getVelocity()) / 220); } });
    gsap.ticker.add(function (t, dt) { xpos += dir * (0.6 + boost) * (dt / 16.7); boost *= 0.94; if (xpos <= -half) xpos += half; if (xpos > 0) xpos -= half; mq.style.transform = 'translate3d(' + xpos + 'px,0,0)'; });
  }

  /* ---------- trio panels ---------- */
  var trio = $('[data-trio]');
  if (trio) {
    var panels = $$('[data-panel]', trio);
    function openP(p) { panels.forEach(function (x) { x.classList.toggle('is-open', x === p); }); }
    panels.forEach(function (p) { p.addEventListener('mouseenter', function () { if (DESK()) openP(p); }); p.addEventListener('focusin', function () { openP(p); }); });
  }

  /* ---------- before / after ---------- */
  $$('[data-ba]').forEach(function (ba) {
    var r = $('[data-ba-range]', ba), st = $('.ba-stage', ba);
    function set(v) { st.style.setProperty('--ba', v + '%'); }
    r.addEventListener('input', function () { set(r.value); });
    set(r.value);
    if (motion) {
      var o = { v: 50 };
      gsap.timeline({ scrollTrigger: { trigger: ba, start: 'top 70%', once: true } }).to(o, { v: 82, duration: 0.9, ease: 'power3.inOut', onUpdate: function () { set(o.v); } }).to(o, { v: 22, duration: 1.1, ease: 'power3.inOut', onUpdate: function () { set(o.v); } }).to(o, { v: 50, duration: 0.9, ease: 'power3.inOut', onUpdate: function () { set(o.v); r.value = Math.round(o.v); } });
    }
  });

  /* ---------- reel drag (mouse) ---------- */
  $$('[data-reel]').forEach(function (tr) {
    var down = false, sx = 0, sl = 0, moved = 0;
    tr.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = 0; sx = e.clientX; sl = tr.scrollLeft; tr.classList.add('is-drag'); });
    W.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx)); tr.scrollLeft = sl - dx; });
    W.addEventListener('pointerup', function () { if (!down) return; down = false; tr.classList.remove('is-drag'); });
    tr.addEventListener('click', function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
    if (motion) gsap.fromTo($$('.reel-it', tr), { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 1.3, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: tr, start: 'top 85%', once: true } });
  });

  /* ---------- voices ---------- */
  var vs = $('[data-voices]');
  if (vs) {
    var items = $$('[data-voice]', vs), n = $('[data-voice-n]', vs), bar = $('[data-voice-bar]', vs), i = 0, timer, inView = false, prog;
    function show(k) {
      i = (k + items.length) % items.length;
      items.forEach(function (it, j) { it.classList.toggle('is-on', j === i); });
      n.textContent = (i < 9 ? '0' : '') + (i + 1);
      if (motion) { var p = $('p', items[i]); var ch = splitChars(p); gsap.fromTo(ch, { opacity: 0, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out', stagger: 0.006 }); }
      restart();
    }
    function restart() { clearTimeout(timer); if (prog) prog.kill(); if (!inView) return; if (motion) prog = gsap.fromTo(bar, { width: '0%' }, { width: '100%', duration: 7, ease: 'none' }); timer = setTimeout(function () { show(i + 1); }, 7000); }
    $('[data-voice-next]', vs).addEventListener('click', function () { show(i + 1); });
    $('[data-voice-prev]', vs).addEventListener('click', function () { show(i - 1); });
    if ('IntersectionObserver' in W && !RM) new IntersectionObserver(function (en) { inView = en[0].isIntersecting; restart(); }, { threshold: 0.4 }).observe(vs);
  }

  /* ---------- since: outline numerals fill with ink ---------- */
  var since = $('[data-since]');
  if (since && motion) {
    var yr = $('[data-year]', since);
    yr.style.backgroundImage = 'linear-gradient(90deg, #141312 50%, transparent 50%)'; yr.style.backgroundSize = '200% 100%'; yr.style.backgroundPosition = '100% 0'; yr.style.webkitBackgroundClip = 'text'; yr.style.backgroundClip = 'text';
    gsap.to(yr, { backgroundPosition: '0% 0', ease: 'none', scrollTrigger: { trigger: since, start: 'top 75%', end: 'center 40%', scrub: true } });
  }

  /* ---------- team story: horizontal on desktop ---------- */
  var story = $('[data-story]');
  if (story && motion) {
    var track = $('[data-story-track]', story);
    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': function () {
        var dist = function () { return Math.max(0, track.scrollWidth - (W.innerWidth - 84) + 80); };
        gsap.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: story, start: 'top top', end: function () { return '+=' + dist(); }, pin: $('.story-pin', story), scrub: 0.6, invalidateOnRefresh: true } });
      },
      '(max-width: 1023px)': function () { gsap.fromTo($$('.st', track), { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: track, start: 'top 80%', once: true } }); }
    });
  }

  /* ---------- services ---------- */
  var tabs = $('[data-tabs]');
  if (tabs) {
    var groups = $$('[data-group]');
    $$('[data-tab]', tabs).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-tab]', tabs).forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
        groups.forEach(function (g) { g.hidden = !(b.dataset.tab === 'all' || g.dataset.group === b.dataset.tab); });
        if (hasG) ScrollTrigger.refresh();
        var top = $('[data-menu-list]').getBoundingClientRect().top + W.scrollY - 80;
        if (W.scrollY > top) { if (lenis) lenis.scrollTo(top, { duration: 0.8 }); else W.scrollTo(0, top); }
      });
    });
  }
  function paintAdds() { $$('[data-add]').forEach(function (b) { var on = store.s.indexOf(b.dataset.add) > -1; b.setAttribute('aria-pressed', String(on)); $('.add-t', b).textContent = on ? 'Added' : 'Add'; }); }
  $$('[data-add]').forEach(function (b) {
    b.addEventListener('click', function () {
      var id = b.dataset.add, k = store.s.indexOf(id);
      if (k > -1) store.s.splice(k, 1); else store.s.push(id);
      save(); paintAdds();
      if (k < 0) toast('Added to your call card');
    });
  });
  paintAdds();
  var peek = $('.peek'), peekImg = $('[data-peek]');
  if (peek && FINE && motion) {
    var px = gsap.quickTo(peek, 'x', { duration: 0.7, ease: 'power3' }), py = gsap.quickTo(peek, 'y', { duration: 0.7, ease: 'power3' });
    $$('[data-preview]').forEach(function (row) {
      row.addEventListener('mouseenter', function () { if (peekImg.getAttribute('src') !== row.dataset.preview) peekImg.src = row.dataset.preview; peek.classList.add('is-on'); });
      row.addEventListener('mouseleave', function () { peek.classList.remove('is-on'); });
      row.addEventListener('mousemove', function (e) { px(e.clientX + 30); py(e.clientY - 150); });
    });
  }

  /* ---------- looks: filter, lightbox, save ---------- */
  var ltabs = $('[data-ltabs]');
  if (ltabs) {
    var gis = $$('.gi');
    $$('[data-ltab]', ltabs).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-ltab]', ltabs).forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
        gis.forEach(function (g) { g.hidden = !(b.dataset.ltab === 'all' || g.dataset.k === b.dataset.ltab); });
        if (motion) gsap.fromTo(gis.filter(function (g) { return !g.hidden; }), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05 });
        if (hasG) ScrollTrigger.refresh();
      });
    });
  }
  function saveLook(img, t) {
    if (!store.looks.some(function (l) { return l.img === img; })) { store.looks.push({ img: img, t: t }); save(); }
    toast('Saved. It’s on your call card.');
  }
  $$('[data-save-look]').forEach(function (b) { b.addEventListener('click', function () { saveLook(b.dataset.saveLook, b.dataset.saveT); }); });
  var lb = $('[data-lb]'), LD = $('#looks-data');
  if (lb && LD) {
    var looks = JSON.parse(LD.textContent), li = 0, lbImg = $('[data-lb-img]', lb);
    function vis() { return $$('.gi').filter(function (g) { return !g.hidden; }).map(function (g) { return +g.dataset.i; }); }
    function paintLb(k) {
      li = k; var L = looks[k];
      lbImg.src = L.src; lbImg.alt = L.cap; lbImg.width = L.w; lbImg.height = L.h;
      $('[data-lb-t]', lb).textContent = L.t; $('[data-lb-k]', lb).textContent = L.k; $('[data-lb-cap]', lb).textContent = L.cap;
      if (motion) gsap.fromTo(lbImg, { clipPath: 'circle(0% at 50% 50%)', scale: 1.1 }, { clipPath: 'circle(75% at 50% 50%)', scale: 1, duration: 1.1, ease: 'expo.out' });
    }
    function step(dir) { var v = vis(), p = v.indexOf(li); paintLb(v[(p + dir + v.length) % v.length]); }
    $$('[data-open]').forEach(function (b) { b.addEventListener('click', function () { paintLb(+b.dataset.open); if (lb.showModal) lb.showModal(); else lb.setAttribute('open', ''); if (lenis) lenis.stop(); }); });
    function closeLb() { if (lb.close) lb.close(); else lb.removeAttribute('open'); }
    lb.addEventListener('close', function () { if (lenis) lenis.start(); });
    $('[data-lb-close]', lb).addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-pic')) closeLb(); });
    $('[data-lb-next]', lb).addEventListener('click', function () { step(1); });
    $('[data-lb-prev]', lb).addEventListener('click', function () { step(-1); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
    $('[data-lb-save]', lb).addEventListener('click', function () { var L = looks[li]; saveLook(L.img, L.t); });
  }

  /* ---------- planner ---------- */
  var pl = $('[data-planner]');
  if (pl) {
    var form = $('[data-plan-form]', pl), card = $('[data-card]', pl);
    var NAMES = {}, PREP = {}, GROUP = {}, ASK = {}, SAYS = {};
    $$('input[name=s]', form).forEach(function (c) { NAMES[c.value] = c.nextElementSibling.textContent; });
    var SV = W.__SV || [];
    SV.forEach(function (s) { PREP[s.id] = s.prep; GROUP[s.id] = s.g; ASK[s.id] = !!s.ask; SAYS[s.id] = s.say; });
    var WHO = { ashley: { n: 'Ashley', tel: 'tel:+17657191140', ph: '765-719-1140', note: 'Ashley books on her own line, so this card calls her direct.' }, kira: { n: 'Kira' }, jennie: { n: 'Jennie', note: 'Jennie’s book fills fast. Call early.' }, marcie: { n: 'Marcie', note: 'Marcie does nails.' }, rosie: { n: 'Rosie' } };
    // days: next 8 days that are open
    var t0 = now(), daysEl = $('[data-days]', form), html = '<label class="chip"><input type="radio" name="d" value="" checked><span>Any day</span></label>';
    for (var k = 0, c = 0; k < 10 && c < 7; k++) {
      var x = addDays(t0, k); if (!HOURS[x.wd]) continue;
      if (k === 0 && t0.h >= HOURS[x.wd][1] - 0.5) continue;
      var iso = x.y + '-' + (x.m + 1) + '-' + x.d, lab = k === 0 ? 'Today' : k === 1 ? 'Tomorrow' : DS[x.wd] + ' ' + MN[x.m] + ' ' + x.d;
      html += '<label class="chip"><input type="radio" name="d" value="' + iso + '" data-wd="' + x.wd + '" data-lab="' + (k === 0 ? 'today' : k === 1 ? 'tomorrow' : DN[x.wd] + ', ' + MN[x.m] + ' ' + x.d) + '"><span>' + lab + (k > 1 ? '' : ' <small>' + DS[x.wd] + '</small>') + '</span></label>';
      c++;
    }
    daysEl.innerHTML = html;
    // restore
    var qs = new URLSearchParams(location.search);
    if (qs.get('s')) qs.get('s').split(',').forEach(function (id) { if (NAMES[id] && store.s.indexOf(id) < 0) store.s.push(id); });
    var P = store.p || {};
    if (qs.get('w')) P.w = qs.get('w');
    $$('input[name=s]', form).forEach(function (c) { c.checked = store.s.indexOf(c.value) > -1; });
    function setRadio(name, v) { var r = $('input[name=' + name + '][value="' + (v || '') + '"]', form); if (r) r.checked = true; }
    setRadio('w', P.w); setRadio('t', P.t); setRadio('m', P.m || 'book'); if (P.d) setRadio('d', P.d);
    form.elements.name.value = P.name || ''; form.elements.notes.value = P.notes || '';
    save();

    function val(name) { var r = $('input[name=' + name + ']:checked', form); return r ? r.value : ''; }
    function list(a) { return a.length <= 1 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]; }
    function render(bump) {
      store.s = $$('input[name=s]:checked', form).map(function (c) { return c.value; });
      var dEl = $('input[name=d]:checked', form), wd = dEl && dEl.dataset.wd ? +dEl.dataset.wd : null;
      var ev = $('[data-evening] input', form), evOk = wd === null || HOURS[wd][1] > 17;
      ev.disabled = !evOk; if (!evOk && ev.checked) setRadio('t', '');
      $('[data-time-note]', form).textContent = !evOk ? DN[wd] + 's we close at ' + fh(HOURS[wd][1]) + '.' : 'Mon–Thu 9 AM – 7 PM · Fri & Sat 9 AM – 3 PM';
      var w = val('w'), t = val('t'), m = val('m'), name = form.elements.name.value.trim(), notes = form.elements.notes.value.trim();
      store.p = { w: w, t: t, m: m, d: dEl ? dEl.value : '', name: name, notes: notes };
      save();
      var names = store.s.map(function (id) { return NAMES[id]; }), lower = store.s.map(function (id) { return SAYS[id] || NAMES[id].toLowerCase(); });
      var who = w ? WHO[w] : null, whoN = who ? who.n : '';
      $('[data-who-note]', form).textContent = who && who.note ? who.note : '';
      var when = (dEl && dEl.value ? dEl.dataset.lab : '') , tod = { morning: 'in the morning', afternoon: 'in the afternoon', evening: 'after 5' }[t] || '';
      var whenTxt = [when, tod].filter(Boolean).join(' ');
      $('[data-c-s]', card).textContent = names.length ? list(names) : '—';
      $('[data-c-w]', card).textContent = whoN || 'First available';
      $('[data-c-t]', card).textContent = (when ? when.charAt(0).toUpperCase() + when.slice(1) : 'Any open day') + (tod ? ', ' + tod : '');
      var head = names.length ? (names.length > 2 ? names.length + ' services' : names.join(' + ')) + (whoN ? ' with ' + whoN : '') : 'Pick a service to start';
      $('[data-card-h]', card).textContent = head;
      var svc = lower.length ? list(lower) : 'a visit';
      var hi = 'Hi' + (name ? ', this is ' + name : '') + '! ';
      var script = m === 'walk'
        ? hi + 'I’m thinking of walking in ' + (when ? when + (tod ? ' ' + tod : '') : ({ morning: 'one morning', afternoon: 'one afternoon', evening: 'one evening after 5' }[t] || 'soon')) + ' for ' + svc + '. Is there a chair open' + (whoN ? ' with ' + whoN : '') + '?'
        : hi + 'I’d like to book ' + (lower.length ? svc : 'an appointment') + (whoN ? ' with ' + whoN : '') + (whenTxt ? ', ' + whenTxt : '') + '. What do you have open?';
      if (notes) script += ' ' + notes.replace(/\s+/g, ' ') + (/[.!?]$/.test(notes) ? '' : '.');
      if (store.s.some(function (id) { return ASK[id]; })) script += ' Also, are skin services on the books right now?';
      $('[data-c-script]', card).textContent = script;
      var prep = store.s.map(function (id) { return PREP[id]; }).filter(Boolean);
      if (store.looks.length) prep.push('The look' + (store.looks.length > 1 ? 's' : '') + ' you saved: ' + store.looks.map(function (l) { return l.t; }).join(', '));
      var pw = $('[data-c-prep-w]', card); pw.hidden = !prep.length;
      $('[data-c-prep]', card).innerHTML = prep.map(function (p) { return '<li>' + p.replace(/</g, '&lt;') + '</li>'; }).join('');
      var call = $('[data-c-call]', card);
      call.href = who && who.tel ? who.tel : 'tel:+17653655000';
      $('[data-c-call-t]', card).textContent = who && who.tel ? 'Call Ashley · ' + who.ph : 'Call (765) 365-5000';
      // inspo list
      var ins = $('[data-inspo]', form); ins.hidden = !store.looks.length;
      $('[data-inspo-list]', form).innerHTML = store.looks.map(function (l, j) { return '<li><img src="' + ROOT + 'assets/img/' + l.img + '-s.webp" alt="" width="40" height="40">' + l.t + '<button type="button" data-rm="' + j + '" aria-label="Remove ' + l.t + '"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></button></li>'; }).join('');
      if (bump && motion) { card.classList.remove('is-bump'); void card.offsetWidth; card.classList.add('is-bump'); }
      var jt = $('[data-jump-t]'); if (jt) jt.textContent = store.s.length ? 'Your call card · ' + store.s.length : 'Your call card';
      W.__script = script;
    }
    form.addEventListener('change', function () { render(true); });
    form.addEventListener('input', function (e) { if (e.target.matches('input[type=text],textarea')) render(false); });
    form.addEventListener('click', function (e) { var b = e.target.closest('[data-rm]'); if (b) { store.looks.splice(+b.dataset.rm, 1); save(); render(true); } });
    $('[data-c-copy]', card).addEventListener('click', function () {
      var s = W.__script || '';
      function ok() { toast('Copied. Paste it in a text or your notes.'); }
      if (navigator.clipboard && W.isSecureContext) navigator.clipboard.writeText(s).then(ok, fb); else fb();
      function fb() { var ta = d.createElement('textarea'); ta.value = s; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; d.body.appendChild(ta); ta.select(); try { d.execCommand('copy'); ok(); } catch (e) { toast('Couldn’t copy. Select the text instead.'); } d.body.removeChild(ta); }
    });
    $('[data-c-reset]', card).addEventListener('click', function () { store = { s: [], looks: [], p: {} }; save(); form.reset(); setRadio('m', 'book'); render(true); toast('Cleared'); });
    render(false);
    var jump = $('[data-card-jump]');
    if (jump && 'IntersectionObserver' in W) {
      new IntersectionObserver(function (en) { jump.classList.toggle('is-off', en[0].isIntersecting); }, { threshold: 0.15 }).observe(card);
      jump.addEventListener('click', function (e) { e.preventDefault(); if (lenis) lenis.scrollTo(card, { offset: -20 }); else card.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); });
    }
    if (motion) gsap.fromTo($$('.step', form), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, delay: entering ? 0.8 : 0.2 });
  }

  if (hasG) W.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
