module.exports = {
    createUser: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    findUserByEmail: 'SELECT * FROM users WHERE email = $1',
};
