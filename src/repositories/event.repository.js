const pool = require('../../config/database.config.js');
const eventModel = require('../models/event.model');

const createEvent = async (title, description, date, attendees, location, qrCode, userId) => {
    try {
        const { rows } = await pool.query(eventModel.createEvent, [
            title, 
            description, 
            date, 
            attendees, 
            location,
            qrCode, 
            userId
        ]);
        return rows[0];
    } catch (error) {
        console.error('[EventRepository] Error creating event:', error.message);
        throw new Error('Failed to create event');
    }
};

const createEventProcedure = async (title, description, date, attendees, location, qrCode, userId) => {
    try {
        await pool.query(eventModel.createEventProcedure, [
            title, 
            description, 
            date, 
            attendees, 
            location,
            qrCode, 
            userId
        ]);
    } catch (error) {
        console.error('[EventRepository] Error executing procedure:', error.message);
        throw new Error('Failed to create event via procedure');
    }
};

const findEventsByUser = async (userId) => {
    try {
        const { rows } = await pool.query(eventModel.findEventsByUser, [userId]);
        return rows;
    } catch (error) {
        console.error('[EventRepository] Error finding events by user:', error.message);
        throw new Error('Failed to find events for user');
    }
};

const findEventById = async (eventId) => {
    try {
        const { rows } = await pool.query(eventModel.findEventById, [eventId]);
        if (rows.length === 0) throw new Error('Event not found');
        return rows[0];
    } catch (error) {
        console.error('[EventRepository] Error finding event by ID:', error.message);
        throw error;
    }
};

const updateEvent = async (id, title, description, date, attendees, location) => {
    try {
        const { rows } = await pool.query(eventModel.updateEvent, [
            id, 
            title, 
            description, 
            date, 
            attendees, 
            location
        ]);
        if (rows.length === 0) throw new Error('Event not found');
        return rows[0];
    } catch (error) {
        console.error('[EventRepository] Error updating event:', error.message);
        throw error;
    }
};

const deleteEvent = async (eventId) => {
    try {
        const { rowCount } = await pool.query(eventModel.delete, [eventId]);
        if (rowCount === 0) {
            throw new Error('Event not found');
        }
        return { message: 'Event deleted successfully' };
    } catch (error) {
        console.error('[EventRepository] Error deleting event:', error.message);
        throw error;
    }
};

const calculateTotalPrice = async (eventId) => {
    try {
        const { rows } = await pool.query(eventModel.calculateTotalPrice, [eventId]);
        return rows[0].total_price;
    } catch (error) {
        console.error('[EventRepository] Error calculating total price:', error.message);
        throw new Error('Failed to calculate total price');
    }
};

module.exports = { 
    createEvent, 
    createEventProcedure, 
    findEventsByUser, 
    findEventById, 
    updateEvent, 
    deleteEvent, 
    calculateTotalPrice 
};