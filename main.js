// ============= Typing effect =============
const typedEl = document.getElementById('typed');
const phrases = [
  'القلوب',
  'حياة الناس',
  'مستقبل الأعمال',
  'تجربة المستخدم',
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeLoop() {
  if (!typedEl) return;
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 60 : 110;
  if (!isDeleting && charIdx === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

// ============= Navbar scroll =============
const navbar = document.getElementById('mainNav');
function onScroll() {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============= Smooth-close mobile nav on link click =============
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const collapseEl = document.getElementById('navMenu');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (collapseEl.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, { toggle: false });
      bsCollapse.hide();
    }
  });
});

// ============= Reveal on scroll =============
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ============= Skill bar animation =============
const skillBars = document.querySelectorAll('.bar-fill');
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const pct = entry.target.getAttribute('data-pct') || '0';
        entry.target.style.width = pct + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
skillBars.forEach((bar) => skillObserver.observe(bar));

// ============= Stat counter =============
const stats = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count') || '0', 10);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toString();
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
stats.forEach((stat) => statObserver.observe(stat));

// ============= Contact form =============
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formStatus.style.color = '#f87171';
      formStatus.textContent = 'الرجاء تعبئة جميع الحقول.';
      return;
    }
    formStatus.style.color = '#34d399';
    formStatus.textContent = `شكراً ${name}! تم استلام رسالتك. سأتواصل معك قريباً.`;
    form.reset();
    setTimeout(() => (formStatus.textContent = ''), 5000);
  });
}

// ============= Footer year =============
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
