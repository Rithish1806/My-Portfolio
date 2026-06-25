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
      this.baseX = this.x;
      this.baseY = this.y;
      this.length = Math.random() * 60 + 40;
      this.speed = Math.random() * 7 + 5;
      this.dx = -this.speed * 0.8;
      this.dy = this.speed * 0.6;
      this.size = Math.random() * 1.2 + 0.6;
      
      // Some meteoroids are wavy cyan "Wave Comets" (Metroid Wave Beam inspired)
      this.isWavy = Math.random() < 0.35;
      if (this.isWavy) {
        this.color = '#5ec8d8'; // Light cyan blue
        this.waveFreq = Math.random() * 0.15 + 0.08;
        this.waveAmp = Math.random() * 20 + 10;
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
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
          this.reset();
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

      // Spawn glowing trail particles
      if (Math.random() > 0.4) {
        plasmaTrailParticles.push(new PlasmaTrailParticle(this.x, this.y, this.color, 0.8));
      }

      if (this.baseX < -150 || this.baseY > height + 150 || this.baseX > width + 150) {
        this.active = false;
        this.spawnTimer = Math.random() * 300 + 150;
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
      grad.addColorStop(0, this.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = this.size;
      ctx.lineCap = 'round';
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(prevX, prevY);
      ctx.stroke();
      ctx.restore();
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
      
      this.cooldown = Math.random() * 300 + 200;
      this.target = null;
      this.chargeTimer = 0;
      
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
      this.cooldown = Math.random() * 300 + 200;
      this.target = null;
      this.chargeTimer = 0;
      this.active = true;
    }

    destroy() {
      this.active = false;
      this.target = null;
      this.chargeTimer = 0;
      this.spawnTimer = Math.random() * 350 + 200;
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
        this.target = null;
        this.chargeTimer = 0;
        this.spawnTimer = Math.random() * 250 + 100;
        return;
      }

      // Shooting AI
      if (this.cooldown > 0) {
        this.cooldown--;
      } else if (!this.target) {
        const others = planets.filter(p => p.active && p !== this);
        if (others.length > 0) {
          this.target = others[Math.floor(Math.random() * others.length)];
          this.chargeTimer = 90; // 1.5 seconds charging
        } else {
          this.cooldown = Math.random() * 100 + 100;
        }
      }

      if (this.target) {
        if (!this.target.active) {
          this.target = null;
          this.chargeTimer = 0;
          this.cooldown = Math.random() * 200 + 100;
        } else {
          this.chargeTimer--;
          
          // Spiral charging particles
          if (Math.random() > 0.3) {
            chargingParticles.push(new ChargingParticle(this, this.color));
          }

          if (this.chargeTimer <= 0) {
            laserBolts.push(new LaserBolt(this.x, this.y, this.target, this.color));
            this.target = null;
            this.cooldown = Math.random() * 400 + 300;
          }
        }
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

      // Draw targeting lock system
      if (this.target && this.target.active) {
        ctx.save();
        const progress = (90 - this.chargeTimer) / 90;
        ctx.strokeStyle = `rgba(255, 84, 84, ${0.2 + progress * 0.6})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.target.x, this.target.y);
        ctx.stroke();

        // Draw crosshair reticle
        ctx.translate(this.target.x, this.target.y);
        ctx.rotate((progress * Math.PI * 2) + sunTime * 0.015);
        ctx.strokeStyle = progress > 0.85 ? '#ff5454' : this.color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
        
        const size = this.target.radius + 6;
        ctx.beginPath();
        ctx.moveTo(-size, -size / 2); ctx.lineTo(-size, -size); ctx.lineTo(-size / 2, -size);
        ctx.moveTo(size / 2, -size); ctx.lineTo(size, -size); ctx.lineTo(size, -size / 2);
        ctx.moveTo(size, size / 2); ctx.lineTo(size, size); ctx.lineTo(size / 2, size);
        ctx.moveTo(-size / 2, size); ctx.lineTo(-size, size); ctx.lineTo(-size, size / 2);
        ctx.stroke();
        ctx.restore();
      }
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

  class PlasmaTrailParticle {
    constructor(x, y, color, sizeMultiplier = 1.0) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.color = color;
      this.size = (Math.random() * 1.5 + 0.5) * sizeMultiplier;
      this.alpha = 0.8;
      this.decay = Math.random() * 0.03 + 0.02;
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

  class ChargingParticle {
    constructor(targetObj, color) {
      this.targetObj = targetObj;
      this.color = color;
      this.angle = Math.random() * Math.PI * 2;
      this.distance = Math.random() * 40 + 20;
      this.speed = Math.random() * 1.2 + 0.8;
      this.size = Math.random() * 1.2 + 0.6;
      this.alpha = 0.8;
      this.active = true;
    }

    update() {
      if (!this.targetObj) {
        this.active = false;
        return;
      }
      this.distance -= this.speed;
      this.angle += 0.08;
      if (this.distance <= 2) {
        this.active = false;
      }
      this.x = this.targetObj.x + Math.cos(this.angle) * this.distance;
      this.y = this.targetObj.y + Math.sin(this.angle) * this.distance;
    }

    draw() {
      if (!this.active || this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class LaserBolt {
    constructor(startX, startY, targetPlanet, color) {
      this.x = startX;
      this.y = startY;
      this.target = targetPlanet;
      this.color = color;
      this.speed = 4.5;
      this.active = true;
      this.size = 2.0;
      
      const angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
      this.vx = Math.cos(angle) * this.speed;
      this.vy = Math.sin(angle) * this.speed;
    }

    update(scrollDelta) {
      if (!this.active) return;

      if (!this.target || !this.target.active) {
        this.x += this.vx;
        this.y += this.vy + scrollDelta * 0.15;
        if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) {
          this.active = false;
        }
        return;
      }

      let tx = this.target.x;
      let ty = this.target.y;
      
      const angle = Math.atan2(ty - this.y, tx - this.x);
      this.vx = this.vx * 0.85 + Math.cos(angle) * this.speed * 0.15;
      this.vy = this.vy * 0.85 + Math.sin(angle) * this.speed * 0.15;

      this.x += this.vx;
      this.y += this.vy + scrollDelta * 0.15;

      if (Math.random() > 0.3) {
        plasmaTrailParticles.push(new PlasmaTrailParticle(this.x, this.y, this.color, 1.2));
      }

      const dist = Math.hypot(this.x - tx, this.y - ty);
      if (dist < this.target.radius + 5) {
        this.active = false;
        triggerExplosion(tx, ty, this.target.radius, this.target.color, false);
        this.target.destroy();
      }
    }

    draw() {
      if (!this.active) return;
      ctx.save();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      
      const angle = Math.atan2(this.vy, this.vx);
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - Math.cos(angle) * 15, this.y - Math.sin(angle) * 15);
      ctx.stroke();
      ctx.restore();
    }
  }

  class SolarBlast {
    constructor(startX, startY, targetPlanet, color) {
      this.x = startX;
      this.y = startY;
      this.target = targetPlanet;
      this.color = color;
      this.speed = 3.5;
      this.radius = 8.0;
      this.active = true;
      
      const angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
      this.vx = Math.cos(angle) * this.speed;
      this.vy = Math.sin(angle) * this.speed;
    }

    update(scrollDelta) {
      if (!this.active) return;

      if (!this.target || !this.target.active) {
        this.x += this.vx;
        this.y += this.vy + scrollDelta * 0.15;
        if (Math.random() > 0.2) {
          plasmaTrailParticles.push(new PlasmaTrailParticle(this.x, this.y, this.color, 1.8));
        }
        if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) {
          this.active = false;
        }
        return;
      }

      let tx = this.target.x;
      let ty = this.target.y;
      
      const angle = Math.atan2(ty - this.y, tx - this.x);
      this.vx = this.vx * 0.9 + Math.cos(angle) * this.speed * 0.1;
      this.vy = this.vy * 0.9 + Math.sin(angle) * this.speed * 0.1;

      this.x += this.vx;
      this.y += this.vy + scrollDelta * 0.15;

      if (Math.random() > 0.2) {
        plasmaTrailParticles.push(new PlasmaTrailParticle(this.x, this.y, this.color, 1.8));
      }

      const dist = Math.hypot(this.x - tx, this.y - ty);
      if (dist < this.target.radius + this.radius) {
        this.active = false;
        triggerExplosion(tx, ty, this.target.radius * 1.5, '#ffb454', true);
        this.target.destroy();
      }
    }

    draw() {
      if (!this.active) return;
      ctx.save();
      const grad = ctx.createRadialGradient(this.x, this.y, 1, this.x, this.y, this.radius);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.4, '#ffb454');
      grad.addColorStop(1, 'rgba(255, 180, 84, 0)');
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
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
      const speed = isHeavy ? Math.random() * 5.0 + 2.0 : Math.random() * 3.5 + 1.2;
      explosionParticles.push(new ExplosionParticle(
        x, y,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        color
      ));
    }
    explosionRings.push(new ExplosionRing(x, y, radius, color));
    
    shakeTime = isHeavy ? 25 : 12;
    shakeMaxTime = shakeTime;
    shakeAmount = isHeavy ? 6.0 : 3.0;
  }

  // Populate starfield
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }

  // Populate pools
  let planets = [new Planet(true), new Planet(true), new Planet(true)];
  let meteoroids = [];
  for (let i = 0; i < 6; i++) {
    meteoroids.push(new Meteoroid());
  }

  let explosionParticles = [];
  let explosionRings = [];
  let chargingParticles = [];
  let plasmaTrailParticles = [];
  let laserBolts = [];
  let solarBlasts = [];

  // Sun variables and function
  let sunTime = 0;
  let sunState = 'idle';
  let sunCooldown = Math.random() * 300 + 200;
  let sunChargeTimer = 0;
  let sunTargetPlanet = null;

  function updateAndDrawSun(time, scrollDelta) {
    const sunX = width * 0.88;
    const sunY = 120;

    if (sunState === 'idle') {
      if (sunCooldown > 0) {
        sunCooldown--;
      } else {
        const activePlanets = planets.filter(p => p.active);
        if (activePlanets.length > 0) {
          sunTargetPlanet = activePlanets[Math.floor(Math.random() * activePlanets.length)];
          sunState = 'charging';
          sunChargeTimer = 120; // 2 seconds
        } else {
          sunCooldown = 100;
        }
      }
    } else if (sunState === 'charging') {
      if (!sunTargetPlanet || !sunTargetPlanet.active) {
        sunState = 'idle';
        sunCooldown = 120;
        sunTargetPlanet = null;
        sunChargeTimer = 0;
      } else {
        sunChargeTimer--;
        if (Math.random() > 0.15) {
          chargingParticles.push(new ChargingParticle({ x: sunX, y: sunY }, '#ffb454'));
        }
        if (sunChargeTimer <= 0) {
          solarBlasts.push(new SolarBlast(sunX, sunY, sunTargetPlanet, '#ffb454'));
          sunState = 'idle';
          sunCooldown = Math.random() * 500 + 400;
          sunTargetPlanet = null;
        }
      }
    }

    const baseRadius = 35;
    let pulseRadius = baseRadius + Math.sin(time * 0.02) * 5;
    if (sunState === 'charging') {
      pulseRadius += Math.sin(time * 0.25) * 4 + 2;
    }
    const outerRadius = pulseRadius * 2.8;

    ctx.save();
    if (sunState === 'charging' && sunTargetPlanet) {
      const chargeRatio = (120 - sunChargeTimer) / 120;
      ctx.strokeStyle = `rgba(255, 180, 84, ${0.15 + chargeRatio * 0.55})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(sunTargetPlanet.x, sunTargetPlanet.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sunX, sunY, baseRadius + 15 - chargeRatio * 15, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffb454';
      ctx.setLineDash([]);
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    const grad = ctx.createRadialGradient(sunX, sunY, pulseRadius * 0.2, sunX, sunY, outerRadius);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.12, '#fff4e0');
    grad.addColorStop(0.3, 'rgba(255, 180, 84, 0.45)');
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
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => star.draw(0));
    return;
  }

  let scrollVel = 0;

  function animate() {
    try {
      ctx.clearRect(0, 0, width, height);

      // Overflow safety checks
      if (chargingParticles.length > 500) chargingParticles = [];
      if (plasmaTrailParticles.length > 500) plasmaTrailParticles = [];
      if (explosionParticles.length > 500) explosionParticles = [];
      if (laserBolts.length > 100) laserBolts = [];
      if (solarBlasts.length > 100) solarBlasts = [];
      if (explosionRings.length > 100) explosionRings = [];



      const delta = scrollDelta;
      scrollDelta = 0;

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

      // 1. Draw Background Sun
      updateAndDrawSun(sunTime, delta);
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

      // 5. Charging swirl particles
      chargingParticles = chargingParticles.filter(cp => {
        cp.update();
        cp.draw();
        return cp.active;
      });

      // 6. Plasma trails
      plasmaTrailParticles = plasmaTrailParticles.filter(pt => {
        pt.update(delta);
        pt.draw();
        return pt.alpha > 0;
      });

      // 7. Laser bolts
      laserBolts = laserBolts.filter(lb => {
        lb.update(delta);
        lb.draw();
        return lb.active;
      });

      // 8. Solar blasts
      solarBlasts = solarBlasts.filter(sb => {
        sb.update(delta);
        sb.draw();
        return sb.active;
      });

      // 9. Collision checks between meteoroids and planets
      meteoroids.forEach(m => {
        if (!m.active) return;
        planets.forEach(p => {
          if (!p.active) return;
          
          const dist = Math.hypot(m.x - p.x, m.y - p.y);
          if (dist < p.radius + 15) {
            m.active = false;
            m.spawnTimer = Math.random() * 250 + 100;
            p.destroy();
            triggerExplosion(p.x, p.y, p.radius, p.color, false);
          }
        });
      });

      // 10. Update and draw blast explosions
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

      ctx.restore();

      requestAnimationFrame(animate);
    } catch (e) {
      console.error("[Starfield Animation Error]", e);
    }
  }
  requestAnimationFrame(animate);
})();
