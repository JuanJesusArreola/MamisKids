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
    var citasBtn = document.getElementById('CitasdBtn'); // Corregido el ID
    var otroBtn = document.getElementById('CitasdBtn'); // Corregido el ID
    var submenu = document.querySelector('.submenu');
    var otroSubmenu = document.querySelector('.submenu2'); // Cambiado a querySelector

    // Evento que se activa al hacer clic en el botón de especialidad
    especialidadBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        if (submenu.style.display === 'block') { // Si el submenú está visible
            submenu.style.display = 'none'; // Oculta el submenú
        } else {
            submenu.style.display = 'block'; // Muestra el submenú
        }
    });

    // Evento que se activa al hacer clic en el botón de cita
    citasBtn.addEventListener('click', function (event) { // Cambiado a citasBtn
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        if (otroSubmenu.style.display === 'block') { // Si el submenú está visible
            otroSubmenu.style.display = 'none'; // Oculta el submenú
        } else {
            otroSubmenu.style.display = 'block'; // Muestra el submenú
        }
    });


    // Ocultar el submenú si se hace clic fuera de él
    document.addEventListener('click', function (event) {
        if (!especialidadBtn.contains(event.target) && !submenu.contains(event.target)) {
            submenu.style.display = 'none'; // Oculta el submenú si el clic no fue en el botón o el submenú
        }
        if (!citasBtn.contains(event.target) && !otroSubmenu.contains(event.target)) {
            otroSubmenu.style.display = 'none'; // Oculta el submenú si el clic no fue en el botón o el submenú
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("citaForm");
    const nombreInput = document.getElementById("nombrePaciente");
    const apellidosInput = document.getElementById("apellidosPaciente");
    const nombretutorInput = document.getElementById("nombreTutor");
    const apellidostutorInput = document.getElementById("apellidosTutor");
    const edadInput = document.getElementById("edadPaciente");
    const motivoInput = document.getElementById("motivoConsulta"); // Corregido el ID
    const telefonoInput = document.getElementById("telefono");
    const correoInput = document.getElementById("correoElectronico");
    const fechaCitaInput = document.getElementById("fechaCita");

    // Validaciones de entrada
    nombreInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); // Solo letras y espacios
    });

    apellidosInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); // Solo letras y espacios
    });

    edadInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, ''); // Solo números
        if (this.value.length > 3) {
            this.value = this.value.slice(0, 3); // No más de 3 dígitos
        }
        if (this.value > 120) {
            this.value = 120; // Máximo 120 años
        }
    });

    motivoInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z0-9\s]/g, ''); // Sin caracteres especiales
        const wordCount = this.value.split(/\s+/).length;
        if (wordCount > 250) {
            const words = this.value.split(/\s+/).slice(0, 250);
            this.value = words.join(" ");
        }
    });

    telefonoInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, ''); // Solo números
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10); // Máximo 10 dígitos
        }
    });

    fechaCitaInput.addEventListener("input", function () {
        const selectedDate = new Date(fechaCitaInput.value);
        const dayOfWeek = selectedDate.getUTCDay();

        if (dayOfWeek === 0) { // 0 significa domingo
            showTooltip(fechaCitaInput, "No se pueden agendar citas en domingo");
            fechaCitaInput.value = ''; // Vaciar el campo de fecha
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (
            nombreInput.value.trim() === "" ||
            apellidosInput.value.trim() === "" ||
            edadInput.value.trim() === "" ||
            motivoInput.value.trim() === "" ||
            telefonoInput.value.trim() === "" ||
            correoInput.value.trim() === "" ||
            fechaCitaInput.value.trim() === ""
        ) {
            // Mostrar tooltips de error
            if (nombreInput.value.trim() === "") {
                showTooltip(nombreInput, "Campo obligatorio");
            }
            if (apellidosInput.value.trim() === "") {
                showTooltip(apellidosInput, "Campo obligatorio");
            }
            if (edadInput.value.trim() === "") {
                showTooltip(edadInput, "Campo obligatorio");
            }
            if (motivoInput.value.trim() === "") {
                showTooltip(motivoInput, "Campo obligatorio");
            }
            if (telefonoInput.value.trim() === "") {
                showTooltip(telefonoInput, "Campo obligatorio");
            }
            if (correoInput.value.trim() === "") {
                showTooltip(correoInput, "Campo obligatorio");
            }
            if (fechaCitaInput.value.trim() === "") {
                showTooltip(fechaCitaInput, "Campo obligatorio");
            }
        } else {
            // Si todos los campos están llenos, enviar el formulario
            sendFormData();
            console.log("Se envió el formulario");
        }
    });

    // Función para mostrar tooltips de error
    function showTooltip(input, message) {
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = message;

        // Posicionamiento del tooltip
        const inputRect = input.getBoundingClientRect();
        const tooltipTop = inputRect.top - tooltip.offsetHeight + 13;
        const tooltipLeft = inputRect.left + inputRect.width / 1 - tooltip.offsetWidth / 5;

        tooltip.style.top = tooltipTop + "px";
        tooltip.style.left = tooltipLeft + "px";

        // Insertar tooltip en el DOM
        document.body.appendChild(tooltip);

        // Mostrar el tooltip con una animación
        setTimeout(function () {
            tooltip.classList.add("show");
        }, 10);

        // Ocultar el tooltip después de un tiempo
        setTimeout(function () {
            tooltip.classList.remove("show");
            // Eliminar el tooltip del DOM después de ocultarlo
            setTimeout(function () {
                tooltip.remove();
            }, 300);
        }, 3000);
    }

    function sendFormData() {
        // Obtener los valores de los campos del formulario
        const patientName = nombreInput.value;
        const patientLastName = apellidosInput.value;
        const patientAge = edadInput.value;
        const tutorName = nombretutorInput.value;
        const tutorLastName = apellidostutorInput.value;
        const phoneNumber = telefonoInput.value;
        const email = correoInput.value;
        const appointmentDate = fechaCitaInput.value;
        const motivo = motivoInput.value;

        // Formatear la fecha al formato yyyy-mm-dd
        const formattedDate = new Date(appointmentDate).toISOString().split('T')[0];

        // Crear objeto con los datos del formulario
        const data = {
            ApellidosTutor: tutorLastName,
            ApellidosPaciente: patientLastName,
            EdadPac: patientAge,
            NombreTutor: tutorName,
            NombrePaciente: patientName,
            TelefonoPaciente: phoneNumber,
            CorreoPaciente: email,
            Motivo: motivo,
            FechaCita: formattedDate,
            FechaOrden: new Date().toISOString(),
            NombreEspecialidad: "Terapia"
        };

        // URL de la API
        const url = 'https://localhost:7269/AgendarCitaTerapia';

        // Opciones para la solicitud
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        // Enviar la solicitud
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar la solicitud');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Aquí puedes manejar la respuesta de la API
                document.getElementById('message').textContent = 'CITA AGENDADA CORRECTAMENTE'; // Mostrar mensaje de éxito
                document.getElementById('message').style.display = 'block'; // Mostrar el mensaje en la pantalla
                setTimeout(() => {
                    document.getElementById('message').style.display = 'none'; // Ocultar el mensaje después de algunos segundos
                    window.location.href = 'index.html'; // Redirigir al usuario a index.html
                }, 3000); // Tiempo en milisegundos (3 segundos en este caso)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
