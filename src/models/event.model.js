module.exports = {
    createEvent: `
        INSERT INTO events (title, description, price, fecha, attendees, location, qr_code, user_id) 
        VALUES (:title, :description, :price, :fecha, :attendees, :location, :qr_code, :user_id)
        RETURNING *`,

    createEventProcedure: `
        BEGIN
            create_event(:title, :description, :price, :fecha, :attendees, :location, :qr_code, :user_id);
        END;`,

    findEventsByUser: 'SELECT * FROM events WHERE user_id = :user_id',

    findEventById: 'SELECT * FROM events WHERE id = :id',

    updateEvent: `
        UPDATE events
        SET title = :title, description = :description, price = :price, fecha = :fecha, attendees = :attendees, location = :location
        WHERE id = :id
        RETURNING *`,

    delete: 'DELETE FROM events WHERE id = :id',
};
