document.querySelectorAll('.producto-fotos').forEach(function(fotos) {
    const imagenes = fotos.querySelectorAll('img');
    const indicadores = fotos.querySelectorAll('.foto-indicadores span');
    let idxActual = 0;
    let autoplayTimer = null;
    let startX = null;

    function mostrarImagen(idx) {
        idxActual = idx;
        imagenes.forEach((img, i) => {
            img.style.opacity = i === idx ? 1 : 0;
            img.style.zIndex = i === idx ? 2 : 1;
        });
        indicadores.forEach((ind, i) => {
            ind.classList.toggle('activo', i === idx);
        });
    }

    function siguienteImagen() {
        let idx = (idxActual + 1) % imagenes.length;
        mostrarImagen(idx);
    }

    function iniciarAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
        autoplayTimer = setInterval(siguienteImagen, 2000);
    }

    function detenerAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
        autoplayTimer = null;
    }

    // Detecta si es móvil
    function esMovil() {
        return window.matchMedia("(pointer: coarse)").matches;
    }

    // --- Comportamiento para escritorio ---
    if (!esMovil()) {
        fotos.addEventListener('mouseenter', function() {
            iniciarAutoplay();
        });
        fotos.addEventListener('mouseleave', function() {
            detenerAutoplay();
            mostrarImagen(0);
        });
        // Click en indicadores
        indicadores.forEach((indicador, idx) => {
            indicador.addEventListener('click', function(e) {
                e.preventDefault();
                mostrarImagen(idx);
            });
        });
    } else {
        // --- Comportamiento para móvil ---
        let observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    iniciarAutoplay();
                } else {
                    detenerAutoplay();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(fotos);

        // Swipe para móvil
        fotos.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        fotos.addEventListener('touchend', function(e) {
            if (startX === null) return;
            let endX = e.changedTouches[0].clientX;
            let diff = endX - startX;
            if (Math.abs(diff) > 40) {
                detenerAutoplay(); // Detiene autoplay al deslizar
                if (diff > 0) {
                    // Swipe derecha
                    let idx = (idxActual - 1 + imagenes.length) % imagenes.length;
                    mostrarImagen(idx);
                } else {
                    // Swipe izquierda
                    let idx = (idxActual + 1) % imagenes.length;
                    mostrarImagen(idx);
                }
                // Reanuda autoplay después de 5 segundos
                setTimeout(() => {
                    iniciarAutoplay();
                }, 5000);
            }
            startX = null;
        });

        // Click en indicadores
        indicadores.forEach((indicador, idx) => {
            indicador.addEventListener('click', function(e) {
                e.preventDefault();
                mostrarImagen(idx);
            });
        });
    }

    // Inicializa mostrando la primera imagen
    mostrarImagen(0);
});
