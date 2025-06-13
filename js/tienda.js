document.querySelectorAll('.producto-fotos').forEach(function(fotos) {
    const imagenes = fotos.querySelectorAll('img');
    const indicadores = fotos.querySelectorAll('.foto-indicadores span');

    function mostrarImagen(idx) {
        imagenes.forEach((img, i) => {
            img.style.opacity = i === idx ? 1 : 0;
            img.style.zIndex = i === idx ? 2 : 1;
        });
        indicadores.forEach((ind, i) => {
            ind.classList.toggle('activo', i === idx);
        });
    }

    indicadores.forEach((indicador, idx) => {
        indicador.addEventListener('click', function() {
            mostrarImagen(idx);
        });
        // Opcional: cambia la imagen al pasar el mouse sobre el círculo
        indicador.addEventListener('mouseenter', function() {
            mostrarImagen(idx);
        });
    });

    fotos.addEventListener('mouseleave', function() {
        mostrarImagen(0);
    });

    // Inicializa mostrando la primera imagen
    mostrarImagen(0);
});
