// // js abt page wworkshopstudio
// // carousel functionality (just incase i need it)
// function initializeCarousel() {
//     const carouselDom = document.querySelector('.carousel');
//     const SliderDom = carouselDom.querySelector('.carousel .list');
//     const thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
//     const timeDom = document.querySelector('.carousel .time');

//     let timeRunning = 3000;
//     let runTimeOut;
//     let currentSlideIndex = 0;

//     setActiveSlide();

//     thumbnailBorderDom.addEventListener('click', () => {
//         console.log("Thumbnail clicked");
//         if (currentSlideIndex < slideTexts.length - 1) {
//             showSlider('next');
//         }
//     });

//     function setActiveSlide() {
//         const SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
//         if (SliderItemsDom.length > 0) {
//             SliderItemsDom.forEach(item => item.classList.remove('active'));
//             SliderItemsDom[0].classList.add('active');
//         }
//     }

//     function updateThumbnailText() {
//         const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
//         thumbnailItemsDom.forEach((item, index) => {
//             const textElement = item.querySelector('.text');
//             if (textElement) {
//                 textElement.textContent = slideTexts[(currentSlideIndex + index) % slideTexts.length];
//             }
//         });
//     }

//     function showSlider(type) {
//         let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
//         let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

//         if (type === 'next' && currentSlideIndex < slideTexts.length - 1) {
//             SliderDom.appendChild(SliderItemsDom[0]);
//             thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
//             carouselDom.classList.add('next');
//             currentSlideIndex = (currentSlideIndex + 1) % slideTexts.length;
//         } else if (type === 'prev' && currentSlideIndex > 0) {
//             SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
//             thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
//             carouselDom.classList.add('prev');
//             currentSlideIndex = (currentSlideIndex - 1 + slideTexts.length) % slideTexts.length;
//         }

//         updateThumbnailText();
//         setActiveSlide();

//         clearTimeout(runTimeOut);
//         runTimeOut = setTimeout(() => {
//             carouselDom.classList.remove('next');
//             carouselDom.classList.remove('prev');
//         }, timeRunning);
//     }
// }



