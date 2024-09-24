document.addEventListener('DOMContentLoaded', function() {
    var especialidadBtn = document.getElementById('especialidadBtn');
    var citasBtn = document.getElementById('CitasdBtn'); // Corregido el ID
    var otroBtn = document.getElementById('otroBtn'); // Corregido el ID
    var submenu = document.querySelector('.submenu');
    var otroSubmenu = document.querySelector('.submenu2'); // Cambiado a querySelector

    // Evento que se activa al hacer clic en el botón de especialidad
    especialidadBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        if (submenu.style.display === 'block') { // Si el submenú está visible
            submenu.style.display = 'none'; // Oculta el submenú
        } else {
            submenu.style.display = 'block'; // Muestra el submenú
        }
    });

    // Evento que se activa al hacer clic en el botón de cita
    citasBtn.addEventListener('click', function(event) { // Cambiado a citasBtn
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        if (otroSubmenu.style.display === 'block') { // Si el submenú está visible
            otroSubmenu.style.display = 'none'; // Oculta el submenú
        } else {
            otroSubmenu.style.display = 'block'; // Muestra el submenú
        }
    });


    // Ocultar el submenú si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        if (!especialidadBtn.contains(event.target) && !submenu.contains(event.target)) {
            submenu.style.display = 'none'; // Oculta el submenú si el clic no fue en el botón o el submenú
        }
        if (!CitasdBtn.contains(event.target) && !otroSubmenu.contains(event.target)) {
            otroSubmenu.style.display = 'none'; // Oculta el submenú si el clic no fue en el botón o el submenú
        }
    });
});