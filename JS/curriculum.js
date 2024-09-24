function loadHiddenPage() {
  var container = document.getElementById('hiddenPageContainer');
  if (container.style.display === 'none' || container.style.display === '') {
    fetch('Trayectoria.html')
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data;
        container.style.display = 'block';
        // Posicionar el contenedor debajo del botón
        var buttonRect = document.querySelector('.boton-trayectoria').getBoundingClientRect();
        container.style.top = buttonRect.bottom + 'px';
      })
      .catch(error => console.error('Error al cargar la página:', error));
  } else {
    container.style.display = 'none';
  }
}