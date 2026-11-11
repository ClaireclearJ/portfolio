/* ============================================================
   THE CHRONICLE OF AN ENGINEER · 渲染与交互
   内容全部来自 data.js —— 这里只负责排版、双语、编号与动效。
   ============================================================ */
(function () {
  'use strict';

  var D = window.PORTFOLIO;
  if (!D) return;

  var lang = 'en';
  try { lang = localStorage.getItem('pw_lang') || 'en'; } catch (e) {}
  if (lang !== 'en' && lang !== 'zh') lang = 'en';
  /* 可选：用 ?lang=zh / ?lang=en 临时强制语言（不写入 localStorage） */
  try {
    var urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang === 'zh' || urlLang === 'en') lang = urlLang;
  } catch (e) {}

  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  /* ?capture 仅供本地截图/生成预览图：跳过启封、直接显示全文 */
  var CAPTURE = /[?&]capture(?:=|&|#|$)/.test(window.location.search);
  var ready = false;
  var typeTimer = null;
  var revealObserver = null;

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  /* 取当前语言文本：对象取当前语言，字符串原样返回 */
  function tr(v) {
    if (v == null) return '';
    if (typeof v === 'object') {
      if (v[lang] != null) return v[lang];
      if (v.en != null) return v.en;
      if (v.zh != null) return v.zh;
      return '';
    }
    return String(v);
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function icon(name) {
    return '<svg class="ico" aria-hidden="true"><use href="#i-' + esc(name) + '"></use></svg>';
  }

  /* ---------- 罗马数字（章节号 / 年份） ---------- */
  function roman(num) {
    var n = parseInt(num, 10);
    if (!isFinite(n) || n <= 0) return '';
    var map = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    var out = '';
    for (var i = 0; i < map.length; i++) {
      while (n >= map[i][0]) { out += map[i][1]; n -= map[i][0]; }
    }
    return out;
  }

  /* ============ 各区块渲染 ============ */
  function renderSeal() {
    var face = $('#seal-face');
    if (face) face.textContent = D.meta.crest || D.meta.name.charAt(0);
    if ($('#seal-title')) $('#seal-title').textContent = tr(D.ui.seal.title);
    if ($('#seal-sub')) $('#seal-sub').textContent = tr(D.ui.seal.sub);
    if ($('#seal-hint')) $('#seal-hint').textContent = tr(D.ui.seal.hint);
  }

  function renderBrand() {
    $('#brand-name').textContent = D.meta.name;
    var line1 = $('.crest-caption-latin');
    var line2 = $('.crest-caption-zh');
    var current = tr(D.meta.motto);
    var other = lang === 'en' ? D.meta.motto.zh : D.meta.motto.en;
    if (line1) line1.textContent = lang === 'en' ? String(current).toUpperCase() : current;
    if (line2) line2.textContent = other || '';
  }

  function renderNav() {
    $('#nav').innerHTML = D.ui.nav.map(function (item) {
      return '<a href="#' + esc(item.id) + '" data-nav="' + esc(item.id) + '">' + esc(tr(item)) + '</a>';
    }).join('');
  }

  function renderHero() {
    var nameEl = $('#hero-name');
    var parts = String(D.hero.name).trim().split(/\s+/);
    nameEl.innerHTML = parts.map(function (p) {
      return '<span class="name-line">' + esc(p) + '</span>';
    }).join('');

    $('#hero-pre').textContent = tr(D.hero.pre);
    $('#hero-role').textContent = tr(D.hero.role);
    $('#hero-status').textContent = tr(D.hero.status);

    $('#hero-actions').innerHTML =
      '<a class="btn btn-primary" href="#quests">' + esc(tr(D.ui.heroActions.primary)) + '</a>' +
      '<a class="btn btn-ghost" href="#raven">' + esc(tr(D.ui.heroActions.secondary)) + '</a>';

    var year = roman(new Date().getFullYear());
    $('#folio').textContent = tr(D.ui.heroFoot) + ' · ' + year;
    $('#scroll-cue').textContent = tr(D.ui.scrollCue);
  }

  function renderTicker() {
    var half = D.ticker.map(function (item) {
      return '<span class="tick">' + esc(item) + '</span><span class="tick-sep">✦</span>';
    }).join('');
    $('#ticker-track').innerHTML =
      '<span class="ticker-half">' + half + '</span>' +
      '<span class="ticker-half">' + half + '</span>';
  }

  function renderHeadings() {
    D.ui.nav.forEach(function (item, i) {
      var wrap = document.querySelector('[data-heading="' + item.id + '"]');
      if (!wrap) return;
      var num = roman(i + 1);
      var r = wrap.querySelector('.h-roman');
      var m = wrap.querySelector('.h-main');
      var s = wrap.querySelector('.h-sub');
      if (r) r.textContent = num;
      if (m) m.textContent = tr(item);
      if (s) s.textContent = lang === 'en' ? (item.zh || '') : (item.en || '');

      var sec = document.getElementById(item.id);
      if (sec) sec.setAttribute('data-numeral', num);

      var lede = document.querySelector('[data-lede="' + item.id + '"]');
      var ledeText = D.ui.sectionLede && D.ui.sectionLede[item.id];
      if (lede) lede.textContent = ledeText ? tr(ledeText) : '';
    });
  }

  function renderAbout() {
    $('#about-bio').innerHTML = D.about.bio.map(function (p) {
      return '<p>' + esc(tr(p)) + '</p>';
    }).join('');

    $('#about-stats').innerHTML = D.about.stats.map(function (s, i) {
      return '<div class="stat reveal" style="--d:' + (i * 70) + 'ms">' +
        '<span class="stat-val">' + esc(s.value) + '</span>' +
        '<span class="stat-lbl">' + esc(tr(s.label)) + '</span>' +
        '</div>';
    }).join('');
  }

  function renderSkills() {
    $('#skills-grid').innerHTML = D.skills.map(function (cat, i) {
      var chips = (cat.items || []).map(function (it) {
        return '<span class="chip">' + esc(it) + '</span>';
      }).join('');
      return '<div class="skill-group reveal" style="--d:' + (i * 70) + 'ms">' +
        '<div class="skill-head">' +
          '<span class="skill-icon">' + icon(cat.icon || 'sword') + '</span>' +
          '<h3 class="skill-cat">' + esc(tr(cat.category)) + '</h3>' +
        '</div>' +
        '<div class="chips">' + chips + '</div>' +
        '</div>';
    }).join('');
  }

  function renderProjects() {
    if (!D.projects || !D.projects.length) {
      $('#projects-grid').innerHTML = '';
      return;
    }
    $('#projects-grid').innerHTML = D.projects.map(function (p, i) {
      var links = '';
      if (p.link) {
        links += '<a class="p-link" href="' + esc(p.link) + '" target="_blank" rel="noopener">' +
          esc(tr(D.ui.projectLinks.demo)) + icon('arrow') + '</a>';
      }
      if (p.repo) {
        links += '<a class="p-link" href="' + esc(p.repo) + '" target="_blank" rel="noopener">' +
          esc(tr(D.ui.projectLinks.code)) + icon('arrow') + '</a>';
      }
      var highlights = (p.highlights || []).map(function (h) {
        return '<li>' + esc(tr(h)) + '</li>';
      }).join('');
      var tech = (p.tech || []).map(function (t) {
        return '<span class="p-tech">' + esc(t) + '</span>';
      }).join('');

      return '<article class="project' + (p.featured ? ' featured' : '') + ' reveal" style="--d:' + (i * 80) + 'ms">' +
        '<svg class="p-watermark" aria-hidden="true"><use href="#i-' + esc(p.icon || 'sword') + '"></use></svg>' +
        '<div class="p-head">' +
          '<span class="p-quest">' + esc(tr(D.ui.questWord)) + ' ' + roman(i + 1) + '</span>' +
          '<span class="p-meta">' +
            '<span class="p-year">' + esc(p.year) + '</span>' +
            '<span class="p-status" data-key="' + esc(p.statusKey || 'forge') + '">' + esc(tr(p.status)) + '</span>' +
          '</span>' +
        '</div>' +
        '<h3 class="p-title">' + esc(p.title) + '</h3>' +
        (p.subtitle ? '<p class="p-subtitle">' + esc(tr(p.subtitle)) + '</p>' : '') +
        '<div class="p-body">' +
          '<p class="p-summary">' + esc(tr(p.summary)) + '</p>' +
          '<div class="p-side">' +
            (highlights ? '<ul class="p-highlights">' + highlights + '</ul>' : '') +
            (tech ? '<div class="p-tech-row">' + tech + '</div>' : '') +
          '</div>' +
        '</div>' +
        (links ? '<div class="p-links">' + links + '</div>' : '') +
        '</article>';
    }).join('');
  }

  function renderExperience() {
    var chapterLabel = D.ui.chapterWord || { en: 'CHAPTER', zh: '第' };
    var chapterUnit = D.ui.chapterUnit || { en: '', zh: '章' };
    $('#timeline').innerHTML = D.experience.map(function (e, i) {
      var tech = (e.tech || []).map(function (t) {
        return '<span class="p-tech">' + esc(t) + '</span>';
      }).join('');
      var chapter = tr(chapterLabel) + ' ' + roman(i + 1) + tr(chapterUnit);
      return '<div class="tl-item reveal" style="--d:' + (i * 70) + 'ms">' +
        '<span class="tl-mark" aria-hidden="true"></span>' +
        '<div class="tl-head">' +
          '<span class="tl-chapter">' + esc(chapter) + '</span>' +
          '<span class="tl-period">' + esc(e.period) + '</span>' +
        '</div>' +
        '<h3 class="tl-role">' + esc(tr(e.role)) +
          ' <span class="tl-org">@ ' + esc(tr(e.org)) + '</span></h3>' +
        '<p class="tl-desc">' + esc(tr(e.description)) + '</p>' +
        (tech ? '<div class="p-tech-row">' + tech + '</div>' : '') +
        '</div>';
    }).join('');
  }

  function renderContact() {
    var c = D.contact;
    var social = (c.social || []).map(function (s) {
      return '<a class="social-link" href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
        '<span>' + esc(s.label) + '</span>' + icon('arrow') + '</a>';
    }).join('');

    $('#contact-box').innerHTML =
      '<div class="contact-panel reveal">' +
        '<div class="contact-main">' +
          '<p class="contact-cta">' + esc(tr(D.ui.contact.cta)) + '</p>' +
          '<a class="contact-email" href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>' +
          (c.note ? '<p class="contact-note">' + esc(tr(c.note)) + '</p>' : '') +
          '<div class="contact-meta">' +
            '<span class="contact-label">' + esc(tr(D.ui.contact.location)) + '</span>' +
            '<span>' + esc(tr(c.location)) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="contact-side">' +
          '<a class="wax-link" href="mailto:' + esc(c.email) + '">' +
            '<span class="wax">' + esc(D.meta.crest || 'CJ') + '</span>' +
            '<span class="wax-hint">' + esc(tr(D.ui.contact.sealHint)) + '</span>' +
          '</a>' +
          '<div class="contact-social">' +
            '<span class="contact-socials-label">' + esc(tr(D.ui.contact.socials)) + '</span>' +
            social +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderFooter() {
    var y = new Date().getFullYear();
    $('#f-brand').textContent = D.meta.name;
    $('#f-motto').textContent = D.meta.mottoLatin + ' · ' + tr(D.meta.motto);
    $('#f-status').textContent = tr(D.ui.footer.status);
    $('#f-made').textContent = tr(D.ui.footer.madeBy);
    $('#f-copy').textContent = '© ' + y + ' · ' + tr(D.meta.footerNote);
  }

  /* ============ 语言切换 ============ */
  function applyLang() {
    document.documentElement.lang = lang;
    document.title = tr(D.meta.siteTitle);

    var t = $('#lang-toggle');
    t.textContent = lang === 'en' ? '中文' : 'EN';
    t.setAttribute('aria-label', lang === 'en' ? 'Switch to Chinese' : 'Switch to English');

    renderSeal();
    renderBrand();
    renderNav();
    renderHero();
    renderTicker();
    renderHeadings();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    renderContact();
    renderFooter();
    updateSpy();
    typeTagline();
    observeReveals();
  }

  $('#lang-toggle').addEventListener('click', function () {
    lang = lang === 'en' ? 'zh' : 'en';
    try { localStorage.setItem('pw_lang', lang); } catch (e) {}
    applyLang();
  });

  /* ============ 打字机（序章标语） ============ */
  function typeTagline() {
    if (!ready) return;
    var el = $('#hero-tagline .type');
    if (!el) return;
    var text = tr(D.hero.tagline);
    if (typeTimer) { clearInterval(typeTimer); typeTimer = null; }
    if (reduceMotion || CAPTURE) { el.textContent = text; return; }
    el.textContent = '';
    var i = 0;
    typeTimer = setInterval(function () {
      el.textContent = text.slice(0, ++i);
      if (i >= text.length) { clearInterval(typeTimer); typeTimer = null; }
    }, 24);
  }

  /* ============ 滚动显现 ============ */
  function observeReveals() {
    var els = $$('.reveal');
    if (CAPTURE) {
      els.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('in-view');
            revealObserver.unobserve(en.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    }
    els.forEach(function (el) {
      if (!el.classList.contains('in-view')) revealObserver.observe(el);
    });
  }

  /* ============ 滚动进度 / 导航高亮 / 回到顶部 ============ */
  var progressEl = $('#scroll-progress');
  var toTop = $('#to-top');

  function updateSpy() {
    var links = $$('#nav a[data-nav]');
    if (!links.length) return;
    var y = window.scrollY + (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 76) + 90;
    var current = '';
    D.ui.nav.forEach(function (item) {
      var sec = document.getElementById(item.id);
      if (!sec) return;
      var top = sec.getBoundingClientRect().top + window.scrollY;
      if (top <= y) current = item.id;
    });
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === current);
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      if (progressEl) progressEl.style.transform = 'scaleX(' + Math.min(1, Math.max(0, p)) + ')';
      if (toTop) toTop.classList.toggle('show', window.scrollY > 620);
      updateSpy();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    if (revealObserver) { /* no-op */ }
    onScroll();
  });

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ============ 启封动画 ============ */
  var sealSeen = false;
  try { sealSeen = sessionStorage.getItem('pw_seal_seen') === '1'; } catch (e) {}

  function dismissSeal(instant) {
    var overlay = $('#seal-overlay');
    if (!overlay || overlay.classList.contains('done')) return;
    overlay.classList.add('done');
    document.body.classList.remove('sealed');
    try { sessionStorage.setItem('pw_seal_seen', '1'); } catch (e) {}
    ready = true;
    typeTagline();
    observeReveals();
    if (instant) {
      overlay.parentNode && overlay.parentNode.removeChild(overlay);
    } else {
      setTimeout(function () {
        overlay.parentNode && overlay.parentNode.removeChild(overlay);
      }, 800);
    }
  }

  function initSeal() {
    var overlay = $('#seal-overlay');
    if (!overlay) { ready = true; typeTagline(); observeReveals(); return; }

    if (reduceMotion || sealSeen || CAPTURE) {
      dismissSeal(true);
      return;
    }

    document.body.classList.add('sealed');
    var timer = setTimeout(function () { dismissSeal(false); }, 1500);

    overlay.addEventListener('click', function () {
      clearTimeout(timer);
      dismissSeal(false);
    });

    function onKey(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        clearTimeout(timer);
        dismissSeal(false);
        document.removeEventListener('keydown', onKey);
      }
    }
    document.addEventListener('keydown', onKey);
  }

  /* ============ 初始化 ============ */
  function captureScroll() {
    if (!CAPTURE) return;
    var at = '';
    try { at = new URLSearchParams(window.location.search).get('at') || ''; } catch (e) {}
    if (!at) return;
    var el = document.getElementById(at);
    if (el) {
      setTimeout(function () {
        el.scrollIntoView({ block: 'start', behavior: 'auto' });
      }, 60);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (CAPTURE) {
      document.documentElement.classList.add('capture');
      document.body.classList.add('capture');
    }
    applyLang();
    initSeal();
    onScroll();
    captureScroll();
  });
})();
