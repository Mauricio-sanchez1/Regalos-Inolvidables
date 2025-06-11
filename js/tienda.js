document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.producto-card').forEach(function(card) {
        const fotos = card.querySelectorAll('.producto-fotos img');
        const indicadores = card.querySelectorAll('.foto-indicadores span');
        if (fotos.length < 2) return;

        indicadores.forEach((indicador, idx) => {
            indicador.addEventListener('click', function() {
                fotos.forEach((img, i) => {
                    img.classList.toggle('foto-activa', i === idx);
                    img.classList.toggle('foto-secundaria', i !== idx);
                });
                indicadores.forEach((dot, j) => {
                    dot.classList.toggle('activo', j === idx);
                });
            });
        });
    });
});