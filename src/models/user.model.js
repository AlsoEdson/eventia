module.exports = {
    createUser: `
        INSERT INTO users (name, email, password, created_at)
        VALUES (:name, :email, :password, SYSDATE)
        RETURNING id, name, email INTO :out_id, :out_name, :out_email`,
    
    findUserByEmail: 'SELECT * FROM users WHERE email = :email',
    
    calculateTotalPrice: 'SELECT calculate_total_price(:user_id) AS total_price FROM dual',
};