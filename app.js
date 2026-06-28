/* ============================================================
   PartyFirst™ — app.js
   ============================================================ */

// ── Router ──────────────────────────────────────────────────

const HOME_SUB_HASHES = ['platform', 'security', 'roadmap', 'pricing', 'rsvp'];

const HASH_TO_PAGE = {
  '':                                  'home',
  'home':                              'home',
  'about':                             'about',
  'product':                           'product',
  'blog':                              'blog',
  'blog/open-bars-new-api':            'blog-open-bars-new-api',
  'blog/10-reasons-dj':                'blog-10-reasons-dj',
  'blog/47-conferences-zero-features': 'blog-47-conferences-zero-features',
  'developers':                        'developers',
  'drink-menu':                        'drink-menu',
};

function getHashValue() {
  return window.location.hash.replace(/^#/, '');
}

function navigate() {
  const raw = getHashValue();

  // Home-sub anchor (platform, security, roadmap, pricing, rsvp)
  let scrollTo = null;
  let pageKey = raw;

  if (HOME_SUB_HASHES.includes(raw)) {
    pageKey = 'home';
    scrollTo = raw;
  }

  const pageId = HASH_TO_PAGE[pageKey];

  if (!pageId) {
    showPage('home');
    window.scrollTo(0, 0);
    return;
  }

  showPage(pageId);

  if (scrollTo) {
    // Small delay so the page is visible before scrolling
    setTimeout(() => {
      const el = document.getElementById(scrollTo);
      if (el) {
        const navH = document.getElementById('main-nav').offsetHeight;
        const top = el.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  } else {
    window.scrollTo(0, 0);
  }

  closeMobileMenu();
  updateActiveNavLinks(pageKey || 'home');
  initReveal();
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');
}

function updateActiveNavLinks(pageKey) {
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href').replace(/^#/, '');
    if (href === pageKey || (pageKey === 'home' && HOME_SUB_HASHES.includes(href))) {
      // don't mark sub-anchors active permanently — just the main nav items
    }
    if (href === pageKey) a.classList.add('active');
  });
}

window.addEventListener('hashchange', navigate);
document.addEventListener('DOMContentLoaded', navigate);


// ── Mobile menu ──────────────────────────────────────────────

const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  hamburger.textContent = isOpen ? '✕' : '☰';
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.textContent = '☰';
  hamburger.setAttribute('aria-expanded', 'false');
}

// Close on outside click
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobileMenu();
  }
});


// ── Developer Hub Tabs ───────────────────────────────────────

document.querySelectorAll('#dev-tab-nav .tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;

    // Deactivate all
    document.querySelectorAll('#dev-tab-nav .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    // Activate clicked
    btn.classList.add('active');
    const panel = document.getElementById('tab-' + tabId);
    if (panel) panel.classList.add('active');
  });
});


// ── RSVP Form ────────────────────────────────────────────────

const rsvpForm = document.getElementById('rsvp-form');
const rsvpFormWrap = document.getElementById('rsvp-form-wrap');
const rsvpSuccess = document.getElementById('rsvp-success');
const rsvpSuccessMsg = document.getElementById('rsvp-success-msg');
const rsvpSuccessEmail = document.getElementById('rsvp-success-email');

rsvpForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('rsvp-email').value;
  const title = document.getElementById('rsvp-title').value || 'valued enterprise stakeholder';

  rsvpSuccessMsg.innerHTML = `Thank you, <strong>${escapeHtml(title)}</strong>. Your invitation request has been routed to our Chief Party Officer for review.`;
  rsvpSuccessEmail.textContent = `Confirmation sent to ${email}. Check your spam folder — our domain was flagged for sending too many "Re: Party" emails.`;

  rsvpFormWrap.classList.add('hidden');
  rsvpSuccess.classList.remove('hidden');
});


// ── Newsletter Form ───────────────────────────────────────────

const newsletterForm = document.getElementById('newsletter-form');
const newsletterFormWrap = document.getElementById('newsletter-form-wrap');
const newsletterSuccess = document.getElementById('newsletter-success');

newsletterForm.addEventListener('submit', e => {
  e.preventDefault();
  newsletterFormWrap.classList.add('hidden');
  newsletterSuccess.classList.remove('hidden');
});


// ── Scroll-reveal (IntersectionObserver) ─────────────────────

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

function initReveal() {
  // Observe all .reveal elements in the now-active page
  const activePage = document.querySelector('.page.active');
  if (!activePage) return;
  activePage.querySelectorAll('.reveal').forEach(el => {
    if (!el.classList.contains('visible')) {
      revealObserver.observe(el);
    }
  });
}


// ── Utility ──────────────────────────────────────────────────

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
