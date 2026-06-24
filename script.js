// Add loaded class to body to trigger entrance animations
document.body.classList.add('loaded');

// Dynamic card hover glow spotlight tracking
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const glowCards = document.querySelectorAll('.project-card, .info-card, .philosophy-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

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
      const isBtn = el.classList.contains('btn');
      cursorDot.style.width = isBtn ? '42px' : '34px';
      cursorDot.style.height = isBtn ? '42px' : '34px';
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
let scrollDelta = 0;
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

  // Scroll tilt entrance updates (optimized to run only when scrolling changes)
  if (!prefersReducedMotion) {
    applyScrollTilt(projectCards, 8);
    applyScrollTilt(infoCards, 10);
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  scrollDelta += currentScroll - lastScrollY;
  lastScrollY = currentScroll;

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

// ============================================
// MAGNETIC BUTTONS
// ============================================
const magneticBtns = document.querySelectorAll('.btn');
if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.setProperty('--x', `${x * 0.35}px`);
      btn.style.setProperty('--y', `${y * 0.35}px`);
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.setProperty('--x', '0px');
      btn.style.setProperty('--y', '0px');
    });
  });
}

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

// Run initial tilt positioning once on page load
if (!prefersReducedMotion) {
  applyScrollTilt(projectCards, 8);
  applyScrollTilt(infoCards, 10);
}

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
// STAGGERED SCROLL-REVEAL OBSERVER
// ============================================
const revealTargets = document.querySelectorAll('.reveal-el');

const scrollRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      scrollRevealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => scrollRevealObserver.observe(el));

