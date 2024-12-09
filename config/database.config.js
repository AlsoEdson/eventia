const oracledb = require('oracledb');

let pool;

const createPool = async () => {
    try {
        pool = await oracledb.createPool({
            user: 'C##userapp',  // reemplaza con tu nombre de usuario de Oracle
            password: 'testuser',  // reemplaza con tu contraseña de Oracle
            connectString: 'localhost:1521/xe',  // reemplaza con tu conexión de Oracle
            poolMin: 1,
            poolMax: 1000,
            poolIncrement: 1,
        });
        console.log('Conexión al pool de OracleDB establecida');
    } catch (err) {
        console.error('Error al crear el pool de OracleDB:', err);
        throw err; // Lanzamos un error si el pool no se puede crear
    }
};

// Inicializamos el pool cuando se arranca la aplicación
createPool().catch(err => console.error('Error al inicializar el pool', err));

// Función para obtener el pool y las conexiones
const getPool = () => pool;

module.exports = { getPool };