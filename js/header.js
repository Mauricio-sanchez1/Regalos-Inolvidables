// Espera a que el DOM esté completamente cargado para ejecutar el script
        document.addEventListener('DOMContentLoaded', function () {
            // Variables que guardan referencias a elementos del DOM
            const menuToggle = document.querySelector('.menu-toggle');
            const mainNav = document.querySelector('.main-nav');
            const searchToggle = document.querySelector('.search-toggle');
            const searchContainer = document.querySelector('.search-container');
            const userActions = document.querySelector('.user-actions');
            const header = document.querySelector('header');

            // Evento para mostrar u ocultar el menú principal cuando se hace clic en el botón de menú
            menuToggle.addEventListener('click', function () {
                mainNav.classList.toggle('active');   // Activa o desactiva la clase "active" en el menú principal
                userActions.classList.toggle('active'); // Muestra u oculta las acciones de usuario (login)
                if (searchContainer.classList.contains('active')) {
                    searchContainer.classList.remove('active'); // Cierra el buscador si está abierto
                }
            });

            // Evento para mostrar u ocultar la barra de búsqueda cuando se hace clic en el icono de búsqueda
            searchToggle.addEventListener('click', function () {
                searchContainer.classList.toggle('active'); // Activa o desactiva la búsqueda
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active'); // Cierra el menú si está abierto
                }
                if (userActions.classList.contains('active')) {
                    userActions.classList.remove('active'); // Cierra las acciones de usuario si están activas
                }
            });

            // Evento para cerrar menús cuando se hace clic fuera del header
            document.addEventListener('click', function (event) {
                // Comprueba si el clic NO ocurrió dentro del header ni en los botones menú o búsqueda
                if (!header.contains(event.target) &&
                    !menuToggle.contains(event.target) &&
                    !searchToggle.contains(event.target)) {
                    mainNav.classList.remove('active'); // Cierra el menú principal
                    searchContainer.classList.remove('active'); // Cierra la barra de búsqueda
                    userActions.classList.remove('active'); // Cierra las acciones de usuario
                }
            });
        });