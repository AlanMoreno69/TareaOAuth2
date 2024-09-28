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


module.exports = router;