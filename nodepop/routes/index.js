var express = require('express');
var router = express.Router();
const configAnuncios = require('../local_config').anuncios;
const Anuncio = require('../models/Anuncio.js');


/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', async function(req, res, next) {

  let strDisp;
  //Verificamos sin nos vienen filtros en nuestra query para adaptar el texto de nuestra página html
  if (Object.keys(req.query).length === 0 && req.query.constructor === Object){
    //Si no temenos ningún valor en la query, un texto de "No existen filtros"
    strDisp = "No existen filtros para esta búsqueda";
  }else{
    strDisp = Object.entries(req.query).map(([key, val]) => `${key}=${val}`).join(' and ');
  }

  try {
    const resultado = await Anuncio.lista(req.query)
    //Pondremos el prefijo de la url de las fotos, segun nuestra variable definida en local_config
    resultado.forEach((row) => {
        if (row.foto) {
          row.foto = configAnuncios.imagesURLBasePath + row.foto;
        }else{
          row.foto = configAnuncios.imagesURLBasePath + 'noImage.jpg'
        }
    });
    
    //Buscamos todos los tags autorizados
    const tagsV = await Anuncio.allowedTags();
    const tags = tagsV.toString().split(',');

    //Definimos variables res.locals para ser consumidas en nuestro index.html
    res.locals.valorQuery = resultado;
    res.locals.valorTags = tags;
    res.locals.valorFiltro = strDisp;

    res.render('index');
  
  
  } catch (error) {
      next(error);
  }

});


module.exports = router;
