/* eslint-disable no-unused-vars */
'use strict'

var express = require('express');
var router = express.Router();
const jwtAuth = require('../../lib/jwtAuth');
const path = require('path');

const Anuncio = require('../../models/Anuncio.js');
const {body, validationResult} = require('express-validator');
const configAnuncios = require('../../local_config').anuncios;
const cote = require('cote');

const requester = new cote.Requester({name: 'crea thumbnail'});
const multer = require('multer');
/**
 * Para evitar duplicados, remombraremos la imagen de la siguiente forma
 * fecha actual + nombre original imagen + extensión original
 */

const storage = multer.diskStorage({
    destination : './public/images/anuncios',
    filename: (req,file,cb) =>{
        cb(null, Date.now() +'-'+file.originalname);
    }
});

const upload = multer({
    storage,
    dest: './public/images/anuncios',
    limits: {fileSize: 1 * 10000 * 10000},
    fileFilter: (req,file,cb) =>{
        const ext = path.extname(file.originalname).toLowerCase();
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed: .png|.jpg|.gif|.jpeg'))
        }
        cb(null, true)
    },
}).single('foto')

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
router.get('/tags', jwtAuth, async function(req, res, next){
    try {
        const tagsV = await Anuncio.allowedTags();
        return res.status(200).json({result: tagsV});  
    } catch (error) {
        return res.status(404).json({error: 'not found Tags'});
    }
});

//Consulta de tags válidos
router.get('/tagsValidate', jwtAuth, 
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


//Grabación de nuevos anuncios con validación incluida y subida de imagen
router.post('/', jwtAuth, upload,
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
        const namePhoto = req.file ? req.file.filename :''
        
        const anuncioCreado = await Anuncio.newAnuncio(req.body,namePhoto);
        //Una vez guardado el anuncio, llamamos al microservicio para procesar el thumbnail de la imágen
        const nameImage = namePhoto
    
        requester.send({
            type: 'convertir imagen',
            nameImage : nameImage,
        }, resultado =>{
            if (!resultado) {
                console.erro('Error en microservice al crear el thumbnail')};
            //console.log(`Cambiamos el nombre de la imágen a : ${resultado}`)
        })

        res.status(201).json({result: anuncioCreado});
    } catch (error) {
        next(error)      
        }
});

module.exports = router;