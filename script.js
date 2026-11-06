/* ============================================================
   SQUIGL — script.js
   ============================================================ */

/* ── WAVEFORM CANVAS ── */
const canvas = document.getElementById('wave-canvas');
const ctx = canvas.getContext('2d');
let W, H, t = 0;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

function drawWave(yBase, amp, freq, speed, color, lineW) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineW;
  for (let x = 0; x <= W; x += 2) {
    const y = yBase
      + Math.sin((x * freq) + t * speed) * amp
      + Math.sin((x * freq * 0.5) + t * speed * 1.3) * amp * 0.4;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  drawWave(H * 0.25, 28, 0.012, 0.6, '#4b00a0', 1.2);
  drawWave(H * 0.5,  18, 0.018, 0.9, '#cc00ff', 1.5);
  drawWave(H * 0.75, 22, 0.014, 0.7, '#4b00a0', 1.0);
  t += 0.015;
  requestAnimationFrame(animate);
}

animate();

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

/* ── ALBUM COUNTDOWN ── */
(function () {
  const box = document.getElementById('countdown');
  if (!box) return;
  const release = new Date(2026, 11, 1, 0, 0, 0); // Dec 1, 2026, local time
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs')
  };
  const pad = n => String(n).padStart(2, '0');

  function tick() {
    const diff = release - new Date();
    if (diff <= 0) {
      box.classList.add('released');
      box.innerHTML = '<span class="out-now">OUT NOW</span>';
      clearInterval(timer);
      return;
    }
    els.d.textContent = pad(Math.floor(diff / 86400000));
    els.h.textContent = pad(Math.floor(diff / 3600000) % 24);
    els.m.textContent = pad(Math.floor(diff / 60000) % 60);
    els.s.textContent = pad(Math.floor(diff / 1000) % 60);
  }

  tick();
  const timer = setInterval(tick, 1000);
})();
