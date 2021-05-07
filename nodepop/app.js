var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const authController = require('./controllers/authController');
const i18n = require('./lib/i18nConfigure');


var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//Se conecta a la Base de datos
require('./lib/connectMongoose');


//El motor de plantillas es ejs
//Vamos a hacer una modificacion y lo cambiamos a html
app.set('view engine', 'html');
//Definimos que es un html, el no lo sabe si no se lo indicamos.
app.engine('html', require('ejs').__express);

//Declaramos variable global que será accesible por toda nuestras vistas
//La utilizamos en nuestro index.js y index.html
app.locals.title = 'NodePopAPI';


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Midelware de ficheros estáticos
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Rutas del API
 */
app.post('/apiv1/authJWT', authController.postJWT);
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));


// Inicializamos la internacionalización
app.use(i18n.init);


app.use('/thumbnail', require('./routes/convertImage'))
/**
 * Rutas de mi Website
 * 
 */

app.use('/', indexRouter);
//app.use('/change-locale', require('./routes/change-locale'));
app.use('/change-locale', require('./routes/change-locale'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  // Es un error de validación?
  // Error en la parte de cliente.
  //Utilizamos express-validator y para verificar que viene de este objeto, validamos que contenga un array que sabemos que es propio de este validador
  if(err.array){
    //En nuestro proyecto no lo utilizamos. enviamos el array de errores desde anuncios.js
    const errorInfo = err.array({onlyFirstError: true})[0];
    err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`
    err.status = 422;
  }
  res.status(err.status || 500);
  //si tenemos que responder desde una API, lo haremos en formato Json
  if(isAPIRequest(req)){
    res.json({error: err.message});
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

//Creamos una función para determinar si la petición viene de una API y debemos responder según su origen.
function isAPIRequest(req){
  return req.originalUrl.indexOf('/apiv1/') === 0;
}
 

module.exports = app;
