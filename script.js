document.addEventListener('DOMContentLoaded', () => {
    const asciiArt = document.querySelector('.ascii-art');
    const destinyButton = document.querySelector('.destiny-button');
    const phrases = document.querySelectorAll('.phrase');
    let currentPhrase = 0;
    let bounce = 0;
    let direction = 1;
    let isSpinning = false;

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentSlide = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Carousel navigation
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dotsContainer.children[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dotsContainer.children[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for carousel
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Start auto-slide
    startAutoSlide();

    // Rotating phrases
    setInterval(() => {
        phrases[currentPhrase].classList.remove('active');
        currentPhrase = (currentPhrase + 1) % phrases.length;
        phrases[currentPhrase].classList.add('active');
    }, 3000);

    // Paranoid bear animation
    function animateBounce() {
        if (!isSpinning) {
            bounce += (0.3 * direction);
            
            if (bounce > 8) direction = -1;
            if (bounce < 0) direction = 1;
            
            asciiArt.style.transform = `translateY(${bounce}px) rotate(${bounce/2}deg)`;
        }
        requestAnimationFrame(animateBounce);
    }

    // Random paranoid phrases
    const paranoidPhrases = [
        '*paranoid*',
        '*help pls*',
        '*not safu*',
        '*aaaaaa*',
        '*why ser*',
        '*im scared*'
    ];

    setInterval(() => {
        if (!isSpinning) {
            const preText = asciiArt.querySelector('pre').innerHTML;
            const randomPhrase = paranoidPhrases[Math.floor(Math.random() * paranoidPhrases.length)];
            const updatedText = preText.replace(/\*.*\*/, randomPhrase);
            asciiArt.querySelector('pre').innerHTML = updatedText;
        }
    }, 2000);

    // Destiny wheel spin effect
    destinyButton.addEventListener('click', () => {
        if (!isSpinning) {
            isSpinning = true;
            const wheel = document.querySelector('.destiny-wheel');
            wheel.style.animation = 'none';
            wheel.offsetHeight; // Trigger reflow
            wheel.style.animation = 'spin 2s cubic-bezier(0.1, 0.7, 0.1, 1) infinite';
            
            // Wild carousel animation
            stopAutoSlide();
            const spinInterval = setInterval(nextSlide, 100);

            // Determine fate
            setTimeout(() => {
                clearInterval(spinInterval);
                isSpinning = false;
                wheel.style.animation = 'spin 60s linear infinite';
                startAutoSlide();
                
                // Show fate
                const fate = Math.random() > 0.5 ? 'moon' : 'void';
                const fateBox = document.querySelector(`.fate-box.${fate}`);
                fateBox.style.animation = 'pulse 1s infinite';
                
                setTimeout(() => {
                    fateBox.style.animation = 'none';
                }, 3000);
            }, 2000);
        }
    });

    // Start the animation
    animateBounce();
}); 