module.exports = {
    createUser: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    findUserByEmail: 'SELECT * FROM users WHERE email = $1',
    calculateTotalPrice: 'SELECT calculate_total_price($1) AS total_price',
};
