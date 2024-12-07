const eventRepository = require('../repositories/event.repository');

const renderDashboard = async (req, res) => {
    if (!req.session.userId) return res.redirect('/');

    try {
        const events = await eventRepository.findEventsByUser(req.session.userId);
        events.date = new Date(events.date).toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        res.render('dashboard', { events });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar el dashboard');
    }
};

module.exports = { renderDashboard };
