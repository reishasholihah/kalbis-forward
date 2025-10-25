document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.setAttribute('draggable', false);
    img.addEventListener('dragstart', (e) => e.preventDefault());
  });

  const bannerContainer = document.querySelector('.banner-carousel .carousel-container');
  if (!bannerContainer) return;

  const slides = bannerContainer.querySelectorAll('.slide');
  const prevBtn = bannerContainer.querySelector('.prev');
  const nextBtn = bannerContainer.querySelector('.next');
  const progressBar = bannerContainer.querySelector('.progress-bar');

  let currentIndex = 0;
  const totalSlides = slides.length;
  const intervalDuration = 10000;
  let autoPlay;

  function showSlide(index) {
    // Normalize index
    currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;

    // Remove active from all
    slides.forEach(slide => slide.classList.remove('active'));

    // Add active to current
    slides[currentIndex].classList.add('active');

    // Update progress bar if exists
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      void progressBar.offsetWidth; // Trigger reflow
      progressBar.style.transition = `width ${intervalDuration}ms linear`;
      progressBar.style.width = '100%';
    }
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function startAuto() {
    autoPlay = setInterval(nextSlide, intervalDuration);
  }

  function stopAuto() {
    clearInterval(autoPlay);
  }

  // Manual controls
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); showSlide(currentIndex + 1); setTimeout(startAuto, 5000); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); showSlide(currentIndex - 1); setTimeout(startAuto, 5000); });

  // Initialize
  showSlide(currentIndex);
  startAuto();

  // ===== AUTO-SLIDING TESTIMONI CAROUSEL =====
const testimoniContainer = document.querySelector('.testimoni-carousel .carousel-container');
if (testimoniContainer) {
  const slidesWrapper = testimoniContainer.querySelector('.carousel-slides');
  const slides = testimoniContainer.querySelectorAll('.slide');
  const indicators = testimoniContainer.querySelectorAll('.indicator');
  const prevBtn = testimoniContainer.querySelector('.prev');
  const nextBtn = testimoniContainer.querySelector('.next');

  let currentIndex = 0;
  const slideCount = slides.length;
  const intervalTime = 6000;
  let autoSlide;

  function updateSlide() {
    const offset = -currentIndex * 100;
    slidesWrapper.style.transform = `translateX(${offset}%)`;

    // Update indicators
    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlide();
  }

  function goToSlide(index) {
    currentIndex = ((index % slideCount) + slideCount) % slideCount;
    updateSlide();
  }

  function startAuto() {
    autoSlide = setInterval(nextSlide, intervalTime);
  }

  function stopAuto() {
    clearInterval(autoSlide);
  }

  function resumeAuto() {
    stopAuto();
    setTimeout(startAuto, 4000);
  }

  // Manual controls
  nextBtn?.addEventListener('click', () => { stopAuto(); nextSlide(); resumeAuto(); });
  prevBtn?.addEventListener('click', () => { stopAuto(); goToSlide(currentIndex - 1); resumeAuto(); });

  indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => { stopAuto(); goToSlide(i); resumeAuto(); });
  });

  // Pause on interaction
  const pauseOnInteraction = () => {
    stopAuto();
    setTimeout(startAuto, 4000);
  };

  // Hover (desktop)
  testimoniContainer.addEventListener('mouseenter', stopAuto);
  testimoniContainer.addEventListener('mouseleave', () => setTimeout(startAuto, 2000));

  // Click / Touch (mobile & desktop)
  testimoniContainer.addEventListener('pointerdown', pauseOnInteraction);

  // Start
  startAuto();
}

// Pause testimonial carousel on interaction
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('testimoni-track');
  if (!track) return;

  let isPaused = false;
  track.addEventListener('pointerdown', () => {
    track.style.animationPlayState = 'paused';
    isPaused = true;
  });
  track.addEventListener('pointerup', () => {
    if (isPaused) {
      track.style.animationPlayState = 'running';
      isPaused = false;
    }
  });
});
});