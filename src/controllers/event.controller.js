const eventRepository = require('../repositories/event.repository');
const { generateQRCode } = require('../utils/qrCodeGenerator');
const QRCode = require('qrcode');

// Middleware para cargar un evento por ID y manejar 404
const loadEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const event = await eventRepository.findEventById(eventId);
        if (!event) return res.status(404).send('Evento no encontrado');
        req.event = event; // Asigna el evento al objeto req para usarlo en los controladores
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar el evento');
    }
};

// Renderiza la página para crear un evento
const renderCreateEventPage = (req, res) => {
    res.render('create-event');
};

// Crea un nuevo evento
const createEvent = async (req, res) => {
    const { title, description, date, attendees, location } = req.body;

    try {
        if (!title || title.trim() === '') {
            return res.status(400).json({ success: false, message: 'El título del evento es obligatorio' });
        }

        const qrCode = await generateQRCode(title);

        const newEvent = await eventRepository.createEvent(
            title,
            description,
            date,
            attendees,
            location,
            qrCode,
            req.session.userId
        );

        res.json({ success: true, event: newEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error al crear el evento' });
    }
};

// Renderiza la página del QR del evento
const renderEventQRPage = async (req, res) => {
    const { event } = req; // El evento cargado por el middleware `loadEvent`

    try {
        const qrCodeData = await QRCode.toDataURL(`http://localhost:3000/events/${event.id}`);
        res.render('event-qr', { event, qrCodeData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al generar el código QR');
    }
};

// Renderiza la página para editar un evento
const renderEditEventPage = async (req, res) => {
    const { event } = req; // El evento cargado por el middleware `loadEvent`
    res.render('edit-event', { event });
};

// Actualiza un evento existente
const updateEvent = async (req, res) => {
    const { id, title, description, date, attendees, location } = req.body;

    try {
        const updatedEvent = await eventRepository.updateEvent(id, title, description, date, attendees, location);
        if (!updatedEvent) return res.status(404).json({ success: false, message: 'Evento no encontrado' });
        res.json({ success: true, event: updatedEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error al actualizar el evento' });
    }
};

// Elimina un evento
const deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        await eventRepository.deleteEvent(eventId);
        res.json({ success: true, message: 'Evento eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error al eliminar el evento' });
    }
};

module.exports = {
    renderCreateEventPage,
    createEvent,
    renderEventQRPage,
    renderEditEventPage,
    updateEvent,
    deleteEvent,
    loadEvent,
};