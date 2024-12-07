module.exports = {
    createEvent: `
        INSERT INTO events (title, description, date, attendees, location, qr_code, user_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *
    `,
    createEventProcedure: `CALL create_event($1, $2, $3, $4, $5, $6, $7)`,
    findEventsByUser: 'SELECT * FROM events WHERE user_id = $1',
    findEventById: 'SELECT * FROM events WHERE id = $1',
    updateEvent: `UPDATE events
                    SET title = $2, description = $3, date = $4, attendees = $5, location = $6
                    WHERE id = $1
                    RETURNING *`,
    delete: 'DELETE FROM events WHERE id = $1',
    calculateTotalPrice: 'SELECT calculate_total_price($1) AS total_price',
};
