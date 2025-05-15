document.addEventListener("DOMContentLoaded", function() {
    const banner = document.querySelector(".banner");
    let scrollSpeed = 50; // Adjust speed

    function scrollBanner() {
        banner.innerHTML = banner.innerHTML + " " + banner.innerHTML;
        banner.style.whiteSpace = "nowrap";
        banner.style.overflow = "hidden";
        let position = 0;

        setInterval(() => {
            position--;
            banner.style.transform = `translateX(${position}px)`;
        }, scrollSpeed);
    }

    scrollBanner();
});

