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
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const colors = ['#ffffff', '#fff4e0', '#e0f7fc', '#ffb454', '#5ec8d8'];

  // Sun coordinates and size
  let sunX = width * 0.85;
  let sunY = height * 0.35;
  const sunRadius = 42;
  let sunTime = 0;

  function updateSunPosition() {
    if (width < 760) {
      sunX = width * 0.5;
      sunY = 180;
    } else {
      sunX = width * 0.85;
      sunY = 220;
    }
  }
  updateSunPosition();

  // Warp speed variables
  let warpActive = false;
  let warpTimer = 0;

  window.addEventListener('triggerWarpSpeed', () => {
    warpActive = true;
    warpTimer = 75; // duration of warp in frames (1.25s)
  });

  // Classes
  class Star {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -10;
      this.size = Math.random() * 1.5 + 0.3;
      this.depth = Math.random();
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.4 + 0.2;
      this.twinkleSpeed = Math.random() * 0.015 + 0.005;
      this.twinklePhase = Math.random() * Math.PI * 2;
    }

    update(scrollDelta) {
      let speed = -0.05 * this.depth;
      speed -= scrollDelta * this.depth * 0.35;
      this.y += speed;

      if (this.y < -30) {
        this.y = height + 30;
        this.x = Math.random() * width;
      } else if (this.y > height + 30) {
        this.y = -30;
        this.x = Math.random() * width;
      }

      this.twinklePhase += this.twinkleSpeed;
    }

    draw(velocity, factor = 1.0) {
      const currentAlpha = Math.max(0.1, Math.min(1, this.alpha + Math.sin(this.twinklePhase) * 0.12));
      ctx.fillStyle = this.color;
      ctx.globalAlpha = currentAlpha;

      const stretch = velocity * this.depth * 0.25 * factor;

      if (Math.abs(stretch) > 1.0) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size * (factor > 1.5 ? 1.4 : 1.0);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + stretch);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  class SolarWindParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.8 + 0.6;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 1.5 + 0.5;
      this.color = '#ff9639';
      this.alpha = 0.8;
      this.decay = Math.random() * 0.018 + 0.007;
      this.active = true;
    }

    update(scrollDelta) {
      this.x += this.vx;
      this.y += this.vy + scrollDelta * 0.15;
      this.alpha -= this.decay;
      if (this.alpha <= 0) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active) return;
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class Meteoroid {
    constructor() {
      this.reset();
      this.active = false;
      this.spawnTimer = Math.random() * 180 + 30;
      this.isPlayerSpawned = false;
      this.isGiantComet = false;
    }

    reset() {
      this.x = Math.random() * (width * 1.5) - (width * 0.25);
      this.y = -60;
      this.baseX = this.x;
      this.baseY = this.y;
      this.length = Math.random() * 60 + 40;
      this.speed = Math.random() * 7 + 5;
      this.dx = -this.speed * 0.8;
      this.dy = this.speed * 0.6;
      this.size = Math.random() * 2.0 + 1.0;
      this.isPlayerSpawned = false;
      this.isGiantComet = false;
      
      this.isWavy = Math.random() < 0.25;
      if (this.isWavy) {
        this.color = '#5ec8d8';
        this.waveFreq = Math.random() * 0.15 + 0.08;
        this.waveAmp = Math.random() * 15 + 8;
        this.wavePhase = Math.random() * Math.PI * 2;
      } else {
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      const angle = Math.atan2(this.dy, this.dx);
      this.perpX = -Math.sin(angle);
      this.perpY = Math.cos(angle);
      
      this.active = true;
    }

    update(scrollDelta) {
      if (!this.active) {
        if (!this.isPlayerSpawned) {
          this.spawnTimer--;
          if (this.spawnTimer <= 0) {
            this.reset();
          }
        }
        return;
      }

      this.baseX += this.dx;
      this.baseY += this.dy + scrollDelta * 0.4;
      
      if (this.isWavy) {
        this.wavePhase += this.waveFreq;
        this.x = this.baseX + this.perpX * Math.sin(this.wavePhase) * this.waveAmp;
        this.y = this.baseY + this.perpY * Math.sin(this.wavePhase) * this.waveAmp;
      } else {
        this.x = this.baseX;
        this.y = this.baseY;
      }

      if (this.isPlayerSpawned && this.targetX !== undefined) {
        const distToTarget = Math.hypot(this.x - this.targetX, this.y - this.targetY);
        const distPrev = Math.hypot((this.x - this.dx) - this.targetX, (this.y - this.dy) - this.targetY);
        if (distToTarget < 15 || distToTarget > distPrev) {
          this.active = false;
          triggerExplosion(this.targetX, this.targetY, 4, this.color, false);
          return;
        }
      }

      if (Math.random() > 0.35) {
        plasmaTrailParticles.push(new PlasmaTrailParticle(this.x, this.y, this.color, this.size * 0.8));
      }

      if (this.baseX < -150 || this.baseY > height + 150 || this.baseX > width + 150) {
        this.active = false;
        if (!this.isPlayerSpawned) {
          this.spawnTimer = Math.random() * 240 + 120;
        }
      }
    }

    draw() {
      if (!this.active) return;

      const multiplier = this.length / this.speed;
      let prevX, prevY;
      
      if (this.isWavy) {
        const prevPhase = this.wavePhase - this.waveFreq * 3;
        prevX = (this.baseX - this.dx * 3) + this.perpX * Math.sin(prevPhase) * this.waveAmp;
        prevY = (this.baseY - this.dy * 3) + this.perpY * Math.sin(prevPhase) * this.waveAmp;
      } else {
        prevX = this.x - this.dx * multiplier;
        prevY = this.y - this.dy * multiplier;
      }

      const grad = ctx.createLinearGradient(this.x, this.y, prevX, prevY);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.2, this.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = this.size;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(prevX, prevY);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      
      ctx.restore();
    }
  }

  class SwirlInParticle {
    constructor(startX, startY, targetX, targetY, color) {
      this.x = startX;
      this.y = startY;
      this.targetX = targetX;
      this.targetY = targetY;
      this.color = color;
      
      this.angle = Math.atan2(startY - targetY, startX - targetX);
      this.distance = Math.hypot(startX - targetX, startY - targetY);
      this.speed = Math.random() * 1.6 + 1.2;
      this.size = Math.random() * 1.2 + 0.6;
      this.alpha = 0.8;
      this.active = true;
    }

    update() {
      this.distance -= this.speed;
      this.angle += 0.055;
      
      this.x = this.targetX + Math.cos(this.angle) * this.distance;
      this.y = this.targetY + Math.sin(this.angle) * this.distance;
      
      if (this.distance <= 2) {
        this.active = false;
      }
      this.alpha = Math.max(0.1, this.distance / 80);
    }

    draw() {
      if (!this.active) return;
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class DebrisFragment {
    constructor(x, y, vx, vy, color) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.color = color;
      
      this.radius = Math.random() * 3 + 1.5;
      this.angle = Math.random() * Math.PI * 2;
      this.spinSpeed = (Math.random() - 0.5) * 0.15;
      this.alpha = 1.0;
      this.decay = Math.random() * 0.012 + 0.007;
      
      this.points = [];
      const numPoints = 5 + Math.floor(Math.random() * 3);
      for (let i = 0; i < numPoints; i++) {
        const a = (i / numPoints) * Math.PI * 2;
        const offset = Math.random() * 0.4 + 0.6;
        this.points.push({
          x: Math.cos(a) * offset,
          y: Math.sin(a) * offset
        });
      }
      this.active = true;
    }

    update(scrollDelta) {
      this.vx *= 0.982;
      this.vy *= 0.982;
      this.x += this.vx;
      this.y += this.vy + scrollDelta * 0.15;
      this.angle += this.spinSpeed;
      this.alpha -= this.decay;
      
      if (this.alpha <= 0) {
        this.active = false;
      }
      
      if (Math.random() > 0.4) {
        plasmaTrailParticles.push(new PlasmaTrailParticle(this.x, this.y, this.color, this.radius * 0.45));
      }
    }

    draw() {
      if (!this.active) return;
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      
      ctx.fillStyle = this.color;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.5;
      
      ctx.beginPath();
      ctx.moveTo(this.points[0].x * this.radius, this.points[0].y * this.radius);
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x * this.radius, this.points[i].y * this.radius);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }

  class GasCloud {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = 12;
      this.maxRadius = Math.random() * 45 + 35;
      this.alpha = 0.6;
      this.decay = Math.random() * 0.009 + 0.006;
      this.active = true;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
    }

    update(scrollDelta) {
      this.x += this.vx;
      this.y += this.vy + scrollDelta * 0.15;
      this.radius += (this.maxRadius - this.radius) * 0.035;
      this.alpha -= this.decay;
      if (this.alpha <= 0) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active) return;
      ctx.save();
      const grad = ctx.createRadialGradient(this.x, this.y, this.radius * 0.1, this.x, this.y, this.radius);
      grad.addColorStop(0, this.color);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }
  }

  class Planet {
    constructor(typeIndex, initial = false) {
      this.typeIndex = typeIndex;
      this.active = true;
      this.state = 'normal';
      
      this.angle = initial ? Math.random() * Math.PI * 2 : 0;
      this.respawnTimer = 0;
      this.collisionTarget = null;
      this.collisionSpeed = 0;
      
      this.initOrbit();
    }

    initOrbit() {
      const orbitScales = [
        { a: 160, b: 65, r: 9, speed: 0.006, name: 'Vulcan' },
        { a: 280, b: 110, r: 16, speed: 0.003, name: 'Tiamat' },
        { a: 420, b: 160, r: 13, speed: 0.0016, name: 'Zephyr' },
        { a: 560, b: 210, r: 15, speed: 0.0009, name: 'Aether' }
      ];
      
      const config = orbitScales[this.typeIndex];
      this.baseA = config.a;
      this.baseB = config.b;
      this.a = this.baseA;
      this.b = this.baseB;
      this.radius = config.r;
      this.speed = config.speed;
      this.name = config.name;
      
      const tilts = [0.15, -0.22, 0.08, -0.12];
      this.orbitRotate = tilts[this.typeIndex];
      
      this.x = 0;
      this.y = 0;
      this.updatePosition();
    }

    updatePosition() {
      if (this.state === 'normal') {
        const cosRot = Math.cos(this.orbitRotate);
        const sinRot = Math.sin(this.orbitRotate);
        const ex = this.a * Math.cos(this.angle);
        const ey = this.b * Math.sin(this.angle);
        
        this.x = sunX + ex * cosRot - ey * sinRot;
        this.y = sunY + ex * sinRot + ey * cosRot;
      }
    }

    decayOrbit() {
      this.a *= 0.987;
      this.b *= 0.987;
      this.angle += this.speed * 1.4;
      
      const cosRot = Math.cos(this.orbitRotate);
      const sinRot = Math.sin(this.orbitRotate);
      const ex = this.a * Math.cos(this.angle);
      const ey = this.b * Math.sin(this.angle);
      
      this.x = sunX + ex * cosRot - ey * sinRot;
      this.y = sunY + ex * sinRot + ey * cosRot;
      
      if (Math.random() > 0.3) {
        plasmaTrailParticles.push(new PlasmaTrailParticle(this.x, this.y, '#ff781e', this.radius * 0.15));
      }
    }

    moveToCollision() {
      if (!this.collisionTarget) return;
      
      const dx = this.collisionTarget.x - this.x;
      const dy = this.collisionTarget.y - this.y;
      const dist = Math.hypot(dx, dy);
      
      this.collisionSpeed += 0.14;
      this.x += (dx / dist) * this.collisionSpeed;
      this.y += (dy / dist) * this.collisionSpeed;
      
      if (Math.random() > 0.4) {
        plasmaTrailParticles.push(new PlasmaTrailParticle(this.x, this.y, '#e0f7fc', this.radius * 0.2));
      }
    }

    destroy() {
      this.state = 'destroyed';
      this.active = false;
      this.respawnTimer = 240;
    }

    update(scrollDelta) {
      if (this.state === 'destroyed') {
        this.respawnTimer--;
        if (this.respawnTimer <= 0) {
          this.state = 'respawning';
          this.respawnTimer = 180;
        }
        return;
      }

      if (this.state === 'respawning') {
        this.respawnTimer--;
        const targetAngle = this.angle + this.speed;
        this.angle = targetAngle;
        
        const cosRot = Math.cos(this.orbitRotate);
        const sinRot = Math.sin(this.orbitRotate);
        const ex = this.baseA * Math.cos(targetAngle);
        const ey = this.baseB * Math.sin(targetAngle);
        const tx = sunX + ex * cosRot - ey * sinRot;
        const ty = sunY + ex * sinRot + ey * cosRot;
        
        if (this.respawnTimer > 0) {
          if (Math.random() > 0.4) {
            const swirlR = (this.respawnTimer / 180) * 80 + 5;
            const swirlA = Math.random() * Math.PI * 2;
            const px = tx + Math.cos(swirlA) * swirlR;
            const py = ty + Math.sin(swirlA) * swirlR;
            
            chargingParticles.push(new SwirlInParticle(px, py, tx, ty, this.getColor()));
          }
        } else {
          this.initOrbit();
          this.state = 'normal';
          this.active = true;
        }
        return;
      }

      if (this.state === 'normal') {
        this.angle += this.speed;
        this.updatePosition();
      } else if (this.state === 'decaying') {
        this.decayOrbit();
      } else if (this.state === 'colliding') {
        this.moveToCollision();
      }

      this.y += scrollDelta * 0.15;
    }

    getColor() {
      const colors = ['#ff5400', '#ffb454', '#5ec8d8', '#e65ed8'];
      return colors[this.typeIndex];
    }

    draw() {
      if (this.state === 'destroyed' || this.state === 'respawning') return;
      
      const shadowAngle = Math.atan2(this.y - sunY, this.x - sunX);
      
      ctx.save();
      if (this.state === 'decaying') {
        ctx.strokeStyle = 'rgba(255, 84, 84, 0.45)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 8, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      switch (this.typeIndex) {
        case 0:
          this.drawLavaPlanet(shadowAngle);
          break;
        case 1:
          this.drawGasGiant(shadowAngle);
          break;
        case 2:
          this.drawIcePlanet(shadowAngle);
          break;
        case 3:
          this.drawNebulaPlanet(shadowAngle);
          break;
      }
    }

    drawLavaPlanet(shadowAngle) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#220808';
      ctx.fill();
      
      ctx.clip();
      ctx.strokeStyle = '#ff3c00';
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = 3;
      ctx.shadowColor = '#ff3c00';
      
      ctx.beginPath();
      ctx.moveTo(this.x - this.radius, this.y - this.radius/2);
      ctx.bezierCurveTo(this.x - this.radius/3, this.y + this.radius/3, this.x + this.radius/3, this.y - this.radius/3, this.x + this.radius, this.y + this.radius/2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(this.x - this.radius/2, this.y + this.radius);
      ctx.quadraticCurveTo(this.x + this.radius/4, this.y - this.radius/4, this.x + this.radius/2, this.y - this.radius);
      ctx.stroke();
      
      ctx.restore();
      
      this.drawShadow(shadowAngle);
      
      ctx.save();
      const grad = ctx.createRadialGradient(this.x, this.y, this.radius * 0.8, this.x, this.y, this.radius * 1.3);
      grad.addColorStop(0, 'rgba(255, 60, 0, 0.3)');
      grad.addColorStop(1, 'rgba(255, 60, 0, 0)');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }

    drawGasGiant(shadowAngle) {
      const ringAngle = Math.PI / 5;
      
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(ringAngle);
      ctx.strokeStyle = 'rgba(184, 132, 61, 0.35)';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.radius * 2.1, this.radius * 0.35, 0, Math.PI, 0);
      ctx.stroke();
      ctx.restore();
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#b8843d';
      ctx.fill();
      ctx.clip();
      
      ctx.fillStyle = '#7a5421';
      ctx.fillRect(this.x - this.radius, this.y - this.radius * 0.4, this.radius * 2, this.radius * 0.15);
      ctx.fillStyle = '#e3b67d';
      ctx.fillRect(this.x - this.radius, this.y - this.radius * 0.1, this.radius * 2, this.radius * 0.12);
      ctx.fillStyle = '#94662d';
      ctx.fillRect(this.x - this.radius, this.y + this.radius * 0.25, this.radius * 2, this.radius * 0.2);
      ctx.restore();
      
      this.drawShadow(shadowAngle);
      
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(ringAngle);
      ctx.strokeStyle = 'rgba(255, 180, 84, 0.7)';
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#ffb454';
      ctx.beginPath();
      ctx.ellipse(0, 0, this.radius * 2.1, this.radius * 0.35, 0, 0, Math.PI);
      ctx.stroke();
      ctx.restore();
    }

    drawIcePlanet(shadowAngle) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      
      const grad = ctx.createRadialGradient(
        this.x - this.radius * 0.25, this.y - this.radius * 0.25, this.radius * 0.05,
        this.x, this.y, this.radius
      );
      grad.addColorStop(0, '#e0f7fc');
      grad.addColorStop(0.35, '#5ec8d8');
      grad.addColorStop(1, '#1b4f59');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
      
      this.drawShadow(shadowAngle);
      
      ctx.save();
      const glow = ctx.createRadialGradient(this.x, this.y, this.radius * 0.75, this.x, this.y, this.radius * 1.35);
      glow.addColorStop(0, 'rgba(94, 200, 216, 0.45)');
      glow.addColorStop(1, 'rgba(94, 200, 216, 0)');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      ctx.restore();
    }

    drawNebulaPlanet(shadowAngle) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0f051c';
      ctx.fill();
      ctx.restore();
      
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 3; i++) {
        const cloudX = this.x + Math.sin(sunTime * 0.02 + i * 2) * (this.radius * 0.35);
        const cloudY = this.y + Math.cos(sunTime * 0.015 + i * 2) * (this.radius * 0.25);
        const cloudR = this.radius * (0.8 + i * 0.22);
        
        const cloudGrad = ctx.createRadialGradient(cloudX, cloudY, 0, cloudX, cloudY, cloudR);
        cloudGrad.addColorStop(0, i === 0 ? 'rgba(230, 94, 216, 0.35)' : 'rgba(120, 94, 216, 0.22)');
        cloudGrad.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.beginPath();
        ctx.arc(cloudX, cloudY, cloudR, 0, Math.PI * 2);
        ctx.fillStyle = cloudGrad;
        ctx.fill();
      }
      ctx.restore();
      
      this.drawShadow(shadowAngle);
    }

    drawShadow(angle) {
      ctx.save();
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 0.1, 0, Math.PI * 2);
      ctx.clip();
      
      ctx.translate(this.x, this.y);
      ctx.rotate(angle);
      
      ctx.fillStyle = 'rgba(5, 7, 8, 0.7)';
      ctx.beginPath();
      ctx.arc(0, 0, this.radius + 1, -Math.PI / 2, Math.PI / 2);
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
      this.decay = Math.random() * 0.015 + 0.009;
      this.life = 70;
    }

    update(scrollDelta) {
      this.vy += 0.035;
      this.vx *= 0.98;
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
      this.maxRadius = startRadius * 3.8;
      this.color = color;
      this.alpha = 0.8;
      this.decay = 0.022;
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
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  class PlasmaTrailParticle {
    constructor(x, y, color, sizeMultiplier = 1.0) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.color = color;
      this.size = (Math.random() * 1.5 + 0.5) * sizeMultiplier;
      this.alpha = 0.8;
      this.decay = Math.random() * 0.028 + 0.018;
    }

    update(scrollDelta) {
      this.x += this.vx;
      this.y += this.vy + scrollDelta * 0.25;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Camera Shake & Explosions Helper
  let shakeTime = 0;
  let shakeMaxTime = 0;
  let shakeAmount = 0;

  function triggerExplosion(x, y, radius, color, isHeavy = false) {
    const embersCount = isHeavy ? 35 + Math.floor(Math.random() * 15) : 20 + Math.floor(Math.random() * 10);
    for (let i = 0; i < embersCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = isHeavy ? Math.random() * 6.5 + 2.5 : Math.random() * 4.0 + 1.2;
      explosionParticles.push(new ExplosionParticle(
        x, y,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        color
      ));
    }
    
    const fragmentCount = isHeavy ? 10 + Math.floor(Math.random() * 5) : 5 + Math.floor(Math.random() * 3);
    for (let i = 0; i < fragmentCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1.0;
      debrisFragments.push(new DebrisFragment(
        x, y,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        color
      ));
    }
    
    explosionRings.push(new ExplosionRing(x, y, radius, color));
    if (isHeavy) {
      explosionRings.push(new ExplosionRing(x, y, radius * 0.5, '#ffffff'));
    }
    
    const gasCount = isHeavy ? 4 : 2;
    for (let i = 0; i < gasCount; i++) {
      gasClouds.push(new GasCloud(
        x + (Math.random() - 0.5) * 10,
        y + (Math.random() - 0.5) * 10,
        color
      ));
    }
    
    shakeTime = isHeavy ? 28 : 14;
    shakeMaxTime = shakeTime;
    shakeAmount = isHeavy ? 7.5 : 3.5;
  }

  // Draw Orbit Faint Dashed Lines
  function drawOrbitLine(p) {
    ctx.save();
    ctx.translate(sunX, sunY);
    ctx.rotate(p.orbitRotate);
    
    ctx.strokeStyle = 'rgba(94, 200, 216, 0.04)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    
    ctx.beginPath();
    ctx.ellipse(0, 0, p.baseA, p.baseB, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
  }

  // Draw Sun
  function drawSun(x, y, time) {
    ctx.save();
    
    const baseRadius = 45;
    const pulse = Math.sin(time * 0.02) * 4;
    const sunR = baseRadius + pulse;
    
    ctx.fillStyle = 'rgba(255, 120, 30, 0.18)';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff5400';
    const numFlares = 8;
    for (let i = 0; i < numFlares; i++) {
      const angle = (i * Math.PI * 2 / numFlares) + time * 0.004;
      const flareLen = sunR * (1.3 + Math.sin(time * 0.05 + i) * 0.15);
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      const cp1x = x + Math.cos(angle - 0.2) * (sunR * 0.8);
      const cp1y = y + Math.sin(angle - 0.2) * (sunR * 0.8);
      const destX = x + Math.cos(angle) * flareLen;
      const destY = y + Math.sin(angle) * flareLen;
      const cp2x = x + Math.cos(angle + 0.2) * (sunR * 0.8);
      const cp2y = y + Math.sin(angle + 0.2) * (sunR * 0.8);
      
      ctx.quadraticCurveTo(cp1x, cp1y, destX, destY);
      ctx.quadraticCurveTo(cp2x, cp2y, x, y);
      ctx.fill();
    }
    
    const outerGrad = ctx.createRadialGradient(x, y, sunR * 0.5, x, y, sunR * 3.5);
    outerGrad.addColorStop(0, '#ffffff');
    outerGrad.addColorStop(0.1, '#ffebad');
    outerGrad.addColorStop(0.25, '#ffb454');
    outerGrad.addColorStop(0.5, 'rgba(255, 84, 0, 0.42)');
    outerGrad.addColorStop(0.75, 'rgba(255, 84, 0, 0.14)');
    outerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.beginPath();
    ctx.arc(x, y, sunR * 3.5, 0, Math.PI * 2);
    ctx.fillStyle = outerGrad;
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x, y, sunR, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#fff4e0';
    ctx.fill();
    
    ctx.restore();
    
    if (Math.random() > 0.4 && solarWindParticles.length < 150) {
      solarWindParticles.push(new SolarWindParticle(x, y));
    }
  }

  // Pools
  let stars = [];
  const starCount = 120;
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }

  let planets = [
    new Planet(0, true),
    new Planet(1, true),
    new Planet(2, true),
    new Planet(3, true)
  ];

  let meteoroids = [];
  for (let i = 0; i < 5; i++) {
    meteoroids.push(new Meteoroid());
  }

  let solarWindParticles = [];
  let chargingParticles = [];
  let plasmaTrailParticles = [];
  let explosionParticles = [];
  let explosionRings = [];
  let debrisFragments = [];
  let gasClouds = [];

  // Cosmic Event Manager
  let activeEvent = null;
  let eventTimer = 220; // frames before first event

  // Mouse Clicking to launch comets
  window.addEventListener('click', (e) => {
    if (prefersReducedMotion) return;
    
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.float-card')) {
      return;
    }

    const startFromRight = Math.random() > 0.5;
    const startX = startFromRight ? width + 50 : -50;
    const startY = Math.random() * height;

    const customMeteor = new Meteoroid();
    customMeteor.x = startX;
    customMeteor.y = startY;
    customMeteor.baseX = startX;
    customMeteor.baseY = startY;

    const angle = Math.atan2(e.clientY - startY, e.clientX - startX);
    customMeteor.speed = Math.random() * 8 + 12;
    customMeteor.dx = Math.cos(angle) * customMeteor.speed;
    customMeteor.dy = Math.sin(angle) * customMeteor.speed;
    customMeteor.length = Math.random() * 50 + 70;
    customMeteor.size = Math.random() * 1.5 + 2.0;
    customMeteor.color = colors[Math.floor(Math.random() * colors.length)];
    customMeteor.active = true;
    customMeteor.isPlayerSpawned = true;
    customMeteor.targetX = e.clientX;
    customMeteor.targetY = e.clientY;

    meteoroids.push(customMeteor);
  });

  // Handle window resizing
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    updateSunPosition();
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => star.draw(0));
    }
  }, { passive: true });

  if (prefersReducedMotion) {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => star.draw(0));
    return;
  }

  let scrollVel = 0;

  function animate() {
    try {
      ctx.clearRect(0, 0, width, height);

      // Pools overflow bounds check
      if (chargingParticles.length > 500) chargingParticles = [];
      if (plasmaTrailParticles.length > 500) plasmaTrailParticles = [];
      if (explosionParticles.length > 500) explosionParticles = [];
      if (solarWindParticles.length > 300) solarWindParticles = [];
      if (debrisFragments.length > 300) debrisFragments = [];
      if (gasClouds.length > 200) gasClouds = [];
      if (meteoroids.length > 50) meteoroids = meteoroids.filter(m => m.active || !m.isPlayerSpawned);

      const delta = scrollDelta;
      scrollDelta = 0;

      let stretchFactor = 1.0;
      let warpDelta = 0;
      if (warpTimer > 0) {
        warpTimer--;
        const progress = (75 - warpTimer) / 75;
        const bell = Math.sin(progress * Math.PI);
        stretchFactor = 1.0 + bell * 34.0;
        warpDelta = bell * 26.0;
        scrollVel = scrollVel * 0.4 + bell * 28.0;
      }

      scrollVel = scrollVel * 0.88 + delta * 0.12;

      ctx.save();
      
      // Camera shake translation
      if (shakeTime > 0) {
        const currentShake = (shakeTime / shakeMaxTime) * shakeAmount;
        const dx = (Math.random() - 0.5) * currentShake;
        const dy = (Math.random() - 0.5) * currentShake;
        ctx.translate(dx, dy);
        shakeTime--;
      }

      // 1. Draw Orbit Lines
      planets.forEach(p => drawOrbitLine(p));

      // 2. Draw Sun
      drawSun(sunX, sunY, sunTime);
      sunTime++;

      // 3. Update and draw stars
      stars.forEach(star => {
        star.update(delta + warpDelta);
        star.draw(scrollVel, stretchFactor);
      });

      // 4. Update and draw planets
      planets.forEach(p => {
        p.update(delta);
        p.draw();
      });

      // 5. Update and draw meteoroids
      meteoroids.forEach(m => {
        m.update(delta);
        m.draw();
      });

      // 6. Swirl/charging particles
      chargingParticles = chargingParticles.filter(cp => {
        cp.update();
        cp.draw();
        return cp.active;
      });

      // 7. Solar Wind
      solarWindParticles = solarWindParticles.filter(swp => {
        swp.update(delta);
        swp.draw();
        return swp.active;
      });

      // 8. Plasma trails
      plasmaTrailParticles = plasmaTrailParticles.filter(pt => {
        pt.update(delta);
        pt.draw();
        return pt.alpha > 0;
      });

      // 9. Debris fragments
      debrisFragments = debrisFragments.filter(df => {
        df.update(delta);
        df.draw();
        return df.active;
      });

      // 10. Gas Clouds
      gasClouds = gasClouds.filter(gc => {
        gc.update(delta);
        gc.draw();
        return gc.active;
      });

      // 11. Explosion Particles and Rings
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

      // 12. Dynamic Event Manager processing
      if (!activeEvent) {
        eventTimer--;
        if (eventTimer <= 0) {
          const livingPlanets = planets.filter(p => p.state === 'normal');
          if (livingPlanets.length > 0) {
            const choice = Math.random();
            if (choice < 0.35 && livingPlanets.length >= 2) {
              const p1 = livingPlanets[0];
              const p2 = livingPlanets[1];
              p1.state = 'colliding';
              p2.state = 'colliding';
              p1.collisionTarget = p2;
              p2.collisionTarget = p1;
              p1.collisionSpeed = 1.0;
              p2.collisionSpeed = 1.0;
              
              activeEvent = {
                type: 'planet-planet',
                p1: p1,
                p2: p2
              };
            } else if (choice < 0.7) {
              const p = livingPlanets[Math.floor(Math.random() * livingPlanets.length)];
              p.state = 'decaying';
              activeEvent = {
                type: 'orbit-decay',
                p: p
              };
            } else {
              const p = livingPlanets[Math.floor(Math.random() * livingPlanets.length)];
              
              const startFromRight = Math.random() > 0.5;
              const startX = startFromRight ? width + 100 : -100;
              const startY = Math.random() * (height * 0.4);
              
              const giantComet = new Meteoroid();
              giantComet.x = startX;
              giantComet.y = startY;
              giantComet.baseX = startX;
              giantComet.baseY = startY;
              giantComet.radius = 6;
              giantComet.size = 3.5;
              giantComet.length = 120;
              giantComet.color = '#ff3c00';
              
              const angle = Math.atan2(p.y - startY, p.x - startX);
              giantComet.speed = 10;
              giantComet.dx = Math.cos(angle) * giantComet.speed;
              giantComet.dy = Math.sin(angle) * giantComet.speed;
              
              giantComet.active = true;
              giantComet.isGiantComet = true;
              giantComet.targetPlanet = p;
              
              meteoroids.push(giantComet);
              
              activeEvent = {
                type: 'giant-comet',
                comet: giantComet,
                p: p
              };
            }
          }
        }
      } else {
        let eventConcluded = false;
        if (activeEvent.type === 'planet-planet') {
          if (activeEvent.p1.state !== 'colliding' || activeEvent.p2.state !== 'colliding') {
            eventConcluded = true;
          }
        } else if (activeEvent.type === 'orbit-decay') {
          if (activeEvent.p.state !== 'decaying') {
            eventConcluded = true;
          }
        } else if (activeEvent.type === 'giant-comet') {
          if (!activeEvent.comet.active || activeEvent.p.state !== 'normal') {
            eventConcluded = true;
          }
        }
        
        if (eventConcluded) {
          activeEvent = null;
          eventTimer = Math.random() * 500 + 400;
        }
      }

      // 13. Physics & Collisions checking
      planets.forEach(p => {
        if (p.state === 'decaying') {
          const distToSun = Math.hypot(p.x - sunX, p.y - sunY);
          if (distToSun < sunRadius + p.radius + 8) {
            triggerExplosion(p.x, p.y, p.radius * 1.5, p.getColor(), true);
            p.destroy();
          }
        }
      });

      if (activeEvent && activeEvent.type === 'planet-planet') {
        const p1 = activeEvent.p1;
        const p2 = activeEvent.p2;
        if (p1.state === 'colliding' && p2.state === 'colliding') {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < p1.radius + p2.radius + 6) {
            const mx = (p1.x + p2.x) / 2;
            const my = (p1.y + p2.y) / 2;
            triggerExplosion(mx, my, (p1.radius + p2.radius) * 1.3, '#ffffff', true);
            p1.destroy();
            p2.destroy();
          }
        }
      }

      meteoroids.forEach(m => {
        if (!m.active) return;
        
        if (m.isGiantComet && m.targetPlanet && m.targetPlanet.state === 'normal') {
          const dist = Math.hypot(m.x - m.targetPlanet.x, m.y - m.targetPlanet.y);
          if (dist < m.targetPlanet.radius + 15) {
            triggerExplosion(m.targetPlanet.x, m.targetPlanet.y, m.targetPlanet.radius * 1.4, m.targetPlanet.getColor(), true);
            m.targetPlanet.destroy();
            m.active = false;
          }
        } else {
          planets.forEach(p => {
            if (p.state !== 'normal') return;
            const dist = Math.hypot(m.x - p.x, m.y - p.y);
            if (dist < p.radius + 12) {
              m.active = false;
              if (m.isPlayerSpawned) {
                triggerExplosion(p.x, p.y, p.radius * 1.2, p.getColor(), true);
              } else {
                triggerExplosion(p.x, p.y, p.radius, p.getColor(), false);
              }
              p.destroy();
            }
          });
        }
      });

      ctx.restore();

      requestAnimationFrame(animate);
    } catch (e) {
      console.error("[Starfield Animation Error]", e);
    }
  }
  requestAnimationFrame(animate);
})();

// ============================================
// ACTIVE SECTION NAV LINK OBSERVER & SWEEPS
// ============================================
(function() {
  const sections = document.querySelectorAll('header.hero, section.section');
  const navLinks = document.querySelectorAll('.nav-links a');

  // 1. Observer for Active Nav link highlight
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.2, rootMargin: "-25% 0px -55% 0px" });

  sections.forEach(sec => navObserver.observe(sec));

  // 2. Observer for Holographic Sweep Scanlines
  const sweepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-sweep');
        sweepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('section.section').forEach(sec => sweepObserver.observe(sec));

  // 3. Dispatch warp speed event when clicking links or logo
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      window.dispatchEvent(new Event('triggerWarpSpeed'));
    });
  });

  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', () => {
      window.dispatchEvent(new Event('triggerWarpSpeed'));
    });
  }
})();

