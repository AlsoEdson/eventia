const oracledb = require('oracledb');
const userModel = require('../models/user.model');
const { getPool } = require('../../config/database.config');

const createUser = async (name, email, password) => {
    let connection;
    try {
        // Obtener conexión del pool
        connection = await getPool().getConnection();

        // Crear un objeto de salida para capturar los valores retornados por la cláusula RETURNING INTO
        const result = await connection.execute(
            userModel.createUser, 
            { 
                name, 
                email, 
                password,
                out_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }, // Para capturar el id retornado
                out_name: { dir: oracledb.BIND_OUT, type: oracledb.STRING }, // Para capturar el nombre
                out_email: { dir: oracledb.BIND_OUT, type: oracledb.STRING }, // Para capturar el correo
            },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        // El ID del nuevo usuario, que fue retornado por la cláusula RETURNING INTO
        return { 
            id: result.outBinds.out_id[0], 
            name: result.outBinds.out_name[0], 
            email: result.outBinds.out_email[0] 
        };
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw new Error('Error al crear usuario');
    } finally {
        if (connection) {
            await connection.close(); // Asegúrate de cerrar la conexión
        }
    }
};

const findUserByEmail = async (email) => {
    let connection;
    try {
        // Obtener conexión del pool
        connection = await getPool().getConnection();

        // Ejecutar la consulta para encontrar un usuario por correo electrónico
        const result = await connection.execute(
            userModel.findUserByEmail, 
            { email },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        return result.rows[0]; // Retornar el primer usuario encontrado (o null si no se encuentra)
    } catch (error) {
        console.error('Error al encontrar usuario por email:', error);
        throw new Error('Error al encontrar usuario por email');
    } finally {
        if (connection) {
            await connection.close(); // Asegúrate de cerrar la conexión
        }
    }
};

const calculateTotalPrice = async (userId) => {
    let connection;
    try {
        // Obtener conexión del pool
        connection = await getPool().getConnection();

        // Ejecutar la consulta para calcular el precio total de un usuario
        const result = await connection.execute(
            userModel.calculateTotalPrice, 
            { user_id: userId },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        return result.rows[0].TOTAL_PRICE; // Retornar el precio total
    } catch (error) {
        console.error('Error al calcular el precio total:', error);
        throw new Error('Error al calcular el precio total');
    } finally {
        if (connection) {
            await connection.close(); // Asegúrate de cerrar la conexión
        }
    }
};

module.exports = { createUser, findUserByEmail, calculateTotalPrice };
