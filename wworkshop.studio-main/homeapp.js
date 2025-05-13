//splash
document.addEventListener("DOMContentLoaded", () => {
    const splash = document.querySelector(".splash");
    const video = document.getElementById("splashscreen");

    video.addEventListener("ended", () => {
        splash.classList.add("fade-out");

        setTimeout(() => {
            splash.style.display = "none";
        }, 1000);
    });
});

let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let timeDom = document.querySelector('.carousel .time');

let timeRunning = 3000;

const slideTexts = ["HOME", "ABOUT"]; // Texts for the slides
let currentSlideIndex = 0;

setActiveSlide();

nextDom.onclick = function () {
    if (currentSlideIndex < slideTexts.length - 1) { 
        showSlider('next');
    }
};

prevDom.onclick = function () {
    if (currentSlideIndex > 0) { 
        showSlider('prev');
    }
};

function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

    SliderItemsDom.forEach(item => item.classList.remove('active'));

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
        currentSlideIndex = (currentSlideIndex + 1) % slideTexts.length; // Increment index
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
        currentSlideIndex = (currentSlideIndex - 1 + slideTexts.length) % slideTexts.length; // Decrement index
    }

    updateThumbnailText();

    setActiveSlide();

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);
}

function setActiveSlide() {
    const SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    if (SliderItemsDom.length > 0) {
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
