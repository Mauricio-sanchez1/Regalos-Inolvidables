document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-container');
    const header = document.querySelector('header');

    if (menuToggle && mainNav && header) {
        menuToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            mainNav.classList.toggle('active');
            if (searchContainer && searchContainer.classList.contains('active')) {
                searchContainer.classList.remove('active');
            }
        });

        if (searchToggle && searchContainer) {
            searchToggle.addEventListener('click', function (event) {
                event.stopPropagation();
                searchContainer.classList.toggle('active');
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            });
        }

        document.addEventListener('click', function (event) {
            if (!header.contains(event.target)) {
                mainNav.classList.remove('active');
                if (searchContainer) searchContainer.classList.remove('active');
            }
        });
    }
});
