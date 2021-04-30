var express = require('express');
const axios = require('axios');
var router = express.Router();
const configAnuncios = require('../local_config').anuncios;

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', async function(req, res, next) {
  //El title lo tenemos definido como variable en el app.js
  let str = '';
  let strDisp = '';
  if (Object.keys(req.query).length === 0 && req.query.constructor === Object){
    //Si no temenos ningún valor en la query, devolveremos un máximo de 50 registros
    str ='/?limit=50&skip=0';
  }else{
    str = '/?'+Object.entries(req.query).map(([key, val]) => `${key}=${val}`).join('&');
    strDisp = Object.entries(req.query).map(([key, val]) => `${key}=${val}`).join(' and ');
  }
  
  //Deberemos crear una variable en locals_config para definir la base de nuestra url.
  const url = configAnuncios.baseUrlPath + 'apiv1/anuncios'+str;
  const urlTags = configAnuncios.baseUrlPath + 'apiv1/anuncios/tags';

  //Hacemos una llamada a nuestro mismo api para recuperar los anuncios, con filtros incluidos
  const response = await axios.get(url);
  //Hacemos una llamada a nuestro mismo api, para recuperar todos nuestros tags
  const responseTags = await axios.get(urlTags);

  let tags = responseTags.data.result.toString().split(',');

  //Definimos variables res.locals para ser consumidas en nuestro index.html
  res.locals.valorQuery = response.data;
  res.locals.valorTags = tags;
  res.locals.valorFiltro = strDisp;

  res.render('indexV0');
});


module.exports = router;
