const express = require('express');
const router = express.Router();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}


//Aqui va la funcion GET
router.get('/data', isLoggedIn, (req, res) => {
    res.json({
        message: "Accediste a los datos",
        user: req.user,  
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