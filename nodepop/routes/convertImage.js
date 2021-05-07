'use strict'

var express = require('express');
var router = express.Router();
const cote = require('cote');

const requester = new cote.Requester({name: 'crea thumbnail'});

const transformImg = (ruta,nombre)=>{
    const nomOut = nombre.substr(0, nombre.length-4)+'_thumbnail'+ nombre.substr(-4)
    const dir_in = path.join(ruta,nombre);
    const dir_out = path.join(ruta,nomOut)
    return `Directorio in ${dir_in}  directorio de salida ${dir_out}`;
}

router.get('/:peticion', function(req,res,next){
    const texto = req.params.peticion
    
        requester.send({
            type: 'convertir imagen',
            texto : texto,
        }, resultado =>{
            res.send(`Cambiamos el texto a : ${resultado}`)
        })
});



module.exports = router;
