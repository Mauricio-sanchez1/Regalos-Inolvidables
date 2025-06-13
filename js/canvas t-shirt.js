const canvas = new fabric.Canvas('camiseta-canvas');
let camisetaImgObj = null;

fabric.Image.fromURL('productos/imagenes_productos/camisas/camisa 1.png', function(img) {
                img.selectable = false;
                img.evented = false;
                img.scaleToWidth(400);
                camisetaImgObj = img;
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
            });

            document.getElementById('upload-img').addEventListener('change', function (e) {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = function (f) {
                    fabric.Image.fromURL(f.target.result, function (img) {
                        img.scaleToWidth(100);
                        img.left = 150;
                        img.top = 120;
                        img.hasBorders = true;
                        img.hasControls = true;
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
                        img.scaleToWidth(100);
                        img.left = 150;
                        img.top = 120;
                        img.hasBorders = true;
                        img.hasControls = true;
                        canvas.add(img);
                        canvas.setActiveObject(img);
                    });
                });
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
                });
            });

            document.getElementById('hacer-pedido').addEventListener('click', function() {
                const mensaje = encodeURIComponent("Quiero hacer realidad mi regalo");
                // Reemplaza 573001234567 por tu número de WhatsApp real (con código de país, sin +)
                const numero = "573001234567";
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