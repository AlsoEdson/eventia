document.addEventListener('DOMContentLoaded', () => {
    // Inicializar tooltips y popovers de Bootstrap
    const tooltipTriggerList = [...document.querySelectorAll('[data-bs-toggle="tooltip"]')];
    tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    const popoverTriggerList = [...document.querySelectorAll('[data-bs-toggle="popover"]')];
    popoverTriggerList.forEach(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

    // Inicializar el modal para la creación de eventos
    const createEventModal = new bootstrap.Modal(document.getElementById('createEventModal'));
    
    // Abrir el modal de creación al hacer clic
    document.querySelector('.btn-primary').addEventListener('click', () => createEventModal.show());

    // Manejo del formulario de creación de evento
    document.getElementById('createEventForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formObject = {};
        formData.forEach((value, key) => formObject[key] = value);

        try {
            const response = await fetch('/events/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formObject)
            });

            if (response.ok) {
                window.location.href = '/dashboard'; // Redirigir al dashboard
            } else {
                alert('Error al crear el evento');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al crear el evento');
        }
    });

    // Función para cerrar sesión
    document.querySelector('#logoutButton').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            fetch('/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }).then(() => {
                window.location.href = '/login'; // Redirigir a la página de login
            }).catch(error => {
                console.error('Error al cerrar sesión:', error);
            });
        }
    });

    // Función de búsqueda en los eventos
    document.getElementById("searchBar").addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const eventTitle = card.querySelector('.card-title').textContent.toLowerCase();
            card.style.display = eventTitle.includes(searchText) ? 'block' : 'none';
        });
    });

    // Editar un evento desde el modal
    const editModal = document.getElementById('editModal');
    editModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const eventId = button.getAttribute('data-id');
        const eventTitle = button.getAttribute('data-title');
        const eventDescription = button.getAttribute('data-description');
        const eventDate = button.getAttribute('data-date');
        const eventAttendees = button.getAttribute('data-attendees');
        const eventLocation = button.getAttribute('data-location');

        // Asignar los valores al formulario del modal
        document.getElementById('eventId').value = eventId;
        document.getElementById('title').value = eventTitle;
        document.getElementById('description').value = eventDescription;
        document.getElementById('date').value = eventDate;
        document.getElementById('attendees').value = eventAttendees;
        document.getElementById('location').value = eventLocation;
    });

    
// Llenar los campos del modal cuando se hace clic en el botón de editar
document.addEventListener('DOMContentLoaded', function () {
    // Obtener todos los botones de editar
    const editButtons = document.querySelectorAll('[data-bs-target="#editEventModal"]');

    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Obtener los datos del botón de edición
            const eventId = button.getAttribute('data-id');
            const title = button.getAttribute('data-title');
            const description = button.getAttribute('data-description');
            const date = button.getAttribute('data-date');
            const location = button.getAttribute('data-location');
            const attendees = button.getAttribute('data-attendees');

            // Llenar los campos del formulario en el modal
            document.getElementById('edit-event-id').value = eventId;
            document.getElementById('edit-title').value = title;
            document.getElementById('edit-description').value = description;
            document.getElementById('edit-date').value = date;
            document.getElementById('edit-location').value = location;
            document.getElementById('edit-attendees').value = attendees;
        });
    });
});


    // Asignar los valores al modal cuando se hace clic en "Editar"
function openEditEventModal(eventId) {
    fetch(`/events/${eventId}`)
        .then(response => response.json())
        .then(event => {
            // Rellenar los campos del formulario con los datos del evento
            document.getElementById('edit-event-id').value = event.id;
            document.getElementById('edit-title').value = event.title;
            document.getElementById('edit-description').value = event.description;
            document.getElementById('edit-date').value = event.date;
            document.getElementById('edit-attendees').value = event.attendees;
            document.getElementById('edit-location').value = event.location;

            // Mostrar el modal
            const editEventModal = new bootstrap.Modal(document.getElementById('editEventModal'));
            editEventModal.show();
        })
        .catch(err => console.error('Error al obtener el evento:', err));
}

// Enviar el formulario de edición para actualizar el evento
document.getElementById('editEventForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir el envío normal del formulario

    const form = e.target;
    const formData = new FormData(form);  // Obtenemos los datos del formulario

    // Realizar el PUT request
    fetch(`/events/${formData.get('id')}/update`, {
        method: 'PUT',
        body: formData  // Enviamos los datos del formulario
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.reload(); // Recargar la página para ver los cambios
        } else {
            alert('Error al actualizar el evento');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al actualizar el evento');
    });
});


    // // Manejo de la actualización de un evento
    // document.getElementById('editEventForm').addEventListener('submit', async function (e) {
    //     e.preventDefault();
    //     const updatedEvent = {
    //         id: document.getElementById('eventId').value,
    //         title: document.getElementById('title').value,
    //         description: document.getElementById('description').value,
    //         date: document.getElementById('date').value,
    //         attendees: document.getElementById('attendees').value,
    //         location: document.getElementById('location').value
    //     };

    //     try {
    //         const response = await fetch(`/events/${updatedEvent.id}`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(updatedEvent)
    //         });

    //         if (response.ok) {
    //             alert('Evento actualizado');
    //             location.reload(); // Recargar la página para ver el cambio
    //         } else {
    //             alert('Error al actualizar el evento');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         alert('Hubo un problema al actualizar el evento');
    //     }
    // });

    // Asignar valores al modal al editar un evento
function openEditEventModal(event) {
    // Obtener los datos del evento que se editará
    const eventId = event.id;  // Suponiendo que el evento tiene un ID único
    const title = event.title;
    const description = event.description;
    const date = event.date;
    const attendees = event.attendees;
    const location = event.location;

    // Asignar valores al formulario
    document.getElementById('edit-event-id').value = eventId;
    document.getElementById('edit-title').value = title;
    document.getElementById('edit-description').value = description;
    document.getElementById('edit-date').value = date;
    document.getElementById('edit-attendees').value = attendees;
    document.getElementById('edit-location').value = location;

    // Mostrar el modal
    const editEventModal = new bootstrap.Modal(document.getElementById('editEventModal'));
    editEventModal.show();
}


    // Eliminar un evento
    window.deleteEvent = function (id) {
        const confirmDelete = confirm("¿Estás seguro de que quieres borrar este evento?");
        if (confirmDelete) {
            fetch(`/events/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        alert('Evento borrado');
                        location.reload(); // Recargar la página para ver el cambio
                    } else {
                        alert('Error al borrar el evento');
                    }
                })
                .catch(err => alert('Error al borrar el evento'));
        }
    };
});
