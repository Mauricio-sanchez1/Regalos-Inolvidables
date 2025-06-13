document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.product-coverflow', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        loop: true,
        speed: 4000,
        coverflowEffect: {
            rotate: 0,
            stretch: 40,
            depth: 200,
            modifier: 1.5,
            scale: 0.90,
            slideShadows: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        breakpoints: {
            0: {
                slidesPerView: 3,
                coverflowEffect: {
                    stretch: 40,
                    depth: 200,
                    scale: 0.90,
                }
            },
            300: { // Para pantallas de 360px de ancho
                slidesPerView: 2,
                coverflowEffect: {
                    stretch: 40,
                    depth: 200,
                    scale: 0.90,
                }
            },
            600: {
                slidesPerView: 3
            },
            900: {
                slidesPerView: 3
            }
        }
        // Mantén los mismos parámetros en todos los tamaños para que se vea igual
        
    });

    // Reanuda autoplay 5 segundos después de quitar el mouse
    let resumeTimeout;
    const swiperEl = document.querySelector('.product-coverflow');
    swiperEl.addEventListener('mouseleave', () => {
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            swiper.autoplay.start();
        }, 5000);
    });
    swiperEl.addEventListener('mouseenter', () => {
        clearTimeout(resumeTimeout);
        swiper.autoplay.stop();
    });
});