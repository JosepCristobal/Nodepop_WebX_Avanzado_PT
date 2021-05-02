var express = require('express');

var router = express.Router();

/* Get /change-locale/:locale */

router.get('/:locale', function (req,res,next){
 //Pondremos una cookie con el idioma que nos llegue por parámetro
    const locale = req.params.locale;
    res.cookie('nodepop-locale', locale, {maxAge: 1000 * 60 * 60 * 24 * 20});
 //Redirigimos a la página de dónde venimos para que se produzca el cambio de idioma

    res.redirect(req.get('referer'));
});


module.exports = router;
