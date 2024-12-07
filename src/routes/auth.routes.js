const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/', (req, res) => res.render('index'));
router.get('/auth', authController.renderAuthPage);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

module.exports = router;
