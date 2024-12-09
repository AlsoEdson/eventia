const eventRepository = require('../repositories/event.repository');
const { generateQRCode } = require('../utils/qrCodeGenerator');
const QRCode = require('qrcode');

// Middleware para cargar un evento por ID y manejar 404
const loadEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const event = await eventRepository.findEventById(eventId);
        if (!event) return res.status(404).json({ success: false, message: 'Evento no encontrado' });
        req.event = event; // Asigna el evento al objeto req para usarlo en los controladores
        next();
    } catch (err) {
        console.error('Error al cargar el evento:', err.message);
        res.status(500).json({ success: false, message: 'Error al cargar el evento' });
    }
};

// Renderiza la página para crear un evento
const renderCreateEventPage = (req, res) => {
    res.render('create-event');
};

// Crea un nuevo evento
const createEvent = async (req, res) => {
    const { title, description, price, date, attendees, location } = req.body;

    // Validación básica de entrada
    if (!title || !description || !price || !date || !location) {
        return res.status(400).json({ success: false, message: 'Todos los campos obligatorios deben ser completados' });
    }

    try {
        const qrCode = await generateQRCode(title);

        const newEvent = await eventRepository.createEvent(
            title,
            description,
            price,
            date,
            attendees,
            location,
            qrCode,
            req.session?.userId // Validar sesión antes de este punto es ideal
        );

        console.log({ success: true, event: newEvent });
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Error al crear el evento:', err.message);
        res.status(500).json({ success: false, message: 'Error al crear el evento' });
    }
};

// Crea un nuevo evento
const createEventProcedure = async (req, res) => {
    const { title, description, price, date, attendees, location } = req.body;

    // Validación básica de entrada
    if (!title || !description || !price || !date || !attendees || !location) {
        return res.status(400).json({ success: false, message: 'Todos los campos obligatorios deben ser completados' });
    }

    try {
        const qrCode = await generateQRCode(title);

        const createdEvent = await eventRepository.createEventProcedure(
            title,
            description,
            price,
            date,
            attendees,
            location,
            qrCode,
            req.session?.userId // Validar sesión antes de este punto es ideal
        );

        console.log({ success: true, event: createdEvent });
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Error al crear el evento:', err.message);
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
        console.error('Error al generar el código QR:', err.message);
        res.status(500).send('Error al generar el código QR');
    }
};

// Renderiza la página para editar un evento
const renderEditEventPage = (req, res) => {
    const { event } = req; // El evento cargado por el middleware `loadEvent`
    res.render('edit-event', { event });
};

// Actualiza un evento existente
const updateEvent = async (req, res) => {
    const { title, description, price, date, attendees, location } = req.body;
    const { eventId } = req.params;

    // Validación básica
    if (!title || !description || !price || !date || !attendees || !location) {
        return res.status(400).json({ success: false, message: 'Todos los campos obligatorios deben ser completados' });
    }

    try {
        const updatedEvent = await eventRepository.updateEvent(eventId, title, description, price, date, attendees, location);
        if (!updatedEvent) return res.status(404).json({ success: false, message: 'Evento no encontrado' });

        // Responder con un código 200 OK en lugar de redirigir
        res.status(200).json({ success: true, message: 'Evento actualizado correctamente' });
    } catch (err) {
        console.error('Error al actualizar el evento:', err.message);
        res.status(500).json({ success: false, message: 'Error al actualizar el evento' });
    }
};

// Elimina un evento
const deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        await eventRepository.deleteEvent(eventId);
        console.log({ success: true, message: 'Evento eliminado correctamente' });
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Error al eliminar el evento:', err.message);
        res.status(500).json({ success: false, message: 'Error al eliminar el evento' });
    }
};

module.exports = {
    renderCreateEventPage,
    createEvent,
    createEventProcedure,
    renderEventQRPage,
    renderEditEventPage,
    updateEvent,
    deleteEvent,
    loadEvent,
};