document.addEventListener('DOMContentLoaded', () => {
    const editEventModal = document.getElementById('editEventModal');
    const editEventForm = document.getElementById('editEventForm');

    // Prellenar el modal de edición cuando se haga clic en el botón "Editar"
    editEventModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget; // Botón que activó el modal

        // Extraer los datos del botón
        const eventId = button.getAttribute('data-id');
        const title = button.getAttribute('data-title');
        const description = button.getAttribute('data-description');
        const date = button.getAttribute('data-date').slice(0, 10); // Formato YYYY-MM-DD
        const location = button.getAttribute('data-location');
        const attendees = button.getAttribute('data-attendees');

        // Llenar los campos del formulario del modal
        editEventForm.querySelector('#edit-event-id').value = eventId;
        editEventForm.querySelector('#edit-title').value = title;
        editEventForm.querySelector('#edit-description').value = description;
        editEventForm.querySelector('#edit-date').value = date;
        editEventForm.querySelector('#edit-location').value = location;
        editEventForm.querySelector('#edit-attendees').value = attendees;
    });

    // Manejar el envío del formulario de edición
    editEventForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener los datos del formulario
        const eventId = editEventForm.querySelector('#edit-event-id').value;
        const formData = {
            title: editEventForm.querySelector('#edit-title').value,
            description: editEventForm.querySelector('#edit-description').value,
            date: editEventForm.querySelector('#edit-date').value,
            location: editEventForm.querySelector('#edit-location').value,
            attendees: editEventForm.querySelector('#edit-attendees').value,
        };

        try {
            // Enviar solicitud PUT para actualizar el evento
            const response = await fetch(`/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Cerrar el modal
                const modal = bootstrap.Modal.getInstance(editEventModal); // Obtener la instancia del modal
                modal.hide(); // Cerrar el modal

                // Recargar la página o actualizar la tabla dinámicamente
                location.reload();
            } else {
                console.error('Error al actualizar el evento');
            }
        } catch (err) {
            console.error('Error al enviar la solicitud:', err);
        }
    });


    // Confirmar eliminación de evento
    document.querySelectorAll('form[action*="/delete"]').forEach((form) => {
        form.addEventListener('submit', (e) => {
            const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.');
            if (!confirmDelete) {
                e.preventDefault(); // Cancelar envío si no se confirma
            }
        });
    });
});