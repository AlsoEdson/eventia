const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

// Middleware para cargar un evento por ID
const { loadEvent } = eventController;

// Ruta para renderizar la página de creación de eventos
router.get('/create', eventController.renderCreateEventPage);
// Ruta para crear un nuevo evento
router.post('/c', eventController.createEventProcedure);
// Ruta para renderizar el QR del evento
router.get('/:eventId/qr', loadEvent, eventController.renderEventQRPage);
// Ruta para renderizar la página de edición de un evento
router.get('/:eventId/edit', loadEvent, eventController.renderEditEventPage);
// Ruta para actualizar un evento existente
router.put('/:eventId', eventController.updateEvent);
// Ruta para eliminar un evento
router.delete('/:eventId', eventController.deleteEvent);

module.exports = router;