window.addEventListener('scroll', function () {
    var logo = document.querySelector('.logo');
    if (window.scrollY > 100) { // Cambia este valor según tu preferencia
        logo.classList.add('fixed');
    } else {
        logo.classList.remove('fixed');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var especialidadBtn = document.getElementById('especialidadBtn');
    var submenu = document.querySelector('.submenu');

    especialidadBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        if (submenu.style.display === 'block') {
            submenu.style.display = 'none';
        } else {
            submenu.style.display = 'block';
        }
    });

    // Ocultar el submenú si se hace clic fuera de él
    document.addEventListener('click', function (event) {
        if (!especialidadBtn.contains(event.target) && !submenu.contains(event.target)) {
            submenu.style.display = 'none';
        }
    });
});
