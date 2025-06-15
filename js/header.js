document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('header');
    let overlay = null;

    function openMenu() {
        mainNav.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', closeMenu);
        }
        overlay.style.display = 'block';
    }

    function closeMenu() {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        if (overlay) overlay.style.display = 'none';
    }

    if (menuToggle && mainNav && header) {
        menuToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            if (mainNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Cierra el menú al hacer clic fuera
        document.addEventListener('click', function (event) {
            if (
                mainNav.classList.contains('active') &&
                !header.contains(event.target) &&
                !mainNav.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Evita que los clics dentro del menú cierren el menú
        mainNav.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        // Cierra el menú al hacer clic en cualquier enlace del menú
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                closeMenu();
                // El enlace funcionará normalmente y hará scroll a la sección
            });
        });
    }
});