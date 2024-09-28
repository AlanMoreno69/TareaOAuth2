const express = require('express');
const router = express.Router();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}


//Aqui va la funcion GET



//Aqui va la funcion POST


module.exports = router;