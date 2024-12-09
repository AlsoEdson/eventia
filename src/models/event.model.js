module.exports = {
    createEvent: `
        INSERT INTO events (title, description, price, date, attendees, location, qr_code, user_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *
    `,
    createEventProcedure: `CALL create_event($1, $2, $3, $4, $5, $6, $7, $8)`,
    findEventsByUser: 'SELECT * FROM events WHERE user_id = $1',
    findEventById: 'SELECT * FROM events WHERE id = $1',
    updateEvent: `UPDATE events
                    SET title = $2, description = $3, price = $4, date = $5, attendees = $6, location = $7
                    WHERE id = $1
                    RETURNING *`,
    delete: 'DELETE FROM events WHERE id = $1',
};
