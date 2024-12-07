const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

// Middleware para cargar el evento por ID
const { loadEvent } = eventController;

// Crear un evento
router.get('/create', eventController.renderCreateEventPage);
router.post('/create', eventController.createEvent);

// Rutas basadas en un evento específico
router.get('/:eventId/qr', loadEvent, eventController.renderEventQRPage);
router.get('/:eventId/edit', loadEvent, eventController.renderEditEventPage);
router.put('/:eventId', loadEvent, eventController.updateEvent);
router.delete('/:eventId', loadEvent, eventController.deleteEvent);

module.exports = router;
