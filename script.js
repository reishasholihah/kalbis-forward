document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.setAttribute('draggable', false);
    img.addEventListener('dragstart', e => e.preventDefault());
  });

  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.mobile-menu-overlay');

  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.contains('active');
      hamburger.classList.toggle('active', !isActive);
      overlay.classList.toggle('active', !isActive);
      hamburger.setAttribute('aria-expanded', !isActive);
      overlay.setAttribute('aria-hidden', isActive);
    });

    const navLinks = overlay.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        overlay.setAttribute('aria-hidden', 'true');
      });
    });
}

  const bannerContainer = document.querySelector('.banner-carousel .carousel-container');
  if (bannerContainer) {
    const slides = bannerContainer.querySelectorAll('.slide');
    const progressBar = bannerContainer.querySelector('.progress-bar');
    let currentIndex = 0;
    const totalSlides = slides.length;
    const intervalDuration = 10000;
    let autoPlay;

    function showSlide(index) {
      currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;

      slides.forEach(slide => slide.classList.remove('active'));
      slides[currentIndex].classList.add('active');

      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        void progressBar.offsetWidth;
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

    showSlide(currentIndex);
    startAuto();
  }

  const track = document.getElementById('testimoni-track');
  if (track) {
    let isPaused = false;

    const pause = () => {
      track.style.animationPlayState = 'paused';
      isPaused = true;
    };

    const resume = () => {
      if (isPaused) {
        track.style.animationPlayState = 'running';
        isPaused = false;
      }
    };

    track.addEventListener('pointerdown', pause);
    track.addEventListener('pointerup', resume);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('mouseenter', pause);
  }
});