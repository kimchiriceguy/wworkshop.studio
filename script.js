document.addEventListener('DOMContentLoaded', () => {
    const introText = document.querySelector('.introtext');
    const scrollText = document.querySelector('.scroll-text');

    // Check if this is the first visit in the session
    if (!sessionStorage.getItem('hasVisited')) {
        // First visit
        introText.style.opacity = '1';
        introText.style.visibility = 'visible';
        
        // Show scroll text after delay
        setTimeout(() => {
            scrollText.style.display = 'block';
        }, 3000);

        // After animations, hide the intro text
        setTimeout(() => {
            introText.style.opacity = '0';
            introText.style.visibility = 'hidden';
        }, 7000);

        // Set session flag
        sessionStorage.setItem('hasVisited', 'true');
    } else {
        // Not first visit - hide intro text immediately
        introText.style.opacity = '0';
        introText.style.visibility = 'hidden';
    }
});

document.addEventListener('scroll', () => {
    const introText = document.querySelector('.introtext');
    const scrollPosition = window.scrollY;
    const triggerPoint = 100;

    if (scrollPosition > triggerPoint) {
        const blurAmount = Math.min((scrollPosition - triggerPoint) / 2, 20);
        const opacity = Math.max(1 - (scrollPosition - triggerPoint) / 200, 0);

        introText.style.filter = `blur(${blurAmount}px)`;
        introText.style.opacity = opacity;
    } else {
        introText.style.filter = 'blur(0px)';
        introText.style.opacity = 1;
    }
});