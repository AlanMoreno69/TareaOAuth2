const express = require('express');
const router = express.Router();

// Middleware para verificar si el usuario está autenticado
function isLoggedIn(req, res, next) {
    // Si el usuario está autenticado (req.user está definido), continuar con la siguiente función de middleware
    req.user ? next() : res.sendStatus(401); // Si no está autenticado, devolver un estado 401 (No autorizado)
}

//Aqui va la funcion GET

// Definición de la ruta GET para '/data'
router.get('/data', isLoggedIn, (req, res) => {
    // Si el usuario está autenticado, se envía una respuesta JSON
    res.json({
        message: "Accediste a los datos", // Mensaje de éxito
        user: req.user,  // Información del usuario autenticado
    });
});


//Aqui va la funcion POST

//Mediante la función isLoggedIn se valida las credenciales del usuario
//y usando el metodo post se envian mediante un json los datos de un nombre y email
app.post('/data', isLoggedIn, (req, res) => {
    const { name, email } = req.body; //guarda los datos del body que manda el cliente
    res.send(`Recibido: Nombre: ${name}, Correo: ${email}`);//respuesta del servidor con el nombre y el correo
})

module.exports = router;