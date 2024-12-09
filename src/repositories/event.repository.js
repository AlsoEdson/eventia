const oracledb = require('oracledb');
const eventModel = require('../models/event.model');
const dbConfig = require('../../config/database.config');

const createEvent = async (title, description, price, date, attendees, location, qrCode, userId) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(eventModel.createEvent, 
            { title, description, price, fecha: date, attendees, location, qr_code: qrCode, user_id: userId }, 
            { outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit: true }
        );
        return result.rows[0];
    } catch (error) {
        console.error('[EventRepository] Error creating event:', error.message);
        throw new Error('Failed to create event');
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};

const createEventProcedure = async (title, description, price, date, attendees, location, qrCode, userId) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(eventModel.createEventProcedure, 
            { title, description, price, fecha: date, attendees, location, qr_code: qrCode, user_id: userId }, 
            { outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit: true }
        );
        return result.rows[0];
    } catch (error) {
        console.error('[EventRepository] Error executing procedure:', error.message);
        throw new Error('Failed to create event via procedure');
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};

const findEventsByUser = async (userId) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(eventModel.findEventsByUser, 
            { user_id: userId }, 
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        return result.rows;
    } catch (error) {
        console.error('[EventRepository] Error finding events by user:', error.message);
        throw new Error('Failed to find events for user');
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};

const findEventById = async (eventId) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(eventModel.findEventById, 
            { id: eventId }, 
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        if (result.rows.length === 0) throw new Error('Event not found');
        return result.rows[0];
    } catch (error) {
        console.error('[EventRepository] Error finding event by ID:', error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};

const updateEvent = async (id, title, description, price, date, attendees, location) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(eventModel.updateEvent, 
            { id, title, description, price, fecha: date, attendees, location }, 
            { outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit: true }
        );
        if (result.rows.length === 0) throw new Error('Event not found');
        return result.rows[0];
    } catch (error) {
        console.error('[EventRepository] Error updating event:', error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};

const deleteEvent = async (eventId) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(eventModel.delete, 
            { id: eventId }, 
            { autoCommit: true }
        );
        if (result.rowsAffected === 0) {
            throw new Error('Event not found');
        }
        return { message: 'Event deleted successfully' };
    } catch (error) {
        console.error('[EventRepository] Error deleting event:', error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};

module.exports = { 
    createEvent, 
    createEventProcedure, 
    findEventsByUser, 
    findEventById, 
    updateEvent, 
    deleteEvent 
};