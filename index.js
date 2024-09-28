const express = require('express');
const session = require("express-session");
const passport = require('passport');
const protectedRoutes = require('./routes');

require('./auth');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

// Crear una instancia de la aplicación Express
const app = express();

// Configurar la sesión con un secreto
app.use(session({ secret: 'cats' })); 

// Inicializar Passport y usar sesiones de Passport para la autenticación
app.use(passport.initialize());
app.use(passport.session());

// Middleware para analizar los datos JSON y los datos codificados en URL
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Ruta principal que muestra un enlace para autenticarse con Google
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

// Ruta de callback de Google después de la autenticación
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure' 
    })
);

// Ruta para manejar errores de autenticación
app.get('/failure', (req, res) => {
    res.send('Something went wrong...');
});

// Ruta para iniciar la autenticación con Google
app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })  // Solicitar acceso al correo electrónico y perfil del usuario
);

// Ruta protegida, accesible solo si el usuario está autenticado
app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Bienvenido ${req.user.displayName}`); 
});

// Ruta para cerrar la sesión del usuario
app.get('/logout', (req, res, next) => {
    req.logout(function(err) { 
        if (err) { return next(err); } 
        req.session.destroy(); 
        res.send('ChaoBye');  
    });
});

// Montar las rutas protegidas bajo el prefijo '/api'
app.use('/api', protectedRoutes);


app.listen(3000, () => console.log('Listening on: 3000'));