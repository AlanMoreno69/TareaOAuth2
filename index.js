const express = require('express');
const session = require("express-session");
const passport = require('passport');

require('./auth');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

const app = express();
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
);

app.get('/failure', (req, res) => {
    res.send('Something went wrong...')
});

app.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile']})
);

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Bienvenido ${req.user.displayName}`);
});

app.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.send('ChaoBye');
    });
});

//Mediante la función isLoggedIn se valida las credenciales del usuario
//y usando el metodo post se envian mediante un json los datos de un nombre y email
app.post('/data', isLoggedIn, (req, res) => {
    const { name, email } = req.body; //guarda los datos del body que manda el cliente
    res.send(`Recibido: Nombre: ${name}, Correo: ${email}`);//respuesta del servidor con el nombre y el correo
})

app.listen(3000, () => console.log('Listening on: 3000'));