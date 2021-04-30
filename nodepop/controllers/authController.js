'use strict'
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
    async postJWT(req,res,next){
    try{
            const{email,password} = req.body;

            //Buscamos el usuario en la BBDD
            const user = await User.findOne({email})

            //Si no se encuentra  error
        
            if (!user || !(await user.comparePassword(password)) ){
                const error = new Error('Invalid credentials');
                error.status = 401;
                next(error);
                return;
            }
           
            //Si el usuario existe y la clave coincide
            //Creamos un Token JWT firmado
            jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, jwtToken) => {
                if (err) {
                  next(err);
                  return;
                }
                // devolveselo al cliente
                res.json({ token: jwtToken});
              });
            
        } catch(err){
            next(err);
        }
    }

}

module.exports = new AuthController();