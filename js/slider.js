/* --- Funcionalidad Unificada del Slider de Imágenes (Web y Táctil) --- */

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el contenedor principal del slider donde se aplicará la transformación
    const slider = document.querySelector('.slider');
    // Selecciona todas las diapositivas individuales
    const slides = document.querySelectorAll('.slide');
    // Selecciona el contenedor que envuelve el slider, útil para eventos de ratón/toque
    const sliderContainer = document.querySelector('.slider-container');

    const totalSlides = slides.length;
    let currentIndex = 0; // Índice de la diapositiva actual
    let autoSlideInterval; // Variable para almacenar el ID del intervalo de auto-avance

    // Variables para el soporte táctil (swipe)
    let startX = 0; // Coordenada X inicial del toque/arrastre
    let isSwiping = false; // Bandera para indicar si se está realizando un swipe

    // Si no hay diapositivas encontradas, muestra una advertencia y detiene la ejecución del script.
    if (totalSlides === 0) {
        console.warn('No slides found in the slider. Please check your HTML structure.');
        return;
    }

    /**
     * Mueve el slider a la diapositiva especificada por el índice.
     * Recalcula el ancho de la diapositiva para asegurar la correcta visualización en pantallas de distinto tamaño.
     * @param {number} index El índice de la diapositiva a la que se debe mover el slider.
     */
    const moveToSlide = (index) => {
        // Asegura que el índice esté dentro de los límites válidos
        currentIndex = (index + totalSlides) % totalSlides;
        // Recalcula el ancho de una diapositiva en cada movimiento para adaptarse a cambios de tamaño.
        const slideWidth = slides[0].clientWidth;
        // Aplica la transformación CSS para desplazar el slider
        slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    };

    /**
     * Avanza a la siguiente diapositiva, volviendo al inicio si se llega al final.
     */
    const nextSlide = () => {
        moveToSlide(currentIndex + 1);
    };

    /**
     * Retrocede a la diapositiva anterior, yendo al final si se está en la primera.
     */
    const prevSlide = () => {
        moveToSlide(currentIndex - 1);
    };

    /**
     * Inicia o reinicia el auto-avance del slider.
     * Limpia cualquier intervalo existente antes de crear uno nuevo.
     */
    const startAutoSlide = () => {
        clearInterval(autoSlideInterval); // Detiene cualquier intervalo anterior
        autoSlideInterval = setInterval(nextSlide, 6000); // Inicia un nuevo intervalo (8 segundos)
    };

    /**
     * Detiene el auto-avance del slider.
     */
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // --- Inicialización y Eventos Generales ---

    // Posiciona el slider en la primera diapositiva al cargar la página.
    moveToSlide(currentIndex);
    // Inicia el auto-avance al cargar.
    startAutoSlide();

    // --- Manejo de la Interacción del Ratón (Pausar/Reanudar auto-avance) ---

    if (sliderContainer) { // Asegura que el contenedor exista
        sliderContainer.addEventListener('mouseenter', stopAutoSlide); // Pausa al pasar el ratón
        sliderContainer.addEventListener('mouseleave', startAutoSlide); // Reanuda al quitar el ratón
    }

    // --- Manejo de los Botones de Navegación ---

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (prevButton && nextButton) { // Solo si los botones existen en el HTML
        prevButton.addEventListener('click', () => {
            stopAutoSlide(); // Pausa el auto-avance
            prevSlide(); // Va a la diapositiva anterior
            startAutoSlide(); // Reinicia el auto-avance después de la interacción
        });

        nextButton.addEventListener('click', () => {
            stopAutoSlide(); // Pausa el auto-avance
            nextSlide(); // Va a la diapositiva siguiente
            startAutoSlide(); // Reinicia el auto-avance
        });
    }

    // --- Funcionalidad para Deslizamiento Táctil (Swipe) ---

    if (sliderContainer) { // Asegura que el contenedor exista para los eventos táctiles
        // 1. Cuando el usuario toca la pantalla (touchstart)
        sliderContainer.addEventListener('touchstart', (e) => {
            stopAutoSlide(); // Pausa el auto-avance al iniciar un toque
            startX = e.touches[0].clientX; // Guarda la posición X inicial del toque
            isSwiping = true; // Indica que se ha iniciado un posible deslizamiento
            // Desactiva la transición CSS para un movimiento inmediato durante el arrastre,
            // lo que hace que el slider "siga el dedo" sin retardo.
            slider.style.transition = 'transform 0s ease-out';
        });

        // 2. Mientras el usuario arrastra el dedo (touchmove)
        sliderContainer.addEventListener('touchmove', (e) => {
            if (!isSwiping) return; // Si no estamos en un deslizamiento, no hagas nada
            e.preventDefault(); // Evita el scroll vertical de la página mientras se hace swipe horizontal

            const currentX = e.touches[0].clientX; // Posición X actual del dedo
            const diffX = startX - currentX; // Diferencia de movimiento horizontal

            // Calcula el porcentaje de desplazamiento basado en el ancho del contenedor.
            // Esto crea el efecto de "seguir el dedo" mientras se arrastra.
            const currentOffset = -currentIndex * slides[0].clientWidth; // Posición base de la slide actual
            const newTransform = currentOffset - diffX;
            slider.style.transform = `translateX(${newTransform}px)`;
        });

        // 3. Cuando el usuario levanta el dedo (touchend)
        sliderContainer.addEventListener('touchend', (e) => {
            if (!isSwiping) return; // Si no estábamos en un deslizamiento, no hagas nada

            const endX = e.changedTouches[0].clientX; // Posición X donde el dedo se levantó
            const diffX = startX - endX; // Diferencia total del movimiento

            // Vuelve a activar la transición CSS para una animación suave al soltar el dedo.
            slider.style.transition = 'transform 0.5s ease-in-out';

            // Determina si el deslizamiento fue lo suficientemente largo para cambiar de slide.
            // Un umbral de 50px es común, pero puedes ajustarlo.
            if (diffX > 50) { // Si se movió más de 50px hacia la izquierda (siguiente slide)
                nextSlide();
            } else if (diffX < -50) { // Si se movió más de 50px hacia la derecha (anterior slide)
                prevSlide();
            } else {
                // Si el deslizamiento no fue suficiente, vuelve a la diapositiva actual.
                moveToSlide(currentIndex);
            }

            isSwiping = false; // Reinicia la bandera de deslizamiento
            startAutoSlide(); // Reinicia el auto-avance después de la interacción táctil
        });

        // Maneja la interrupción del toque (ej. una llamada entrante, cambio de aplicación).
        sliderContainer.addEventListener('touchcancel', () => {
            isSwiping = false;
            // Asegura que el slider vuelva a la posición correcta con transición si el swipe se cancela.
            slider.style.transition = 'transform 0.5s ease-in-out';
            moveToSlide(currentIndex);
            startAutoSlide(); // Reinicia el auto-avance
        });
    }


    // --- Adaptación a Cambios de Tamaño de Ventana ---

    // Escucha el evento de redimensionamiento de la ventana.
    window.addEventListener('resize', () => {
        // Al cambiar el tamaño de la ventana, es crucial reposicionar el slider
        // para que las diapositivas no se desalineen debido al cambio de `slideWidth`.
        moveToSlide(currentIndex);
    });
});