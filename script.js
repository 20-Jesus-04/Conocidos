// ===== ABRIR SOBRE =====
const envelope = document.getElementById('envelope');
const cover = document.getElementById('cover');
const letter = document.getElementById('letter');
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

envelope.addEventListener('click', () => {
  if (envelope.classList.contains('open')) return;
  envelope.classList.add('open');

  music.play().then(() => {
    musicToggle.classList.add('playing');
  }).catch(() => {
    // el navegador puede bloquear autoplay; el usuario puede usar el botón
  });

  setTimeout(() => {
    cover.style.transition = 'opacity 0.8s ease';
    cover.style.opacity = '0';
    setTimeout(() => {
      cover.style.display = 'none';
      letter.classList.remove('hidden');
    }, 800);
  }, 900);
});

// ===== BOTÓN DE MÚSICA =====
musicToggle.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicToggle.classList.add('playing');
  } else {
    music.pause();
    musicToggle.classList.remove('playing');
  }
});

// ===== MÁQUINA DE ESCRIBIR =====
const typingPhrases = [
  'Mi cuchocha favorita...',
  'El cerquillito que cambió mi vida...',
  'Mi color rosa desde aquel día...'
];
const typingEl = document.getElementById('typingQuote');

function typeLoop(phraseIndex = 0, charIndex = 0, deleting = false) {
  if (!typingEl) return;
  const phrase = typingPhrases[phraseIndex];

  if (!deleting) {
    typingEl.textContent = phrase.slice(0, charIndex + 1);
    if (charIndex + 1 === phrase.length) {
      setTimeout(() => typeLoop(phraseIndex, charIndex, true), 1800);
    } else {
      setTimeout(() => typeLoop(phraseIndex, charIndex + 1, false), 70);
    }
  } else {
    typingEl.textContent = phrase.slice(0, charIndex);
    if (charIndex === 0) {
      setTimeout(() => typeLoop((phraseIndex + 1) % typingPhrases.length, 0, false), 400);
    } else {
      setTimeout(() => typeLoop(phraseIndex, charIndex - 1, true), 35);
    }
  }
}
typeLoop();

// ===== CONTADOR DE TIEMPO JUNTOS =====
// Editar esta fecha por la fecha real de inicio de la relación (7 meses de novios)
const RELATIONSHIP_START = new Date('2025-11-24T00:00:00');

function updateCounter() {
  const now = new Date();
  let diff = now - RELATIONSHIP_START;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText('cDays', days);
  setText('cHours', hours);
  setText('cMinutes', minutes);
  setText('cSeconds', seconds);
}
updateCounter();
setInterval(updateCounter, 1000);

// ===== SPARKLES =====
function createSparkles() {
  document.querySelectorAll('.sparkles').forEach(container => {
    const count = 20;
    for (let i = 0; i < count; i++) {
      const sp = document.createElement('span');
      sp.classList.add('sparkle');
      sp.style.left = Math.random() * 100 + '%';
      sp.style.top = Math.random() * 100 + '%';
      sp.style.animationDelay = (Math.random() * 3) + 's';
      sp.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
      container.appendChild(sp);
    }
  });
}
createSparkles();

// ===== CONFETTI / CORAZONES AL TOCAR EL BOTÓN =====
const confettiBtn = document.getElementById('confetti-btn');
const confettiSymbols = ['♡', '✿', '❀', '♥', '✦'];

function launchConfetti() {
  const count = 40;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    piece.classList.add('confetti-piece');
    piece.textContent = confettiSymbols[Math.floor(Math.random() * confettiSymbols.length)];
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.color = Math.random() > 0.5 ? '#ff5d8f' : '#ff8fab';
    piece.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5500);
  }
}

if (confettiBtn) {
  confettiBtn.addEventListener('click', launchConfetti);
}

// ===== ESTELA DE CORAZONES EN EL CURSOR =====
let lastTrailTime = 0;
function spawnCursorHeart(x, y) {
  const heart = document.createElement('span');
  heart.classList.add('cursor-heart');
  heart.textContent = '♡';
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (supportsHover) {
  window.addEventListener('pointermove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 90) {
      lastTrailTime = now;
      spawnCursorHeart(e.clientX, e.clientY);
    }
  });
}

// ===== FADE IN AL HACER SCROLL =====
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

fadeEls.forEach(el => observer.observe(el));

// ===== PÉTALOS CAYENDO =====
function createPetals() {
  document.querySelectorAll('.petals').forEach(container => {
    const count = 12;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('span');
      petal.classList.add('petal');
      petal.textContent = '❀';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
      petal.style.animationDuration = (6 + Math.random() * 8) + 's';
      petal.style.animationDelay = (Math.random() * 8) + 's';
      petal.style.opacity = (0.4 + Math.random() * 0.5).toString();
      container.appendChild(petal);
    }
  });
}
createPetals();

// ===== ESTRELLAS =====
function createStars() {
  document.querySelectorAll('.stars').forEach(container => {
    const count = 30;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      const size = Math.random() * 3 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = (Math.random() * 3) + 's';
      container.appendChild(star);
    }
  });
}
createStars();

// ===== CORAZONES FLOTANTES EN CANVAS =====
const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class FloatingHeart {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = 8 + Math.random() * 16;
    this.speed = 0.4 + Math.random() * 1.1;
    this.drift = (Math.random() - 0.5) * 0.6;
    this.opacity = 0.15 + Math.random() * 0.35;
    this.angle = Math.random() * Math.PI * 2;
  }
  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.angle) * this.drift;
    this.angle += 0.01;
    if (this.y < -30) {
      this.reset();
    }
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.fillStyle = '#ff5d8f';
    ctx.beginPath();
    const s = this.size;
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.6, s * 0.4, 0, s * 1.4);
    ctx.bezierCurveTo(s * 1.6, s * 0.4, s, -s * 0.6, 0, s * 0.3);
    ctx.fill();
    ctx.restore();
  }
}

const hearts = Array.from({ length: 28 }, () => new FloatingHeart());

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    h.update();
    h.draw();
  });
  requestAnimationFrame(animateHearts);
}
animateHearts();
