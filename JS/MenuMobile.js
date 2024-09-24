// Selecciona el botón del menú, el menú desplegable y el overlay
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.querySelector('.overlay');
const navClose = document.querySelector('.nav-close');

// Función para mostrar/ocultar el menú y el overlay
const toggleMenu = () => {
    navMenu.classList.toggle('show');
    overlay.classList.toggle('show');
};

// Agrega un evento de clic al botón del menú
navToggle.addEventListener('click', toggleMenu);

// Agrega un evento de clic al overlay para cerrar el menú
overlay.addEventListener('click', () => {
    navMenu.classList.remove('show');
    overlay.classList.remove('show');
});

// Agrega un evento de clic al botón de cerrar el menú
navClose.addEventListener('click', () => {
    navMenu.classList.remove('show');
    overlay.classList.remove('show');
});
