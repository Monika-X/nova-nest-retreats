/* ========================================
   Nova Nest Retreats — Testimonial Slider / Carousel
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('testimonial-slider');
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testi-prev');
    const nextBtn = document.getElementById('testi-next');
    const dotsContainer = document.getElementById('testi-dots');

    if (!track || !slider) return;

    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoPlayInterval = null;

    // Get or initialize dot indicators
    let dots = [];
    if (dotsContainer) {
        dots = Array.from(dotsContainer.querySelectorAll('.dot-indicator'));
    }

    // Function to transition to a specific slide index
    const goToSlide = (index) => {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // Apply hardware-accelerated transform translate
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots state
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('dot-active');
                dot.style.background = 'var(--emerald-400)';
                dot.style.transform = 'scale(1.2)';
            } else {
                dot.classList.remove('dot-active');
                dot.style.background = 'var(--navy-500)';
                dot.style.transform = 'scale(1)';
            }
        });
    };

    // Next & Previous Handlers
    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });
    });

    // Touch Swipe Support for Responsiveness
    let startX = 0;
    let isSwiping = false;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        const diffX = e.touches[0].clientX - startX;

        // If swipe gesture is large enough, trigger slides
        if (Math.abs(diffX) > 60) {
            if (diffX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
            isSwiping = false;
            resetAutoPlay();
        }
    }, { passive: true });

    slider.addEventListener('touchend', () => {
        isSwiping = false;
    });

    // Auto Play Functionality (every 6 seconds for premium pacing)
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextSlide, 6000);
    };

    const stopAutoPlay = () => {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    };

    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };

    // Start auto play initially
    startAutoPlay();

    // Pause auto play on mouse hover for better accessibility
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // Initial state setup
    goToSlide(0);
});
