// Main JavaScript for Workshop Studio Homepage

// Splash screen logic
document.addEventListener("DOMContentLoaded", () => {
    const splash = document.querySelector(".splash");
    const video = document.getElementById("splashscreen");

    // Check if splash has been shown this session
    if (!sessionStorage.getItem("splashShown")) {
        splash.style.display = "block";

        // Function to handle the end of the video
        const handleVideoEnd = () => {
            splash.classList.add("fade-out");

            setTimeout(() => {
                splash.style.display = "none";
                sessionStorage.setItem("splashShown", "true");
            }, 1000);
        };

        // Add event listener for video ending
        video.addEventListener("ended", handleVideoEnd);
        
        // Fallback in case video doesn't load or play
        setTimeout(() => {
            if (!video.played || !video.played.length) {
                console.log("Video didn't play, skipping splash screen");
                handleVideoEnd();
            }
        }, 3000);
    } else {
        splash.style.display = "none";
    }

    // Initialize carousel and other functionality after DOM is loaded
    initializeCarousel();
    initializeBackgroundVideo();
});

// Carousel functionality
function initializeCarousel() {
    const carouselDom = document.querySelector('.carousel');
    const SliderDom = carouselDom.querySelector('.carousel .list');
    const thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
    const timeDom = document.querySelector('.carousel .time');

    let timeRunning = 3000;
    let runTimeOut;
    const slideTexts = ["HOME", "ABOUT"]; // Texts for the slides
    let currentSlideIndex = 0;

    // Set initial active slide
    setActiveSlide();

    // Add click event to thumbnail for navigation
    thumbnailBorderDom.addEventListener('click', () => {
        console.log("Thumbnail clicked");
        if (currentSlideIndex < slideTexts.length - 1) {
            showSlider('next');
        }
    });

    // Carousel functions
    function setActiveSlide() {
        const SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
        if (SliderItemsDom.length > 0) {
            SliderItemsDom.forEach(item => item.classList.remove('active'));
            SliderItemsDom[0].classList.add('active');
        }
    }

    function updateThumbnailText() {
        const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
        thumbnailItemsDom.forEach((item, index) => {
            const textElement = item.querySelector('.text');
            if (textElement) {
                textElement.textContent = slideTexts[(currentSlideIndex + index) % slideTexts.length];
            }
        });
    }

    function showSlider(type) {
        let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
        let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

        if (type === 'next' && currentSlideIndex < slideTexts.length - 1) {
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.add('next');
            currentSlideIndex = (currentSlideIndex + 1) % slideTexts.length;
        } else if (type === 'prev' && currentSlideIndex > 0) {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.classList.add('prev');
            currentSlideIndex = (currentSlideIndex - 1 + slideTexts.length) % slideTexts.length;
        }

        updateThumbnailText();
        setActiveSlide();

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);
    }
}

// Background video hover functionality
function initializeBackgroundVideo() {
    const thumbnail = document.querySelector('.thumbnail');
    const backgroundVideo = document.getElementById('background-video');

    // play video on initial hover
    thumbnail.addEventListener('mouseenter', () => {
        console.log("Hovering over thumbnail"); 
        backgroundVideo.style.opacity = '0.2'; 
        backgroundVideo.play(); // Play the video
    });

    // when mouse leaves the thumbnail, pause the video and reset it
    thumbnail.addEventListener('mouseleave', () => {
        console.log("Hovering off thumbnail");
        backgroundVideo.style.opacity = '0';
        backgroundVideo.pause();
        backgroundVideo.currentTime = 0; 
    });
}

// Preload video to ensure it's ready to play
function preloadBackgroundVideo() {
    const backgroundVideo = document.getElementById('background-video');
    
    if (backgroundVideo) {
        backgroundVideo.load();
        // Try to play and immediately pause to prepare the video
        backgroundVideo.play().then(() => {
            backgroundVideo.pause();
            backgroundVideo.currentTime = 0;
            console.log("Background video preloaded successfully");
        }).catch(e => {
            console.log("Preload failed, may need user interaction:", e);
        });
    }
}