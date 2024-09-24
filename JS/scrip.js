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




function scrollToSection() {
    var section = document.querySelector('.section'); // Selecciona el primer elemento con la clase 'section'
    if (section) {
      var sectionPosition = section.getBoundingClientRect().top; // Obtiene la posición superior de la sección
      var currentPosition = window.pageYOffset || document.documentElement.scrollTop; // Obtiene la posición actual de desplazamiento de la ventana
      var newPosition = sectionPosition + currentPosition + 720; // Calcula la nueva posición sumando 50px
      window.scrollTo({ top: newPosition, behavior: 'smooth' }); // Desplaza suavemente la ventana a la nueva posición
    }
  }

  function loadContent() {
    fetch('pagina.html')
        .then(response => response.text())
        .then(data => {
            const contentContainer = document.getElementById('content-container');
            contentContainer.innerHTML = data;
            contentContainer.classList.remove('hidden');

            // Scroll to the newly loaded content
            contentContainer.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => console.error('Error loading content:', error));
}
// Función que realiza el desplazamiento hacia abajo

function scrollToSection() {
    var section = document.querySelector('.section'); // Selecciona el primer elemento con la clase 'section'
    if (section) {
      var sectionPosition = section.getBoundingClientRect().top; // Obtiene la posición superior de la sección
      var currentPosition = window.pageYOffset || document.documentElement.scrollTop; // Obtiene la posición actual de desplazamiento de la ventana
      var newPosition = sectionPosition + currentPosition; // Calcula la nueva posición
      window.scrollTo({ top: newPosition, behavior: 'smooth' }); // Desplaza suavemente la ventana a la nueva posición
    }
  }


