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
