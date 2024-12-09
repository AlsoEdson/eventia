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

const calculateTotalPrice = async (userId) => {
    try {
        const { rows } = await pool.query(userModel.calculateTotalPrice, [userId]);
        return rows[0].total_price;
    } catch (error) {
        throw new Error('Error al calcular el precio total: ' + error.message);
    }
};

module.exports = { createUser, findUserByEmail, calculateTotalPrice };