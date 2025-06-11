document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.product-coverflow', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3, // Muestra 3 cartas (ajusta según tu gusto)
        loop: true,
        coverflowEffect: {
            rotate: 0,      // Sin rotación lateral
            stretch: 0,     // Sin estiramiento lateral
            depth: 200,     // Profundidad 3D
            modifier: 1.5,  // Intensidad del efecto
            scale: 0.85,    // Escala de las cartas laterales
            slideShadows: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});
