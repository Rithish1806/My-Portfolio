// ============================================
// CURSOR DOT
// ============================================
const cursorDot = document.getElementById('cursorDot');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.width = '34px';
      cursorDot.style.height = '34px';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.width = '18px';
      cursorDot.style.height = '18px';
    });
  });
}

// ============================================
// TERMINAL BOOT TYPING EFFECT
// ============================================
const typedEl = document.getElementById('typedLine');
const lines = [
  'whoami',
  './run_portfolio.sh --user=rithish'
];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeSequence() {
  if (prefersReducedMotion) {
    typedEl.textContent = 'whoami';
    return;
  }
  let lineIndex = 0;
  let charIndex = 0;

  function typeChar() {
    const current = lines[lineIndex];
    if (charIndex <= current.length) {
      typedEl.textContent = current.slice(0, charIndex);
      charIndex++;
      setTimeout(typeChar, 55);
    } else {
      setTimeout(() => {
        if (lineIndex < lines.length - 1) {
          lineIndex++;
          charIndex = 0;
          typedEl.textContent = '';
          setTimeout(typeChar, 300);
        }
      }, 900);
    }
  }
  typeChar();
}
typeSequence();

// ============================================
// NAV SCROLL STYLE
// ============================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.borderBottomColor = 'rgba(255,180,84,0.15)';
  } else {
    nav.style.borderBottomColor = 'var(--line)';
  }
}, { passive: true });

// ============================================
// HERO 3D FLOATING CARDS — mouse parallax
// ============================================
const heroLayer = document.getElementById('heroLayer');
const floatCards = document.querySelectorAll('.float-card');

if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    floatCards.forEach(card => {
      const depth = parseFloat(card.dataset.depth) || 0.5;
      const moveX = x * 24 * depth;
      const moveY = y * 24 * depth;
      const rotateX = -y * 6 * depth;
      const rotateY = x * 6 * depth;
      card.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  });
}

// ============================================
// SCROLL-DRIVEN PARALLAX (depth layers)
// ============================================
let lastScrollY = window.scrollY;
let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY;
  const heroHeight = window.innerHeight;
  const heroProgress = Math.min(scrollY / heroHeight, 1);

  // Hero cards drift and fade on scroll, layered by depth
  floatCards.forEach(card => {
    const depth = parseFloat(card.dataset.depth) || 0.5;
    const driftY = heroProgress * 120 * depth;
    card.style.opacity = String(1 - heroProgress * 1.3);
    card.style.setProperty('--scroll-drift', `${driftY}px`);
  });

  if (heroLayer) {
    heroLayer.style.transform = `translateY(${scrollY * 0.25}px)`;
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });

// ============================================
// PROJECT CARD 3D TILT (on scroll position + hover)
// ============================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  }
});

// Scroll-linked tilt entrance for project cards & info cards
function applyScrollTilt(elements, maxRotate = 10) {
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    const center = rect.top + rect.height / 2;
    const distFromCenter = (center - windowH / 2) / (windowH / 2); // -1 to 1
    const clamped = Math.max(-1, Math.min(1, distFromCenter));
    if (!el.matches(':hover')) {
      const depth = parseFloat(el.dataset.depth) || 0.5;
      const rotate = clamped * maxRotate * depth;
      const translateY = clamped * 18 * depth;
      el.style.transform = `rotateX(${rotate}deg) translateY(${translateY}px)`;
    }
  });
}

const infoCards = document.querySelectorAll('.info-card');

function scrollTiltLoop() {
  if (!prefersReducedMotion) {
    applyScrollTilt(projectCards, 8);
    applyScrollTilt(infoCards, 10);
  }
  requestAnimationFrame(scrollTiltLoop);
}
requestAnimationFrame(scrollTiltLoop);

// ============================================
// INTERSECTION OBSERVER — reveal + counters + bars
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.bar-fill').forEach(el => revealObserver.observe(el));

// Animated counter for LeetCode stat
const counterEl = document.querySelector('.practice-num');
let counterStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counterStarted) {
      counterStarted = true;
      const target = parseInt(counterEl.dataset.target, 10);
      const duration = prefersReducedMotion ? 0 : 1400;
      const start = performance.now();

      function tick(now) {
        const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counterEl.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else counterEl.textContent = target;
      }
      requestAnimationFrame(tick);
    }
  });
}, { threshold: 0.5 });

if (counterEl) counterObserver.observe(counterEl);

// ============================================
// FADE-IN ON SCROLL for general sections
// ============================================
const fadeTargets = document.querySelectorAll(
  '.about-text, .stack-col, .philosophy-card, .project-card, .info-card'
);

fadeTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.classList.add('revealed');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeTargets.forEach(el => fadeObserver.observe(el));
