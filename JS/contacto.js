window.addEventListener('scroll', function () {
    var logo = document.querySelector('.logo');
    if (window.scrollY > 100) { // Cambia este valor según tu preferencia
        logo.classList.add('fixed');
    } else {
        logo.classList.remove('fixed');
    }
});

// Evento que se activa cuando el contenido de la página ha sido cargado
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



/* Esto es para que se pueda visualizar la ubicacion exacta del local solo que ocupo el correo ya que se vincula a la api de google maps
Función para inicializar el mapa
function initMap() {
    var myLatLng = {lat: 17.833913, lng: -93.383953}; // Coordenadas de la ubicación

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15, // Nivel de zoom
        center: myLatLng // Centro del mapa
    });

    var marker = new google.maps.Marker({
        position: myLatLng, // Posición del marcador
        map: map, // Mapa al que se agrega el marcador
        title: 'Mi Ubicación' // Título del marcador (opcional)
    });
}
*/ 