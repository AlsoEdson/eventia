const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');


const app = express();
const PORT = process.env.PORT || 3000;

// Configuración
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuración de sesiones
app.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: false,
}));

// Configuración de vistas y estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const authRoutes = require('./src/routes/auth.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes');
const eventRoutes = require('./src/routes/event.routes');

app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/events', eventRoutes);


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
