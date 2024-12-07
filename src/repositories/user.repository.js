const pool = require('../../config/database.config.js');
const userModel = require('../models/user.model');

const createUser = async (name, email, password) => {
    const { rows } = await pool.query(userModel.createUser, [name, email, password]);
    return rows[0];
};

const findUserByEmail = async (email) => {
    const { rows } = await pool.query(userModel.findUserByEmail, [email]);
    return rows[0];
};

module.exports = { createUser, findUserByEmail };
