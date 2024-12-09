const eventRepository = require('../repositories/event.repository');
const userRepository = require('../repositories/user.repository');

const renderDashboard = async (req, res) => {
    if (!req.session.userId) return res.redirect('/');

    const { userId } = req.session;

    try {
        const events = await eventRepository.findEventsByUser(req.session.userId);
        events.date = new Date(events.date).toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const totalPrice = await userRepository.calculateTotalPrice(userId);

        res.render('dashboard', { events, totalPrice });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar el dashboard');
    }
};

module.exports = { renderDashboard };
