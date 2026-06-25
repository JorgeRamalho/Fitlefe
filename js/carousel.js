/* ============================================
   FitLife — Carrossel
   ============================================ */

document.addEventListener('DOMContentLoaded', initCarousel);

function initCarousel() {
  const carousel = document.getElementById('carousel');
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const progressBar = document.getElementById('carouselProgress');

  if (!carousel || !track) return;

  const slides = track.querySelectorAll('.carousel__slide');
  const total = slides.length;
  let current = 0;
  let autoplayTimer = null;
  let progressTimer = null;
  const interval = 5000;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `carousel__dot${i === 0 ? ' carousel__dot--active' : ''}`;
    dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer?.appendChild(dot);
  });

  const dots = dotsContainer?.querySelectorAll('.carousel__dot');

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots?.forEach((dot, i) => {
      dot.classList.toggle('carousel__dot--active', i === current);
    });

    resetAutoplay();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function startProgress() {
    if (!progressBar || prefersReducedMotion) return;
    progressBar.style.width = '0%';
    clearInterval(progressTimer);

    let elapsed = 0;
    const step = 50;

    progressTimer = setInterval(() => {
      elapsed += step;
      progressBar.style.width = `${(elapsed / interval) * 100}%`;
      if (elapsed >= interval) clearInterval(progressTimer);
    }, step);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startProgress();

    if (!prefersReducedMotion) {
      autoplayTimer = setInterval(next, interval);
    }
  }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayTimer);
    clearInterval(progressTimer);
    if (progressBar) progressBar.style.width = '0%';
  });

  carousel.addEventListener('mouseleave', resetAutoplay);

  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (!carousel.matches(':hover')) return;
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  resetAutoplay();
}
