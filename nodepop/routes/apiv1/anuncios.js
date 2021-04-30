/* eslint-disable no-unused-vars */
'use strict'

var express = require('express');
var router = express.Router();
const jwtAuth = require('../../lib/jwtAuth');

const Anuncio = require('../../models/Anuncio.js');
const {body, validationResult} = require('express-validator');
const configAnuncios = require('../../local_config').anuncios;


/* GET /apiv1/anuncios  */
// Impelmentamos la autrización en la consulta
router.get('/', jwtAuth, async function(req, res, next) {
    try {
        const resultado = await Anuncio.lista(req.query)
        //Pondremos el prefijo de la url de las fotos, segun nuestra variable definida en local_config
        resultado.forEach((row) => {
            if (row.foto) {
            row.foto = configAnuncios.imagesURLBasePath + row.foto;
            }
        });
        return res.status(200).json({result: resultado});
    } catch (error) {
        next(error);
    }
    
});

//Consulta de todos los tags
router.get('/tags', async function(req, res, next){
    try {
        const tagsV = await Anuncio.allowedTags();
        return res.status(200).json({result: tagsV});  
    } catch (error) {
        return res.status(404).json({error: 'not found Tags'});
    }
});

//Consulta de tags válidos
router.get('/tagsValidate', 
    body('tags').custom(tags => {   
        //Validamos si los tags que nos pasan están dentro de los permitidos
        const errorTags = Anuncio.allowedTagsEnumValidate(tags);
        //Si alguno de los tags no se encuentra, lanzaremos un error indicando que tags no son admitidos
        if (errorTags.length > 0){
            throw new Error(`Tags no admitidos: ${errorTags}`);
        } else {
            return true}
    }),
    async function(req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array()});
            } else
                return res.status(200).json({result: `OK`});   
        } catch (error) {
            return res.status(404).json({error: 'Error en Tags'});
        }

});

//Grabación de nuevos anuncios con validación incluida
router.post('/',
    [
        body('nombre').not().isEmpty().trim().escape().withMessage('El campo Nombre no puede estar vacío'),
        body('precio').isNumeric().withMessage('El precio debe ser numérico'),
        body('venta').isBoolean().withMessage('Valores admitidos: true o false'),
        body('tags').custom(tags => {   
            //Validamos si los tags que nos pasan están dentro de los permitidos
            const errorTags = Anuncio.allowedTagsEnumValidate(tags)

            //Si alguno de los tags no se encuentra, lanzaremos un error indicando que tags no son admitidos
            if (errorTags.length > 0){
                throw new Error(`Tags no admitidos: ${errorTags}`);
            } else {
                return true}
        })
    ], 
 async (req, res, next) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()});
        }
        const anuncioCreado = await Anuncio.newAnuncio(req.body);
        res.status(201).json({result: anuncioCreado});
    } catch (error) {
        next(error)      
        }
});




module.exports = router;