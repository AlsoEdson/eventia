const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository');

const renderAuthPage = (req, res) => {
    res.render('auth');
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await userRepository.createUser(name, email, hashedPassword);
        req.session.userId = user.id;
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al registrar el usuario');
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userRepository.findUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id;
            res.redirect('/dashboard');
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al iniciar sesión');
    }
};

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

module.exports = { renderAuthPage, registerUser, loginUser, logoutUser };
