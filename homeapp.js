// splash screen logic
document.addEventListener("DOMContentLoaded", () => {
    const splash = document.querySelector(".splash");
    const video = document.getElementById("splashscreen");

    if (!sessionStorage.getItem("splashShown")) {
        splash.style.display = "block";

        const handleVideoEnd = () => {
            splash.classList.add("fade-out");

            setTimeout(() => {
                splash.style.display = "none";
                sessionStorage.setItem("splashShown", "true");
            }, 1000);
        };

        video.addEventListener("ended", handleVideoEnd);

        setTimeout(() => {
            if (!video.played || !video.played.length) {
                console.log("video didn't play, skipping splash screen");
                handleVideoEnd();
            }
        }, 3000);
    } else {
        splash.style.display = "none";
    }

    initializeCarousel();
    initializeBackgroundVideo();
    initializeThumbnailSlideshow();
});

// carousel functionality
function initializeCarousel() {
    const carouselDom = document.querySelector('.carousel');
    const SliderDom = carouselDom.querySelector('.carousel .list');
    const thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
    const timeDom = document.querySelector('.carousel .time');

    let timeRunning = 3000;
    let runTimeOut;
    let currentSlideIndex = 0;
    setActiveSlide();

    thumbnailBorderDom.addEventListener('click', () => {
        console.log("Thumbnail clicked");
        if (currentSlideIndex < slideTexts.length - 1) {
            showSlider('next');
        }
    });

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

//bg vid
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
        backgroundVideo.play().then(() => {
            backgroundVideo.pause();
            backgroundVideo.currentTime = 0;
            console.log("bg vid works");
        }).catch(e => {
            console.log("Preload failed, may need user interaction:", e);
        });
    }
}

//slideshow if i want to keep it
// function initializeThumbnailSlideshow() {
//     const thumbnailImage = document.getElementById('thumbnail-slideshow');
//     const imageUrls = [
//         './assets/images/homepage2.jpg',
//         './assets/images/homepage1.jpg',
//         './assets/images/homepage3.jpg',
//         './assets/images/bgimg.jpg'
//     ];  // Add the paths to your images here
//     let currentImageIndex = 0;
//     let slideshowInterval;

//     thumbnailImage.addEventListener('mouseenter', () => {
//         slideshowInterval = setInterval(() => {
//             setTimeout(() => {
//                 currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
//                 thumbnailImage.src = imageUrls[currentImageIndex];
//                 thumbnailImage.classList.remove('fade-out');
//                 thumbnailImage.classList.add('fade-in');
//             }, 500);
//         }, 2000);
//     });

//     thumbnailImage.addEventListener('mouseleave', () => {
//         clearInterval(slideshowInterval);
//         thumbnailImage.src = imageUrls[0];
//     });
// }

// document.addEventListener('DOMContentLoaded', () => {
//     initializeThumbnailSlideshow();
// });