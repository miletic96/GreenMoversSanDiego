const sliderEl = document.getElementById('testimonial-slider');
const sliderBackButtonEl = document.querySelector(
    '.slider-wrapper .slider-back'
);
const sliderForwardButtonEl = document.querySelector(
    '.slider-wrapper .slider-forward'
);

const numberOfSlides = document.querySelectorAll(
    '#testimonial-slider .slide-item'
).length;

let slideIndex = 1;
let translateX = 0;

const goToPreviousSlide = () => {
    if (slideIndex !== 1) {
        slideIndex--;
        translateX += 100;
    }

    sliderEl.style.transform = `translateX(${translateX}%)`;
};

const goToNextSlide = () => {
    if (slideIndex !== numberOfSlides) {
        slideIndex++;
        translateX -= 100;
    }
    sliderEl.style.transform = `translateX(${translateX}%)`;
};

sliderBackButtonEl.addEventListener('click', () => {
    goToPreviousSlide();
});

sliderForwardButtonEl.addEventListener('click', () => {
    goToNextSlide();
});
