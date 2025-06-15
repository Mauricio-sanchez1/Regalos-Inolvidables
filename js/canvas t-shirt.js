const canvas = new fabric.Canvas('camiseta-canvas');
let camisetaImgObj = null;
let colorCamisaActual = "blanca"; // Valor por defecto

// Cargar imagen de camisa por defecto (blanca)
fabric.Image.fromURL('productos/imagenes_productos/camisas/camisa 1.png', function(img) {
    img.selectable = false;
    img.evented = false;
    img.scaleToWidth(400);
    camisetaImgObj = img;
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    colorCamisaActual = "blanca";
});

// Cambia la imagen de la camisa al hacer clic en las miniaturas de camisa
document.querySelectorAll('.miniatura-camisa').forEach(function(mini) {
    mini.addEventListener('click', function() {
        document.querySelectorAll('.miniatura-camisa').forEach(m => m.classList.remove('selected'));
        mini.classList.add('selected');
        const nuevaRuta = mini.getAttribute('data-camisa');
        fabric.Image.fromURL(nuevaRuta, function(img) {
            img.selectable = false;
            img.evented = false;
            img.scaleToWidth(400);
            camisetaImgObj = img;
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        });
        // Detecta el color de la camisa (puedes usar un atributo data-color en el HTML)
        colorCamisaActual = mini.getAttribute('data-color') || "blanca";

        // Reasigna el límite de escalado a todos los objetos del canvas
        canvas.getObjects().forEach(function(obj) {
            if (obj.type === 'image' && obj !== camisetaImgObj) {
                // Elimina listeners anteriores para evitar duplicados
                obj.off('scaling');
                aplicarLimiteEscalado(obj);
            }
        });
    });
});

function aplicarLimiteEscalado(img) {
    if (colorCamisaActual === "blanca") {
        const maxWidth = 100;
        const maxHeight = 152;
        let scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
        img.scale(scale);

        img.on('scaling', function() {
            let scaleX = img.scaleX;
            let scaleY = img.scaleY;
            let newWidth = img.width * scaleX;
            let newHeight = img.height * scaleY;
            let limited = false;

            // Limita el escalado en tiempo real
            if (newWidth > maxWidth || newHeight > maxHeight) {
                const limitScale = Math.min(maxWidth / img.width, maxHeight / img.height);
                img.scaleX = limitScale;
                img.scaleY = limitScale;
                limited = true;
            }
            if (limited && !img._limitMsgShown) {
                alert("No puedes escalar el diseño más allá del tamaño A4 en camisa blanca.");
                img._limitMsgShown = true;
            }
            if (!limited) {
                img._limitMsgShown = false;
            }
        });

        img.setControlsVisibility({ mt: true, mb: true, ml: true, mr: true, bl: true, br: true, tl: true, tr: true, mtr: true });
        img.lockUniScaling = false;
    } else {
        img.scaleToWidth(100);
    }
}

// Subir imagen de diseño
document.getElementById('upload-img').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    // Limitar tamaño del archivo (por ejemplo, 2MB)
    const maxSizeMB = 2;
    if (file.size > maxSizeMB * 1024 * 1024) {
        alert("El archivo es demasiado grande. Máximo permitido: 2MB.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (f) {
        fabric.Image.fromURL(f.target.result, function (img) {
            img.left = 150;
            img.top = 120;
            img.hasBorders = true;
            img.hasControls = true;
            aplicarLimiteEscalado(img);
            canvas.add(img);
            canvas.setActiveObject(img);
        });
    };
    reader.readAsDataURL(file);
});

document.getElementById('eliminar-img').addEventListener('click', function () {
    const objetoActivo = canvas.getActiveObject();
    if (objetoActivo) {
        canvas.remove(objetoActivo);
    }
});

// Permite agregar una imagen predefinida al hacer clic en la miniatura
document.querySelectorAll('.miniatura-diseño').forEach(function(imgMini) {
    imgMini.addEventListener('click', function() {
        fabric.Image.fromURL(imgMini.src, function(img) {
            img.left = 150;
            img.top = 120;
            img.hasBorders = true;
            img.hasControls = true;
            aplicarLimiteEscalado(img);
            canvas.add(img);
            canvas.setActiveObject(img);
        });
    });
});

document.getElementById('hacer-pedido').addEventListener('click', function() {
    const talla = document.getElementById('talla').value;
    const tipo = document.getElementById('tipo-impresion').value;
    const mensaje = encodeURIComponent(
        `Quiero hacer realidad mi regalo\nTalla: ${talla}\nTipo de impresión: ${tipo.toUpperCase()}`
    );
    // Reemplaza 50361485863 por tu número de WhatsApp real (con código de país, sin +)
    const numero = "50361485863";
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, '_blank');
});

document.getElementById('descargar-camisa').addEventListener('click', function() {
    const dataURL = canvas.toDataURL({
        format: 'png'
    });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'mi-camisa-personalizada.png';
    link.click();
});

fabric.Object.prototype.cornerSize = 32; // Tamaño más grande para los controles
fabric.Object.prototype.touchCornerSize = 48; // Mejor para pantallas táctiles

// Selecciona los elementos a mostrar/ocultar
const infoTransfer = document.getElementById('info-impresion Transfer');
const infoDTF = document.getElementById('info-impresion DTF');
const precioTransfer = document.querySelector('.precio-transfer');
const precioDTF = document.querySelector('.precio-DTF');
const tipoImpresion = document.getElementById('tipo-impresion');
const miniaturasCamisa = document.querySelectorAll('.miniatura-camisa');

// Función para actualizar la interfaz según el color
function actualizarInfoPorColor(color) {
    if (color === 'blanca') {
        infoTransfer.style.display = 'block';
        infoDTF.style.display = 'none';
        precioTransfer.style.display = 'block';
        precioDTF.style.display = 'none';
        tipoImpresion.value = 'transfer';
    } else {
        infoTransfer.style.display = 'none';
        infoDTF.style.display = 'block';
        precioTransfer.style.display = 'none';
        precioDTF.style.display = 'block';
        tipoImpresion.value = 'dtf';
    }
}

// Al hacer clic en una miniatura de camisa
miniaturasCamisa.forEach(function(mini) {
    mini.addEventListener('click', function() {
        const color = mini.getAttribute('data-color');
        // Quita la clase selected de todas y ponla solo a la actual
        miniaturasCamisa.forEach(m => m.classList.remove('selected'));
        mini.classList.add('selected');
        actualizarInfoPorColor(color);
    });
});

// Al cambiar el tipo de impresión manualmente
tipoImpresion.addEventListener('change', function() {
    if (tipoImpresion.value === 'transfer') {
        // Selecciona la camisa blanca
        miniaturasCamisa.forEach(mini => {
            if (mini.getAttribute('data-color') === 'blanca') {
                mini.click();
            }
        });
    } else if (tipoImpresion.value === 'dtf') {
        // Selecciona la primera camisa de color (no blanca)
        let seleccionada = false;
        miniaturasCamisa.forEach(mini => {
            if (!seleccionada && mini.getAttribute('data-color') !== 'blanca') {
                mini.click();
                seleccionada = true;
            }
        });
    }
});

// Aplica la regla al cargar la página (por si la blanca está seleccionada)
actualizarInfoPorColor('blanca');