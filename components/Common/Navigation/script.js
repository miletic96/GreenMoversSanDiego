const navbarEl = document.getElementById('main-nav');
const navbarInfoEl = document.getElementsByClassName('navbar-info')[0];
const navbarBrandImageEl = document.getElementById('navbar-brand-image');

const OFFSET_TOP_VALUE = 20;

const toggleNavbarInfoDisplay = () => {
    const scrollOffsetY = window.scrollY;

    if (scrollOffsetY > OFFSET_TOP_VALUE) {
        if (navbarInfoEl.classList.contains('d-none')) return;
        navbarInfoEl.classList.add('d-none');

        if (!navbarEl.classList.contains('initial-nav')) return;
        navbarEl.classList.remove('initial-nav');
    } else {
        if (!navbarInfoEl.classList.contains('d-none')) return;
        navbarInfoEl.classList.remove('d-none');

        if (navbarEl.classList.contains('initial-nav')) return;
        navbarEl.classList.add('initial-nav');
    }
};

const toggleNavbarBrandImage = () => {
    const scrollOffsetY = window.scrollY;

    const darkLogo = '/assets/images/GreenMoversLogo.jpg';
    const whiteLogo = '/assets/images/GreenMoversLogo.jpg';

    const currentLogo = navbarBrandImageEl.getAttribute('src');

    if (window.innerWidth < 992) {
        navbarBrandImageEl.setAttribute('src', darkLogo);
        return;
    }

    if (scrollOffsetY > OFFSET_TOP_VALUE) {
        if (currentLogo === darkLogo) return;
        navbarBrandImageEl.setAttribute('src', darkLogo);
    } else {
        if (currentLogo === whiteLogo) return;
        navbarBrandImageEl.setAttribute('src', whiteLogo);
    }
};

toggleNavbarBrandImage();

window.addEventListener('scroll', () => {
    toggleNavbarInfoDisplay();
    toggleNavbarBrandImage();
});

window.addEventListener('resize', () => {
    toggleNavbarBrandImage();
});