// ============================================
// SPACE STARFIELD PARALLAX & TWINKLE
// ============================================
(function() {
  const canvas = document.getElementById('space-starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars = [];
  const starCount = 120;
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  // Curated color palette for stars matching the site aesthetics (pure white, soft amber, light blue)
  const colors = ['#ffffff', '#fff4e0', '#e0f7fc', '#ffb454', '#5ec8d8'];

  class Star {
    constructor() {
      this.reset();
      // Distribute stars initially across the entire screen
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -10; // Start slightly offscreen top when recycled
      this.size = Math.random() * 1.5 + 0.3; // sizes: 0.3px to 1.8px
      this.depth = Math.random(); // depth 0 (far) to 1 (close)
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.4 + 0.2; // base opacity
      this.twinkleSpeed = Math.random() * 0.015 + 0.005;
      this.twinklePhase = Math.random() * Math.PI * 2;
    }

    update(scrollDelta) {
      // Ambient slow upward drift (space floating feel)
      let speed = -0.05 * this.depth;
      
      // Scroll-linked parallax drift
      speed -= scrollDelta * this.depth * 0.35;
      
      this.y += speed;

      // Wrap stars around vertically when they leave the viewport
      if (this.y < -30) {
        this.y = height + 30;
        this.x = Math.random() * width;
      } else if (this.y > height + 30) {
        this.y = -30;
        this.x = Math.random() * width;
      }

      // Twinkle pulsation
      this.twinklePhase += this.twinkleSpeed;
    }

    draw(velocity) {
      const currentAlpha = Math.max(0.1, Math.min(1, this.alpha + Math.sin(this.twinklePhase) * 0.12));
      ctx.fillStyle = this.color;
      ctx.globalAlpha = currentAlpha;

      // Warp/stretch factor based on scroll velocity & depth
      const stretch = velocity * this.depth * 0.25;

      if (Math.abs(stretch) > 1.0) {
        // Draw star as a travel streak/line when scrolling fast
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + stretch);
        ctx.stroke();
      } else {
        // Draw star as a clean pixel circle when stationary or moving slowly
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  class Meteoroid {
    constructor() {
      this.reset();
      this.active = false;
      this.spawnTimer = Math.random() * 240 + 30;
    }

    reset() {
      this.x = Math.random() * (width * 1.5) - (width * 0.25);
      this.y = -60;
      this.length = Math.random() * 60 + 40;
      this.speed = Math.random() * 9 + 6;
      this.dx = -this.speed * 0.8;
      this.dy = this.speed * 0.6;
      this.size = Math.random() * 1.2 + 0.6;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.active = true;
    }

    update(scrollDelta) {
      if (!this.active) {
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
          this.reset();
        }
        return;
      }

      this.x += this.dx;
      this.y += this.dy + scrollDelta * 0.4;

      if (this.x < -100 || this.y > height + 100 || this.x > width + 100) {
        this.active = false;
        this.spawnTimer = Math.random() * 300 + 150;
      }
    }

    draw() {
      if (!this.active) return;

      const multiplier = this.length / this.speed;
      const grad = ctx.createLinearGradient(
        this.x, this.y,
        this.x - this.dx * multiplier, this.y - this.dy * multiplier
      );
      grad.addColorStop(0, this.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = this.size;
      ctx.lineCap = 'round';
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.dx * multiplier, this.y - this.dy * multiplier);
      ctx.stroke();
    }
  }

  class Planet {
    constructor(initial = false) {
      this.active = false;
      this.spawnTimer = initial ? 0 : Math.random() * 200 + 50;
      this.radius = Math.random() * 6 + 5; // radius: 5px to 11px
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.35 + 0.4;
      
      this.vx = Math.random() * 0.16 - 0.08;
      this.vy = Math.random() * 0.06 - 0.03;
      
      if (initial) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.active = true;
      } else {
        this.reset();
      }
    }

    reset() {
      if (Math.random() > 0.5) {
        this.x = width + 50;
        this.y = Math.random() * height;
      } else {
        this.x = Math.random() * width;
        this.y = -50;
      }
      this.radius = Math.random() * 6 + 5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.35 + 0.4;
      this.vx = Math.random() * 0.16 - 0.08;
      this.vy = Math.random() * 0.06 - 0.03;
      this.active = true;
    }

    update(scrollDelta) {
      if (!this.active) {
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
          this.reset();
        }
        return;
      }

      this.x += this.vx;
      this.y += this.vy + scrollDelta * 0.15;

      if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) {
        this.active = false;
        this.spawnTimer = Math.random() * 250 + 100;
      }
    }

    draw() {
      if (!this.active) return;
      ctx.save();
      ctx.globalAlpha = this.opacity;
      
      const grad = ctx.createRadialGradient(
        this.x - this.radius * 0.25, this.y - this.radius * 0.25, this.radius * 0.05,
        this.x, this.y, this.radius
      );
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, this.color);
      grad.addColorStop(1, '#000000');
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }
  }

  class ExplosionParticle {
    constructor(x, y, vx, vy, color) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.color = color;
      this.size = Math.random() * 2.2 + 1.0;
      this.alpha = 1.0;
      this.decay = Math.random() * 0.016 + 0.01;
      this.life = 70;
    }

    update(scrollDelta) {
      this.vy += 0.03; // gravity physics
      this.vx *= 0.98; // air resistance friction
      this.vy *= 0.98;
      this.x += this.vx;
      this.y += this.vy + scrollDelta * 0.25;
      this.alpha -= this.decay;
      this.life--;
    }

    draw() {
      if (this.alpha <= 0 || this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 4;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class ExplosionRing {
    constructor(x, y, startRadius, color) {
      this.x = x;
      this.y = y;
      this.radius = startRadius;
      this.maxRadius = startRadius * 3.5;
      this.color = color;
      this.alpha = 0.8;
      this.decay = 0.025;
    }

    update(scrollDelta) {
      this.radius += (this.maxRadius - this.radius) * 0.08 + 0.4;
      this.y += scrollDelta * 0.25;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  // Populate starfield
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }

  // Populate planets pool
  let planets = [new Planet(true), new Planet(true), new Planet(true)];

  // Populate meteoroids pool (increased to 6 for highly active scene)
  let meteoroids = [];
  for (let i = 0; i < 6; i++) {
    meteoroids.push(new Meteoroid());
  }

  // Explosion particle pools
  let explosionParticles = [];
  let explosionRings = [];

  // Sun rendering details
  let sunTime = 0;
  function drawSun(time) {
    const sunX = width * 0.88;
    const sunY = 120;
    const baseRadius = 35;
    const pulseRadius = baseRadius + Math.sin(time * 0.02) * 5;
    const outerRadius = pulseRadius * 2.8;

    ctx.save();
    const grad = ctx.createRadialGradient(sunX, sunY, pulseRadius * 0.2, sunX, sunY, outerRadius);
    grad.addColorStop(0, '#ffffff'); // sun core
    grad.addColorStop(0.12, '#fff4e0');
    grad.addColorStop(0.3, 'rgba(255, 180, 84, 0.45)'); // sun corona glow
    grad.addColorStop(0.55, 'rgba(255, 180, 84, 0.15)');
    grad.addColorStop(1, 'rgba(255, 180, 84, 0)');

    ctx.beginPath();
    ctx.arc(sunX, sunY, outerRadius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  // Handle window resizing
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => star.draw(0));
    }
  }, { passive: true });

  if (prefersReducedMotion) {
    // Render static stars once for accessibility and return without loop
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => star.draw(0));
    return;
  }

  let scrollVel = 0;

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const delta = scrollDelta;
    scrollDelta = 0;

    // Smooth out scroll velocity using interpolation (decay)
    scrollVel = scrollVel * 0.88 + delta * 0.12;

    // 1. Draw Background Sun
    drawSun(sunTime);
    sunTime++;

    // 2. Update and draw stars
    stars.forEach(star => {
      star.update(delta);
      star.draw(scrollVel);
    });

    // 3. Update and draw planets
    planets.forEach(p => {
      p.update(delta);
      p.draw();
    });

    // 4. Update and draw meteoroids
    meteoroids.forEach(m => {
      m.update(delta);
      m.draw();
    });

    // 5. Collision checks between meteoroids and planets
    meteoroids.forEach(m => {
      if (!m.active) return;
      planets.forEach(p => {
        if (!p.active) return;
        
        const dist = Math.hypot(m.x - p.x, m.y - p.y);
        if (dist < p.radius + 15) {
          // Trigger collision deactivation
          m.active = false;
          m.spawnTimer = Math.random() * 250 + 100;
          
          p.active = false;
          p.spawnTimer = Math.random() * 350 + 200;
          
          // Generate blast ember particles
          const embersCount = 20 + Math.floor(Math.random() * 10);
          for (let i = 0; i < embersCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3.5 + 1.2;
            explosionParticles.push(new ExplosionParticle(
              p.x, p.y,
              Math.cos(angle) * speed,
              Math.sin(angle) * speed,
              p.color
            ));
          }
          
          // Generate blast shockwave ring
          explosionRings.push(new ExplosionRing(p.x, p.y, p.radius, p.color));
        }
      });
    });

    // 6. Update and draw blast explosions
    explosionParticles = explosionParticles.filter(ep => {
      ep.update(delta);
      ep.draw();
      return ep.life > 0 && ep.alpha > 0;
    });

    explosionRings = explosionRings.filter(er => {
      er.update(delta);
      er.draw();
      return er.alpha > 0;
    });

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();
