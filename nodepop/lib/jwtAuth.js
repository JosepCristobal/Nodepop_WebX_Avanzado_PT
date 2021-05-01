'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // recoger el jwtToken de la cabecera (o de otros sitios)
  const jwtToken = req.get('Authorization') || req.query.token || req.body.token;

  // comprobar que tengo token
  if (!jwtToken) {
    const error = new Error('No token provided');
    error.status = 401;
    next(error);
    return;
  }

  // comprobar que el token es valido
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
    const decodificado = jwt.decode(jwtToken)
    if (err) {
      //Verificamos si el error es token caducado o formato no correcto
      //TODO si da tiempo introducimos la internacionalización en el mensaje de error
      if (Date.now() >= decodificado.exp * 1000) {
        err.message = `Token caducado - ${err.message}`
        err.status = 401;
        next(err);
        return;
      }
      err.message = `Token No válido - ${err.message}`
      err.status = 401;
      next(err);
      return;
    }
    req.apiAuthUserId = payload._id;
    next();
  });
  
};
