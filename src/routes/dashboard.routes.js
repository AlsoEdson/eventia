const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get('/', dashboardController.renderDashboard);
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth');
    });
});

module.exports = router;
